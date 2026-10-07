// Blog posts. Each article lives in its own file under ./posts/ (so long-form copy stays
// manageable) and is registered here. To publish a new article: add the file, import it below,
// and add it to `ordered`. scripts/prerender.mjs reads this module directly, so the new
// /blog/<slug> page is prerendered and added to the sitemap automatically.
//
// Article shape (see ./posts/helpers.js for the block constructors):
//   slug, title, shortTitle, description (<=160 chars), date, updated, category, keywords,
//   service { label, to }, related [slugs], intro, takeaways [], blocks [], faqs [].

import { countWords, readMinutes } from '../lib/article.js'
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

export const posts = ordered.map((post) => ({
  ...post,
  wordCount: countWords(post),
  readMinutes: readMinutes(post),
}))

export const getPostBySlug = (slug) => posts.find((post) => post.slug === slug)

export const getRelatedPosts = (post) =>
  post.related.map((slug) => getPostBySlug(slug)).filter(Boolean)
