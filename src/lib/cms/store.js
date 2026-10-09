import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { contactInfo, socialLinks } from '@/config/site'
import snapshot from '@/data/cms-snapshot'
import { caseStudies } from '@/data/caseStudies'
import postsIndex from '@/data/posts-index.json'
import { enrichPosts, publishedOnly } from '@/data/posts-light'
import { teamLead, teamMembers } from '@/data/team'
import { api } from './api'
import { setTexts } from './translate'

// Client-side content store. Starts from what was baked into the build (src/data/cms-snapshot.js,
// generated from the admin in CI — or the static data in src/data/*.js when the admin isn't set
// up) and quietly syncs with the live backend, so admin edits appear without waiting for a
// rebuild. Everything degrades to the baked content if the backend is unreachable.

const staticTeam = { lead: teamLead, members: teamMembers }

function applySettings(settings) {
  const contact = settings?.contact ?? {}
  if (contact.email) contactInfo.email = contact.email
  if (contact.phone) {
    contactInfo.phone = contact.phone
    contactInfo.phoneHref = `+${contact.phone.replace(/\D/g, '')}`
  }
  if (contact.location) contactInfo.location = contact.location
  const social = settings?.social ?? {}
  for (const link of socialLinks) {
    const url = social[link.name.toLowerCase()]
    if (url) link.href = url
  }
}

let state = {
  version: snapshot.version,
  managed: snapshot.managed ?? {},
  nav: snapshot.nav ?? [],
  texts: snapshot.texts ?? [],
  settings: snapshot.settings ?? {},
  team: snapshot.managed?.team && snapshot.team?.lead ? snapshot.team : staticTeam,
  projects: snapshot.managed?.projects ? snapshot.projects : caseStudies,
  posts: postsIndex, // light (no article bodies); see loadFullPosts()
  postsVersion: snapshot.version,
  remountKey: 0,
}
setTexts(state.texts)
applySettings(state.settings)

const listeners = new Set()
const emit = () => listeners.forEach((listener) => listener())
const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
const getState = () => state

export function useCms(selector = (value) => value) {
  return selector(useSyncExternalStore(subscribe, getState, getState))
}

export const useNavExtras = () => useCms((s) => s.nav)
export const useTeam = () => useCms((s) => s.team)
export const useCaseStudies = () => useCms((s) => s.projects)

/** Preview unsaved text edits (Map original → replacement) on top of the saved overrides. */
export function previewTexts(pending) {
  const merged = new Map(state.texts)
  for (const [original, replacement] of pending) {
    if (replacement === original) merged.delete(original)
    else merged.set(original, replacement)
  }
  setTexts([...merged])
  refreshTree()
}

/** After a successful save: make the previewed edits the saved state. */
export function commitTexts(pending) {
  const merged = new Map(state.texts)
  for (const [original, replacement] of pending) {
    if (replacement === original) merged.delete(original)
    else merged.set(original, replacement)
  }
  state = { ...state, texts: [...merged] }
  setTexts(state.texts)
  refreshTree()
}

/** Re-render the whole route tree (needed after text overrides / edit mode change). */
export function refreshTree() {
  state = { ...state, remountKey: state.remountKey + 1 }
  emit()
}

/** Pull the lightweight live content (settings, menu, text overrides, team, portfolio). */
export async function syncContent() {
  if (typeof window === 'undefined') return
  try {
    // Always revalidate (cheap 304 via ETag) so an admin sees their edits immediately.
    const data = await api('/public/content', { revalidate: true })
    if (!data || typeof data.version !== 'string' || data.version === state.version) return
    state = {
      ...state,
      version: data.version,
      managed: data.managed ?? state.managed,
      nav: data.nav ?? [],
      texts: data.texts ?? [],
      settings: data.settings ?? {},
      team: data.managed?.team && data.team?.lead ? data.team : state.team,
      projects: data.managed?.projects ? (data.projects ?? []) : state.projects,
      remountKey: state.remountKey + 1,
    }
    setTexts(state.texts)
    applySettings(state.settings)
    emit()
  } catch {
    // No backend (or offline): keep the baked content.
  }
}

// Full article text (intro, takeaways, blocks, faqs): one small JSON file per article
// (src/data/post-bodies/, written by scripts/build-post-index.mjs), loaded only for the article being
// read. The blog index, cards and related-guide lists run on the light index above.
const bodyLoaders = import.meta.glob('/src/data/post-bodies/*.json', { import: 'default' })
const bodies = new Map() // slug -> body
const merged = new Map() // slug -> light post + body (stable identity between renders)

/** Fetches one article's text (resolves once it is cached). Never rejects. */
export function loadPostBody(slug) {
  if (bodies.has(slug)) return Promise.resolve()
  const load = bodyLoaders[`/src/data/post-bodies/${slug}.json`]
  if (!load) return Promise.resolve()
  return load().then((body) => void bodies.set(slug, body), () => {})
}

/** The complete article for a light post: the live admin version if one is loaded, else the baked text. */
export function getFullPost(post) {
  if (!post) return null
  if (post.blocks) return post
  const body = bodies.get(post.slug)
  if (!body) return null
  if (!merged.has(post.slug)) merged.set(post.slug, { ...post, ...body })
  return merged.get(post.slug)
}

/** Like getFullPost, but fetches the article text on demand; returns null until it has arrived. */
export function useFullPost(post) {
  const [, setLoaded] = useState(0)
  const missing = Boolean(post) && !post.blocks && !bodies.has(post.slug)
  const slug = post?.slug
  useEffect(() => {
    if (missing) loadPostBody(slug).then(() => setLoaded((n) => n + 1))
  }, [missing, slug])
  return getFullPost(post)
}

/** Blog pages call this: fetches full live articles when the baked ones are out of date. */
export async function syncPosts() {
  if (typeof window === 'undefined' || !state.managed.posts || state.postsVersion === state.version) return
  try {
    const data = await api('/public/posts', { revalidate: true })
    if (!Array.isArray(data?.posts)) return
    state = { ...state, posts: enrichPosts(data.posts), postsVersion: data.version ?? state.version }
    emit()
  } catch {
    // Keep the baked articles.
  }
}

/**
 * Articles for the blog pages: the live admin version when newer than the build, and only those
 * whose publish date has arrived (scheduled articles stay hidden until their day).
 */
export function usePosts() {
  const all = useCms((s) => s.posts)
  const posts = useMemo(() => publishedOnly(all), [all])
  const stale = useCms((s) => s.postsVersion !== s.version)
  useEffect(() => {
    if (stale) syncPosts()
  }, [stale])
  return posts
}

/** Call once at the app root: syncs live content after the first paint. */
export function useCmsSync(enabled = true) {
  useEffect(() => {
    if (enabled) syncContent()
  }, [enabled])
}
