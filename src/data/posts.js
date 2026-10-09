// Blog posts. Each article lives in its own file under ./posts/ (so long-form copy stays
// manageable) and is registered here. To publish a new article: add the file, import it below,
// and add it to `ordered`. scripts/prerender.mjs reads this module directly, so the new
// /blog/<slug> page is prerendered and added to the sitemap automatically.
//
// Article shape (see ./posts/helpers.js for the block constructors):
//   slug, title, shortTitle, description (<=160 chars), date, updated, category, keywords,
//   service { label, to }, related [slugs], intro, takeaways [], blocks [], faqs [].

import snapshot from './cms-snapshot.js'
import cmsPosts from './cms-posts.js'
import { enrichPosts, isPublished, publishedOnly, todayUtc } from './posts-light.js'
import aiAgents from './posts/ai-agents-for-business.js'
import aiChatbot from './posts/ai-chatbot-vs-live-chat.js'
import automation from './posts/business-process-automation.js'
import chooseCompany from './posts/choose-software-development-company.js'
import customSoftware from './posts/custom-software-vs-off-the-shelf.js'
import mobileAppCost from './posts/mobile-app-cost.js'
import reactNativeVsFlutter from './posts/react-native-vs-flutter-vs-native.js'
import apiIntegration from './posts/what-is-api-integration.js'
import buildAnAiAgentForYourBusiness from './posts/build-an-ai-agent-for-your-business.js'
import ragVsFineTuning from './posts/rag-vs-fine-tuning.js'
import aiVoiceAgentsForBusinessCalls from './posts/ai-voice-agents-for-business-calls.js'
import addAnAiChatbotToYourWebsite from './posts/add-an-ai-chatbot-to-your-website.js'
import aiContentAndSeoWhatGoogleSays from './posts/ai-content-and-seo-what-google-says.js'
import rankInGoogleAiOverviews from './posts/rank-in-google-ai-overviews.js'
import generativeEngineOptimizationGuide from './posts/generative-engine-optimization-guide.js'
import automateYourBusinessWithN8n from './posts/automate-your-business-with-n8n.js'
import zapierAlternatives from './posts/zapier-alternatives.js'
import aiAutomationForAgencies from './posts/ai-automation-for-agencies.js'
import chooseATechStackForYourStartup from './posts/choose-a-tech-stack-for-your-startup.js'
import nextjsVsReact from './posts/nextjs-vs-react.js'
import whatIsAHeadlessCms from './posts/what-is-a-headless-cms.js'
import wordpressVsCustomWebsite from './posts/wordpress-vs-custom-website.js'
import howLongDoesItTakeToBuildAWebsite from './posts/how-long-does-it-take-to-build-a-website.js'
import websiteMaintenancePlansAndCosts from './posts/website-maintenance-plans-and-costs.js'
import localSeoChecklistForServiceBusinesses from './posts/local-seo-checklist-for-service-businesses.js'
import schemaMarkupGuideForSmallBusiness from './posts/schema-markup-guide-for-small-business.js'
import imageSeoGuide from './posts/image-seo-guide.js'
import internalLinkingStrategy from './posts/internal-linking-strategy.js'
import keywordResearchForServiceBusinesses from './posts/keyword-research-for-service-businesses.js'
import b2bContentMarketingForTechCompanies from './posts/b2b-content-marketing-for-tech-companies.js'
import getYourFirst100AppUsers from './posts/get-your-first-100-app-users.js'
import flutterVsReactNative2027 from './posts/flutter-vs-react-native-2027.js'
import buildAnAppLikeUber from './posts/build-an-app-like-uber.js'
import buildAFoodDeliveryApp from './posts/build-a-food-delivery-app.js'
import buildAMarketplaceAppOrWebsite from './posts/build-a-marketplace-app-or-website.js'
import fintechAppDevelopmentGuide from './posts/fintech-app-development-guide.js'
import healthcareAppDevelopmentHipaa from './posts/healthcare-app-development-hipaa.js'
import elearningAppAndLmsDevelopment from './posts/elearning-app-and-lms-development.js'
import bookingAndAppointmentAppDevelopment from './posts/booking-and-appointment-app-development.js'
import pushNotificationBestPractices from './posts/push-notification-best-practices.js'
import mobileAppAnalyticsMetrics from './posts/mobile-app-analytics-metrics.js'
import mobileAppMonetizationModels from './posts/mobile-app-monetization-models.js'
import publishAnAppOnTheAppStoreAndGooglePlay from './posts/publish-an-app-on-the-app-store-and-google-play.js'
import progressiveWebAppDevelopment from './posts/progressive-web-app-development.js'
import crossPlatformVsNativeCost from './posts/cross-platform-vs-native-cost.js'
import apiDesignBestPractices from './posts/api-design-best-practices.js'
import webhooksVsPolling from './posts/webhooks-vs-polling.js'
import microservicesVsMonolith from './posts/microservices-vs-monolith.js'
import cloudHostingCostsForSmallBusiness from './posts/cloud-hosting-costs-for-small-business.js'
import devopsAndCiCdForSmallTeams from './posts/devops-and-ci-cd-for-small-teams.js'
import sqlVsNosqlForBusinessApps from './posts/sql-vs-nosql-for-business-apps.js'
import authenticationOptionsPasskeysOauthSso from './posts/authentication-options-passkeys-oauth-sso.js'
import backupAndDisasterRecoveryForSmallBusiness from './posts/backup-and-disaster-recovery-for-small-business.js'
import websiteSecurityBasicsForSmallBusiness from './posts/website-security-basics-for-small-business.js'
import gdprCookieConsentForWebsites from './posts/gdpr-cookie-consent-for-websites.js'
import paymentGatewaysCompared from './posts/payment-gateways-compared.js'
import ecommerceSeoProductPages from './posts/ecommerce-seo-product-pages.js'
import headlessCommerceExplained from './posts/headless-commerce-explained.js'
import shopifyCustomAppDevelopment from './posts/shopify-custom-app-development.js'
import marketingAutomationForSmallBusiness from './posts/marketing-automation-for-small-business.js'
import hubspotVsZohoVsCustomCrm from './posts/hubspot-vs-zoho-vs-custom-crm.js'
import erpForSmallBusiness from './posts/erp-for-small-business.js'
import inventoryManagementSoftwareBuildOrBuy from './posts/inventory-management-software-build-or-buy.js'
import accountingAndBookkeepingAutomation from './posts/accounting-and-bookkeeping-automation.js'
import hrAndRecruitmentAutomationWithAi from './posts/hr-and-recruitment-automation-with-ai.js'
import aiDocumentProcessing from './posts/ai-document-processing.js'
import aiMeetingNotesAndFollowUpAutomation from './posts/ai-meeting-notes-and-follow-up-automation.js'
import promptEngineeringForBusinessTeams from './posts/prompt-engineering-for-business-teams.js'
import aiChatbotMistakes from './posts/ai-chatbot-mistakes.js'
import measureRoiOnAiAndAutomation from './posts/measure-roi-on-ai-and-automation.js'
import softwareProjectEstimation from './posts/software-project-estimation.js'
import outsourcingSoftwareDevelopment from './posts/outsourcing-software-development.js'
import freelancerVsAgencyVsInHouse from './posts/freelancer-vs-agency-vs-in-house.js'
import softwareDevelopmentContractGuide from './posts/software-development-contract-guide.js'
import uxDesignBasicsForBusinessOwners from './posts/ux-design-basics-for-business-owners.js'
import landingPageBestPractices from './posts/landing-page-best-practices.js'
import conversionRateOptimizationForServiceWebsites from './posts/conversion-rate-optimization-for-service-websites.js'
import howToMakeYourWebsiteFaster from './posts/how-to-make-your-website-faster.js'
import webHostingForFastSites from './posts/web-hosting-for-fast-sites.js'
import spfDkimDmarcExplained from './posts/spf-dkim-dmarc-explained.js'
import googleAnalytics4SetupGuide from './posts/google-analytics-4-setup-guide.js'
import googleSearchConsoleIndexingGuide from './posts/google-search-console-indexing-guide.js'
import getBacklinksWithoutSpamming from './posts/get-backlinks-without-spamming.js'
import guestPostingAndDigitalPr from './posts/guest-posting-and-digital-pr.js'
import pricingSoftwareServices from './posts/pricing-software-services.js'
import noCodeVsLowCodeVsCustomCode from './posts/no-code-vs-low-code-vs-custom-code.js'
import vibeCodingRisksAndBenefits from './posts/vibe-coding-risks-and-benefits.js'
import technicalDebtExplained from './posts/technical-debt-explained.js'
import softwareTestingForFounders from './posts/software-testing-for-founders.js'
import productRoadmapGuide from './posts/product-roadmap-guide.js'
import saasMetricsGuide from './posts/saas-metrics-guide.js'
import multiTenantSaasArchitecture from './posts/multi-tenant-saas-architecture.js'
import subscriptionBillingForApps from './posts/subscription-billing-for-apps.js'
import businessDashboardsAndReporting from './posts/business-dashboards-and-reporting.js'
import ecommerceChatbotUseCases from './posts/ecommerce-chatbot-use-cases.js'
import messengerAndInstagramChatbotsForLeads from './posts/messenger-and-instagram-chatbots-for-leads.js'
import technologyTrends2027ForBusinessOwners from './posts/technology-trends-2027-for-business-owners.js'
import softwareProjectChecklist from './posts/software-project-checklist.js'
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
  softwareProjectChecklist,
  technologyTrends2027ForBusinessOwners,
  messengerAndInstagramChatbotsForLeads,
  ecommerceChatbotUseCases,
  businessDashboardsAndReporting,
  subscriptionBillingForApps,
  multiTenantSaasArchitecture,
  saasMetricsGuide,
  productRoadmapGuide,
  softwareTestingForFounders,
  technicalDebtExplained,
  vibeCodingRisksAndBenefits,
  noCodeVsLowCodeVsCustomCode,
  pricingSoftwareServices,
  guestPostingAndDigitalPr,
  getBacklinksWithoutSpamming,
  googleSearchConsoleIndexingGuide,
  googleAnalytics4SetupGuide,
  spfDkimDmarcExplained,
  webHostingForFastSites,
  howToMakeYourWebsiteFaster,
  conversionRateOptimizationForServiceWebsites,
  landingPageBestPractices,
  uxDesignBasicsForBusinessOwners,
  softwareDevelopmentContractGuide,
  freelancerVsAgencyVsInHouse,
  outsourcingSoftwareDevelopment,
  softwareProjectEstimation,
  measureRoiOnAiAndAutomation,
  aiChatbotMistakes,
  promptEngineeringForBusinessTeams,
  aiMeetingNotesAndFollowUpAutomation,
  aiDocumentProcessing,
  hrAndRecruitmentAutomationWithAi,
  accountingAndBookkeepingAutomation,
  inventoryManagementSoftwareBuildOrBuy,
  erpForSmallBusiness,
  hubspotVsZohoVsCustomCrm,
  marketingAutomationForSmallBusiness,
  shopifyCustomAppDevelopment,
  headlessCommerceExplained,
  ecommerceSeoProductPages,
  paymentGatewaysCompared,
  gdprCookieConsentForWebsites,
  websiteSecurityBasicsForSmallBusiness,
  backupAndDisasterRecoveryForSmallBusiness,
  authenticationOptionsPasskeysOauthSso,
  sqlVsNosqlForBusinessApps,
  devopsAndCiCdForSmallTeams,
  cloudHostingCostsForSmallBusiness,
  microservicesVsMonolith,
  webhooksVsPolling,
  apiDesignBestPractices,
  crossPlatformVsNativeCost,
  progressiveWebAppDevelopment,
  publishAnAppOnTheAppStoreAndGooglePlay,
  mobileAppMonetizationModels,
  mobileAppAnalyticsMetrics,
  pushNotificationBestPractices,
  bookingAndAppointmentAppDevelopment,
  elearningAppAndLmsDevelopment,
  healthcareAppDevelopmentHipaa,
  fintechAppDevelopmentGuide,
  buildAMarketplaceAppOrWebsite,
  buildAFoodDeliveryApp,
  buildAnAppLikeUber,
  flutterVsReactNative2027,
  getYourFirst100AppUsers,
  b2bContentMarketingForTechCompanies,
  keywordResearchForServiceBusinesses,
  internalLinkingStrategy,
  imageSeoGuide,
  schemaMarkupGuideForSmallBusiness,
  localSeoChecklistForServiceBusinesses,
  websiteMaintenancePlansAndCosts,
  howLongDoesItTakeToBuildAWebsite,
  wordpressVsCustomWebsite,
  whatIsAHeadlessCms,
  nextjsVsReact,
  chooseATechStackForYourStartup,
  aiAutomationForAgencies,
  zapierAlternatives,
  automateYourBusinessWithN8n,
  generativeEngineOptimizationGuide,
  rankInGoogleAiOverviews,
  aiContentAndSeoWhatGoogleSays,
  addAnAiChatbotToYourWebsite,
  aiVoiceAgentsForBusinessCalls,
  ragVsFineTuning,
  buildAnAiAgentForYourBusiness,
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
  reactNativeVsFlutter,
  chooseCompany,
  aiAgents,
  mobileAppCost,
  aiChatbot,
  customSoftware,
  apiIntegration,
  automation,
]

// Re-exported so existing imports keep working; the implementations live in ./posts-light.js.
export { enrichPosts, isPublished, publishedOnly, todayUtc }

// The articles shipped in code — also the starter content the admin installer loads.
export const staticPosts = enrichPosts(ordered)

// What this build ships: the admin's published articles once the backend manages posts
// (src/data/cms-snapshot.js is generated in CI from the admin), otherwise the code articles.
// Browser code should read posts through usePosts() so live admin edits show up before the
// next rebuild; Node scripts (prerender, og-images) use this baked list.
// Every article including scheduled ones (browser code filters by date at render time).
export const allPosts = snapshot.managed?.posts ? enrichPosts(cmsPosts) : staticPosts

// Articles that are live today — what Node scripts (prerender, og-images, sitemap, feed) use.
export const posts = publishedOnly(allPosts)

export const getPostBySlug = (slug, list = posts) => list.find((post) => post.slug === slug)

export const getRelatedPosts = (post, list = posts) =>
  (post.related ?? []).map((slug) => getPostBySlug(slug, list)).filter(Boolean)
