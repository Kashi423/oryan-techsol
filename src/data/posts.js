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
import covers from './posts/covers.js'
import aiAgents from './posts/ai-agents-for-business.js'
import aiChatbot from './posts/ai-chatbot-vs-live-chat.js'
import automation from './posts/business-process-automation.js'
import chooseCompany from './posts/choose-software-development-company.js'
import customSoftware from './posts/custom-software-vs-off-the-shelf.js'
import mobileAppCost from './posts/mobile-app-cost.js'
import reactNativeVsFlutter from './posts/react-native-vs-flutter-vs-native.js'
import apiIntegration from './posts/what-is-api-integration.js'
import agileVsWaterfallForSoftwareProjects from './posts/agile-vs-waterfall-for-software-projects.js'
import aiCustomerSupportAutomationGuide from './posts/ai-customer-support-automation-guide.js'
import aiLeadQualificationForSalesTeams from './posts/ai-lead-qualification-for-sales-teams.js'
import aiPrivacyAndSecurityForSmallBusiness from './posts/ai-privacy-and-security-for-small-business.js'
import appStoreOptimizationBasics from './posts/app-store-optimization-basics.js'
import coreWebVitalsExplained from './posts/core-web-vitals-explained.js'
import crmAutomationIdeasForSmallBusiness from './posts/crm-automation-ideas-for-small-business.js'
import customerPortalDevelopmentGuide from './posts/customer-portal-development-guide.js'
import howMuchDoesABusinessWebsiteCost from './posts/how-much-does-a-business-website-cost.js'
import howToBuildASaasProduct from './posts/how-to-build-a-saas-product.js'
import howToReduceCartAbandonment from './posts/how-to-reduce-cart-abandonment.js'
import howToValidateAnAppIdea from './posts/how-to-validate-an-app-idea.js'
import howToWriteAnAppRequirementsDocument from './posts/how-to-write-an-app-requirements-document.js'
import invoiceAndPaymentAutomationGuide from './posts/invoice-and-payment-automation-guide.js'
import legacySoftwareModernizationGuide from './posts/legacy-software-modernization-guide.js'
import mobileAppDevelopmentProcess from './posts/mobile-app-development-process.js'
import mobileAppMaintenanceWhatToBudget from './posts/mobile-app-maintenance-what-to-budget.js'
import mobileAppSecurityChecklist from './posts/mobile-app-security-checklist.js'
import mvpDevelopmentGuideForStartups from './posts/mvp-development-guide-for-startups.js'
import pwaVsNativeApp from './posts/pwa-vs-native-app.js'
import restVsGraphqlVsWebhooks from './posts/rest-vs-graphql-vs-webhooks.js'
import saasPricingModelsExplained from './posts/saas-pricing-models-explained.js'
import shopifyVsWoocommerceVsCustomStore from './posts/shopify-vs-woocommerce-vs-custom-store.js'
import technicalSeoChecklistForBusinessWebsites from './posts/technical-seo-checklist-for-business-websites.js'
import trainAChatbotOnYourBusinessData from './posts/train-a-chatbot-on-your-business-data.js'
import webAppVsWebsiteWhichDoYouNeed from './posts/web-app-vs-website-which-do-you-need.js'
import websiteAccessibilityBasics from './posts/website-accessibility-basics.js'
import websiteRedesignSeoChecklist from './posts/website-redesign-seo-checklist.js'
import whatsappBusinessChatbotGuide from './posts/whatsapp-business-chatbot-guide.js'
import zapierMakeOrCustomAutomation from './posts/zapier-make-or-custom-automation.js'

// Display order on the blog index: newest first, then by topic importance.
const ordered = [
  mobileAppMaintenanceWhatToBudget,
  websiteAccessibilityBasics,
  customerPortalDevelopmentGuide,
  appStoreOptimizationBasics,
  legacySoftwareModernizationGuide,
  howToWriteAnAppRequirementsDocument,
  agileVsWaterfallForSoftwareProjects,
  aiPrivacyAndSecurityForSmallBusiness,
  websiteRedesignSeoChecklist,
  mobileAppSecurityChecklist,
  crmAutomationIdeasForSmallBusiness,
  saasPricingModelsExplained,
  webAppVsWebsiteWhichDoYouNeed,
  aiLeadQualificationForSalesTeams,
  howToReduceCartAbandonment,
  pwaVsNativeApp,
  restVsGraphqlVsWebhooks,
  invoiceAndPaymentAutomationGuide,
  technicalSeoChecklistForBusinessWebsites,
  aiCustomerSupportAutomationGuide,
  howToBuildASaasProduct,
  mvpDevelopmentGuideForStartups,
  shopifyVsWoocommerceVsCustomStore,
  whatsappBusinessChatbotGuide,
  coreWebVitalsExplained,
  howToValidateAnAppIdea,
  zapierMakeOrCustomAutomation,
  trainAChatbotOnYourBusinessData,
  howMuchDoesABusinessWebsiteCost,
  mobileAppDevelopmentProcess,
  mobileAppCost,
  reactNativeVsFlutter,
  chooseCompany,
  aiAgents,
  aiChatbot,
  customSoftware,
  apiIntegration,
  automation,
]

// A post's cover: the self-hosted stock photo from covers.js, or — for articles created in the admin —
// the image chosen there.
const enrich = (post) => ({
  ...post,
  cover: covers[post.slug] ? { ...covers[post.slug], alt: `Cover image for ${post.shortTitle ?? post.title}` } : (post.image ? { src: post.image, alt: post.title, width: 1200, height: 675 } : null),
  wordCount: countWords(post),
  readMinutes: readMinutes(post),
})

export const enrichPosts = (list) => list.map(enrich)

// Scheduled publishing: an article's `date` is its publish day (UTC). Until that day it is
// hidden everywhere — blog index, its own URL, sitemap, feed. A daily GitHub Actions run rebuilds
// the site just after midnight UTC (see .github/workflows/deploy.yml) so the prerendered HTML and
// sitemap pick up the day's new article; browsers also re-check the date themselves.
// SITE_TODAY lets a Node script preview a future date (e.g. to test scheduled posts).
export const todayUtc = () =>
  (typeof process !== 'undefined' && process.env?.SITE_TODAY) || new Date().toISOString().slice(0, 10)
export const isPublished = (post, today = todayUtc()) => post.date <= today
export const publishedOnly = (list, today = todayUtc()) => list.filter((post) => isPublished(post, today))

// The articles shipped in code — also the starter content the admin installer loads.
export const staticPosts = enrichPosts(ordered)

// What this build ships: the admin's published articles once the backend manages posts
// (src/data/cms-snapshot.js is generated in CI from the admin), otherwise the code articles.
// Browser code should read posts through usePosts() so live admin edits show up before the
// next rebuild; Node scripts (prerender, og-images) use this baked list.
// Every article including scheduled ones (browser code filters by date at render time).
export const allPosts = snapshot.managed?.posts ? enrichPosts(snapshot.posts) : staticPosts

// Articles that are live today — what Node scripts (prerender, og-images, sitemap, feed) use.
export const posts = publishedOnly(allPosts)

export const getPostBySlug = (slug, list = posts) => list.find((post) => post.slug === slug)

export const getRelatedPosts = (post, list = posts) =>
  (post.related ?? []).map((slug) => getPostBySlug(slug, list)).filter(Boolean)
