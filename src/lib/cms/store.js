import { useEffect, useSyncExternalStore } from 'react'
import { contactInfo, socialLinks } from '@/config/site'
import snapshot from '@/data/cms-snapshot'
import { caseStudies } from '@/data/caseStudies'
import { enrichPosts, posts as bakedPosts } from '@/data/posts'
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
  posts: bakedPosts,
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

/** Articles for the blog pages (live admin version when newer than the build). */
export function usePosts() {
  const posts = useCms((s) => s.posts)
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
