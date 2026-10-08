import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'multi-tenant-saas-architecture',
  title: 'Multi-Tenant SaaS Architecture Explained',
  shortTitle: 'Multi-tenant SaaS architecture',
  description:
    'Multi-tenant SaaS architecture explained: shared vs separate databases, data isolation, tenant onboarding, customisation, scaling and how to choose a model.',
  date: '2027-01-30',
  updated: '2027-01-30',
  category: 'Custom Software',
  keywords:
    'multi tenant saas architecture, what is multi tenancy, shared database vs database per tenant, tenant data isolation, saas tenant onboarding, single tenant vs multi tenant, saas security isolation',
  service: { label: 'SaaS & web application development', to: '/saas-development' },
  related: ['how-to-build-a-saas-product', 'sql-vs-nosql-for-business-apps', 'microservices-vs-monolith', 'authentication-options-passkeys-oauth-sso'],
  intro:
    'When you build software for one company, the question of whose data is whose answers itself. When you build a SaaS product for hundreds or thousands of customer organisations, it becomes the central architectural problem: how do you serve many customers from one platform while keeping each customer’s data private, their experience reliable, your costs low and your operations manageable? The answer is multi-tenancy. A “tenant” is a customer organisation, and a multi-tenant system serves many tenants from shared infrastructure, like apartments in a building rather than separate houses. The way you design tenancy affects security, performance, cost, customisation and how easily you can grow, and it is much harder to change later than to choose well now. This guide explains multi-tenancy in plain language, compares the main data models, covers isolation and security, tenant onboarding and customisation, scaling issues like noisy neighbours and gives guidance on choosing an approach.',
  takeaways: [
    'Multi-tenancy means one application serving many customers, each with logically isolated data and configuration.',
    'The core design choice is how tenants share data: a shared database with tenant IDs, separate schemas or separate databases per tenant.',
    'Tenant isolation is a security and trust requirement: authorisation checks must enforce it everywhere.',
    'Plan for onboarding, tenant-specific configuration, billing, monitoring and limits to stop one tenant harming others.',
    'Start simple, usually a shared database with strict isolation, and keep options open for premium or regulated tenants.',
  ],
  blocks: [
    h2('Single-tenant vs. multi-tenant'),
    p(
      'In a **single-tenant** deployment, each customer gets their own instance of the application and database, perhaps on dedicated infrastructure. It offers strong isolation and easy per-customer customisation, but it multiplies operational work and cost: every upgrade, backup and monitoring task is repeated for every customer. In a **multi-tenant** deployment, all customers share the same application, and often the same infrastructure, with software enforcing separation. It is dramatically more efficient to run and update, which is why most SaaS products are multi-tenant, but it demands careful design to keep data isolated and performance fair.',
    ),
    compare(
      'Trade-offs at a glance',
      {
        title: 'Single-tenant',
        points: [
          'Strong isolation by design',
          'Easy per-customer customisation and compliance',
          'High operating cost and effort per customer',
          'Slower, riskier upgrades across many instances',
        ],
      },
      {
        title: 'Multi-tenant',
        points: [
          'Efficient: shared infrastructure and one codebase',
          'Fast, consistent updates for everyone',
          'Lower cost per customer, which supports pricing',
          'Isolation, fairness and customisation need deliberate engineering',
        ],
      },
    ),
    p(
      'Multi-tenancy is a foundation of the SaaS model described in [how to build a SaaS product](/blog/how-to-build-a-saas-product).',
    ),

    h2('The three main data models'),
    table(
      'How tenants can share a database',
      ['Model', 'How it works', 'Pros', 'Cons'],
      [
        ['Shared database, shared schema', 'All tenants’ rows live in the same tables, distinguished by a tenant ID column', 'Simplest and cheapest to run; easy to scale to many tenants; one migration for all', 'Isolation depends entirely on application code and database rules; noisy neighbours; harder per-tenant restore'],
        ['Shared database, separate schema per tenant', 'One database, but each tenant has their own set of tables (a schema)', 'Stronger logical separation; per-tenant customisation and some per-tenant operations are easier', 'Many schemas complicate migrations; limits at large tenant counts'],
        ['Separate database per tenant', 'Each tenant has a dedicated database, with a shared application', 'Strongest isolation; per-tenant backup, restore, scaling and data residency; good for large or regulated customers', 'Higher cost and operational complexity; harder cross-tenant reporting; onboarding is heavier'],
      ],
    ),
    p(
      'Database choices interact with this decision; see [SQL vs. NoSQL for business apps](/blog/sql-vs-nosql-for-business-apps). Many successful products start with the shared-schema model for simplicity, and offer dedicated databases to premium or regulated customers later, a hybrid sometimes called the “pool and silo” approach.',
    ),
    callout(
      'tip',
      'Add tenant ID from day one',
      'Even if you begin with one customer, include a tenant identifier on every table that holds customer data. Retrofitting multi-tenancy into a single-tenant data model is painful and error-prone.',
    ),

    h2('Data isolation: the non-negotiable'),
    p(
      'In a multi-tenant system, the nightmare scenario is one customer seeing another’s data. It destroys trust and may breach contracts and law. Isolation must be enforced consistently, in every layer, not left to developers remembering to add a filter.',
    ),
    checklist(
      'Isolation safeguards',
      [
        'Resolve the tenant from a trusted source, such as the authenticated user’s membership, never from a value the client can freely change',
        'Apply tenant filters centrally, through a data-access layer, framework hooks or database row-level security, instead of ad hoc in every query',
        'Test isolation explicitly: automated tests that try to access one tenant’s data as another',
        'Scope caches, search indexes, file storage and background jobs by tenant, not just the database',
        'Include the tenant in logs and audit trails, and be careful that logs do not leak data across tenants',
        'Use per-tenant encryption keys for sensitive or regulated data where required',
        'Review APIs for object-level authorisation: a user changing an ID in a request must not reach another tenant’s record',
        'Run regular security reviews and penetration tests focusing on cross-tenant access',
      ],
    ),
    p(
      'Many serious SaaS breaches stem from missing authorisation checks rather than clever attacks. Strong authentication matters too; see [authentication options](/blog/authentication-options-passkeys-oauth-sso), and the API-level rules in [API design best practices](/blog/api-design-best-practices).',
    ),

    h2('Tenant identity, users and roles'),
    ul(
      '**Users and tenants:** a person may belong to several tenants, such as a consultant working with multiple client accounts, so model membership explicitly rather than assuming one user, one tenant.',
      '**Roles and permissions per tenant:** owners, admins, members and read-only users, with tenant-specific customisation for larger customers.',
      '**Single sign-on and provisioning:** enterprise tenants usually require SSO and automated user provisioning with their identity provider.',
      '**Tenant resolution:** identify the tenant from the subdomain (customer.yourapp.com), a path, a custom domain or the authenticated session, and be consistent.',
      '**Tenant lifecycle:** creation, suspension for non-payment, export of data and deletion at the end of the relationship, honouring privacy law.',
    ),

    h2('Onboarding new tenants'),
    steps(
      'A smooth tenant onboarding flow',
      [
        { title: 'Signup and verification', text: 'Create the tenant and the first admin user.' },
        { title: 'Provision resources', text: 'Create records, schemas or databases, default settings, storage areas and subdomain.' },
        { title: 'Apply plan and limits', text: 'Attach the subscription plan and usage limits.' },
        { title: 'Seed data and guide', text: 'Load sample content or templates and onboarding steps.' },
        { title: 'Invite users', text: 'Let the admin bring in colleagues and configure roles.' },
        { title: 'Monitor activation', text: 'Track whether the tenant reaches first value; see [SaaS metrics guide](/blog/saas-metrics-guide).' },
      ],
    ),
    p(
      'Automate provisioning completely. Manual setup does not scale and introduces mistakes. The more heavyweight your isolation model, the more important it is to script and test tenant creation.',
    ),

    h2('Configuration and customisation'),
    p(
      'Customers want the product to fit their business: branding, workflows, fields, permissions and integrations. In a multi-tenant system, you must provide customisation through configuration, not code forks. Common patterns include per-tenant settings and feature flags, custom fields and metadata, theming and white-labelling, configurable workflows and rules and integration settings. Resist building one-off code for individual customers; it breaks the efficiency advantage of multi-tenancy. If a request is common, build it as a configurable feature for everyone; if it is unique and valuable, consider charging for a premium or dedicated option.',
    ),

    h2('Scaling and the noisy neighbour problem'),
    p(
      'Because tenants share resources, a heavy tenant can slow down others, running a huge report, importing a million rows or sending a burst of API calls. This is the **noisy neighbour** problem. Plan for fairness.',
    ),
    ul(
      '**Rate limiting and quotas** per tenant for API calls, storage, users and heavy operations.',
      '**Background processing with fair queues,** so one tenant’s jobs do not starve others.',
      '**Efficient queries and indexes,** including tenant ID in indexes so performance scales.',
      '**Resource limits and monitoring** per tenant, with alerts for abnormal usage.',
      '**Sharding or placement strategies:** distribute tenants across databases or clusters as you grow, moving large tenants to dedicated resources.',
      '**Caching and read replicas** to absorb load.',
    ),
    callout(
      'note',
      'Scale in stages',
      'Start with a well-structured single application and database. Add replicas, caching, queues and sharding when measurements show a need, in line with the “earn your complexity” principle in [microservices vs. monolith](/blog/microservices-vs-monolith).',
    ),

    h2('Operations: updates, backups and monitoring'),
    ul(
      '**Deployments:** one release serves all tenants, which is efficient but means mistakes affect everyone; use staged rollouts, feature flags and automated tests; see [DevOps for small teams](/blog/devops-and-ci-cd-for-small-teams).',
      '**Database migrations:** with shared schemas, one migration; with per-tenant schemas or databases, run migrations across all tenants reliably, tracking failures.',
      '**Backups and restores:** shared databases make restoring a single tenant harder, so design tools for tenant-level export and restore; see [backup and disaster recovery](/blog/backup-and-disaster-recovery-for-small-business).',
      '**Monitoring and support:** tag metrics, logs and errors with tenant IDs so you can diagnose one customer’s problem quickly.',
      '**Data residency and compliance:** some tenants require data in specific regions; dedicated databases or regional deployments may be needed.',
    ),

    h2('Billing and tenancy'),
    p(
      'Tenants map naturally to subscriptions: plans, seats, usage metering and invoices belong to the tenant. Enforce plan limits in the application, handle trial expiry and suspension gracefully and keep billing data consistent with tenant state. Design the connection between your tenant model and your billing provider early; see subscription billing for apps.',
    ),

    h2('Choosing a model'),
    table(
      'Which approach fits?',
      ['Situation', 'Likely model'],
      [
        ['Early-stage SaaS with many small customers', 'Shared database and schema, with tenant ID and strict isolation'],
        ['Need stronger separation but many tenants', 'Schema per tenant, if tooling can manage migrations'],
        ['Large enterprise or regulated customers needing guarantees', 'Database per tenant, or dedicated instances for those tenants'],
        ['Mix of small and enterprise customers', 'Hybrid: pooled for most, dedicated for premium'],
        ['Data residency requirements', 'Regional deployments, with tenants placed in the required region'],
        ['Heavy customisation per customer', 'Configuration platform; consider single-tenant only where truly necessary'],
      ],
    ),
    steps(
      'A decision process',
      [
        { title: 'List isolation and compliance requirements', text: 'Contractual, regulatory and customer expectations.' },
        { title: 'Estimate tenant count and size', text: 'Many small tenants favour pooled models; few huge ones favour dedicated.' },
        { title: 'Assess operational capacity', text: 'Can your team manage hundreds of schemas or databases?' },
        { title: 'Choose a default and an escape hatch', text: 'A simple default with a way to move tenants to dedicated resources later.' },
        { title: 'Prototype and test isolation and load', text: 'Verify the approach under realistic conditions.' },
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**Relying on developers to remember tenant filters** in every query.',
      '**No automated tests for cross-tenant access.**',
      '**Customising code per customer,** creating unmaintainable forks.',
      '**Forgetting caches, files and jobs** when scoping by tenant.',
      '**Ignoring noisy neighbours** until a big customer complains.',
      '**Choosing the heaviest model too early,** burdening operations.',
      '**No tenant-level backup, export or deletion tools.**',
    ),
    cta(
      'Building a SaaS platform and want tenancy, security and scaling designed correctly from the start? We architect and build multi-tenant products with isolation, billing and operations in mind.',
      '/contact',
      'Design your SaaS architecture',
    ),
  ],
  faqs: [
    {
      question: 'What is multi-tenancy?',
      answer:
        'Multi-tenancy is an architecture where one application serves many customers, called tenants, from shared infrastructure, with each tenant’s data and configuration logically isolated from the others.',
    },
    {
      question: 'Shared database vs database per tenant?',
      answer:
        'A shared database is simpler and cheaper and scales to many tenants, but isolation relies on software controls. A database per tenant offers stronger isolation and per-tenant operations at higher cost and complexity. Many products use a hybrid.',
    },
    {
      question: 'How do I isolate customer data?',
      answer:
        'Resolve the tenant from a trusted source, apply tenant filters centrally in the data layer or with row-level security, scope caches, files and jobs by tenant, test cross-tenant access explicitly and review authorisation on every API.',
    },
    {
      question: 'What is the noisy neighbour problem?',
      answer:
        'It occurs when one tenant uses a disproportionate share of shared resources and slows others. Mitigate it with rate limits, quotas, fair queues, efficient queries and monitoring.',
    },
    {
      question: 'Can I start single-tenant and move to multi-tenant later?',
      answer:
        'It is possible but painful. Include tenant identifiers and isolation in your design from the start, even with a single customer, to avoid a difficult retrofit.',
    },
  ],
}
