// Blog posts. Each article lives in its own file under ./posts/ (so long-form copy stays
// manageable) and is registered here. To publish a new article: add the file, import it below,
// and add it to `ordered`. scripts/prerender.mjs reads this module directly, so the new
// /blog/<slug> page is prerendered and added to the sitemap automatically.
//
// Article shape (see ./posts/helpers.js for the block constructors):
//   slug, title, shortTitle, description (<=160 chars), date, updated, category, keywords,
//   service { label, to }, related [slugs], intro, takeaways [], blocks [], faqs [].

import { countWords, readMinutes } from '../lib/article.js'
import snapshot from './cms-snapshot.js'
import aiAgents from './posts/ai-agents-for-business.js'
import aiChatbot from './posts/ai-chatbot-vs-live-chat.js'
import automation from './posts/business-process-automation.js'
import chooseCompany from './posts/choose-software-development-company.js'
import customSoftware from './posts/custom-software-vs-off-the-shelf.js'
import mobileAppCost from './posts/mobile-app-cost.js'
import reactNativeVsFlutter from './posts/react-native-vs-flutter-vs-native.js'
import apiIntegration from './posts/what-is-api-integration.js'

// Display order on the blog index: newest first, then by topic importance.
const ordered = [
  mobileAppCost,
  reactNativeVsFlutter,
  chooseCompany,
  aiAgents,
  aiChatbot,
  customSoftware,
  apiIntegration,
  automation,
]

const enrich = (post) => ({
  ...post,
  wordCount: countWords(post),
  readMinutes: readMinutes(post),
})

export const enrichPosts = (list) => list.map(enrich)

// The articles shipped in code — also the starter content the admin installer loads.
export const staticPosts = enrichPosts(ordered)

// What this build ships: the admin's published articles once the backend manages posts
// (src/data/cms-snapshot.js is generated in CI from the admin), otherwise the code articles.
// Browser code should read posts through usePosts() so live admin edits show up before the
// next rebuild; Node scripts (prerender, og-images) use this baked list.
export const posts = snapshot.managed?.posts ? enrichPosts(snapshot.posts) : staticPosts

export const getPostBySlug = (slug, list = posts) => list.find((post) => post.slug === slug)

export const getRelatedPosts = (post, list = posts) =>
  (post.related ?? []).map((slug) => getPostBySlug(slug, list)).filter(Boolean)
