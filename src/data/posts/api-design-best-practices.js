import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'api-design-best-practices',
  title: 'API Design Best Practices for Business Apps',
  shortTitle: 'API design best practices',
  description:
    'API design best practices: resource naming, HTTP methods, versioning, pagination, errors, authentication, rate limiting and documentation for business apps.',
  date: '2026-12-15',
  updated: '2026-12-15',
  category: 'Custom Software',
  keywords:
    'api design best practices, rest api design, how to version an api, api authentication, api error handling, api pagination, secure api design, openapi documentation',
  service: { label: 'API & system integrations', to: '/api-integrations' },
  related: ['what-is-api-integration', 'rest-vs-graphql-vs-webhooks', 'mobile-app-security-checklist', 'how-to-build-a-saas-product'],
  intro:
    'An API is the contract between your software and everything that talks to it: your mobile app, your website, your partners and the integrations your customers build. A well-designed API is easy to learn, hard to misuse and stable for years. A poorly designed one slows every project that touches it, breaks clients with each change and sometimes exposes data it never should. Because other people’s code comes to depend on it, an API is difficult to fix once released, so getting the basics right at the start pays off enormously. This guide covers the practical principles of designing APIs for business applications: naming and structure, the right use of HTTP, consistent errors, pagination, versioning, authentication and authorisation, rate limiting and documentation.',
  takeaways: [
    'Design the API as a product with consumers: consistent, predictable and well documented.',
    'Model resources with clear nouns and use HTTP methods and status codes correctly.',
    'Plan for change from day one with versioning and backward-compatible evolution.',
    'Security is part of the design: authenticate, authorise every request, validate input and limit abuse.',
    'Good errors, pagination, filtering and documentation turn a working API into a pleasant one.',
  ],
  blocks: [
    h2('Think of the API as a product'),
    p(
      'Before writing endpoints, ask who will use the API and what they want to achieve. Internal teams building a mobile app have different needs from external partners integrating your service. Write down the main use cases and design the API around tasks people actually perform, not around your database tables. For background on why APIs matter to businesses, see [what API integration is](/blog/what-is-api-integration), and for choosing between styles such as REST, GraphQL and webhooks, read [REST vs. GraphQL vs. webhooks](/blog/rest-vs-graphql-vs-webhooks). This article focuses on REST-style design, the most common approach for business apps, though many principles apply broadly.',
    ),

    h2('Resources, names and URLs'),
    p(
      'REST APIs organise around **resources**: the things your system manages, such as customers, orders, invoices and products. Each resource has a URL, and you act on it with standard HTTP methods. Use nouns, not verbs, keep naming consistent and make URLs predictable.',
    ),
    table(
      'Examples of clear resource design',
      ['Goal', 'Request', 'Notes'],
      [
        ['List customers', 'GET /customers', 'Supports filtering and pagination'],
        ['Get one customer', 'GET /customers/{id}', 'Returns a single resource'],
        ['Create a customer', 'POST /customers', 'Returns the created resource'],
        ['Update a customer', 'PATCH /customers/{id}', 'Partial update; PUT for full replacement'],
        ['Delete a customer', 'DELETE /customers/{id}', 'Consider soft-deletion for important data'],
        ['List a customer’s orders', 'GET /customers/{id}/orders', 'Nested resources show relationships'],
      ],
    ),
    ul(
      'Use plural nouns consistently (`/orders`, not a mix of `/order` and `/orders`).',
      'Use lowercase and hyphens or consistent casing, and avoid exposing internal details.',
      'Avoid deep nesting beyond two levels; use query parameters or links instead.',
      'For actions that do not fit CRUD, such as “refund” or “send reminder”, use a clear sub-resource or action endpoint and document it.',
    ),

    h2('Use HTTP properly'),
    p(
      'HTTP already has well-understood conventions; using them correctly makes your API easier for developers and tools to work with.',
    ),
    checklist(
      'HTTP essentials',
      [
        'GET reads data and is safe: it never changes state',
        'POST creates resources or triggers actions',
        'PUT replaces and PATCH partially updates a resource',
        'DELETE removes a resource',
        'Return accurate status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests, 500 Server Error',
        'Make safe and idempotent operations genuinely safe and idempotent',
        'Use JSON consistently, with predictable field names and formats such as ISO 8601 dates',
      ],
    ),
    callout(
      'tip',
      'Idempotency prevents double charges',
      'Network failures cause retries. For operations like creating a payment or order, support an idempotency key so repeating the same request does not create a duplicate.',
    ),

    h2('Errors that help'),
    p(
      'When something goes wrong, a clear error saves hours. Return a consistent structure, with a machine-readable code, a human-readable message, and, for validation errors, which fields failed and why. Never leak stack traces, internal paths or database details; log those server-side and return a reference ID the client can quote to support.',
    ),
    compare(
      'Error responses',
      {
        title: 'Helpful',
        points: [
          'Correct status code and consistent JSON structure',
          'Error code, message and field-level details',
          'Request or trace ID for support',
          'No sensitive internals exposed',
        ],
      },
      {
        title: 'Unhelpful',
        tone: 'bad',
        points: [
          '“200 OK” with an error in the body',
          'Generic “Something went wrong”',
          'Stack traces or database messages',
          'Different formats per endpoint',
        ],
      },
    ),

    h2('Pagination, filtering and sorting'),
    p(
      'Never return unlimited lists. Large responses are slow, costly and can overwhelm clients. Provide pagination, with either page-based or cursor-based approaches. Cursor-based pagination is more reliable for fast-changing data and large sets. Add filtering and sorting through query parameters, such as `/orders?status=paid&sort=-created_at`, and document the supported options. Include metadata such as the total count (when feasible), next-page links and the page size limit.',
    ),

    h2('Versioning and change management'),
    p(
      'Once clients depend on your API, you cannot change it freely. Plan for evolution.',
    ),
    ul(
      '**Version explicitly:** include a version in the URL (`/v1/…`) or a header, and keep old versions running for a published period.',
      '**Prefer additive changes:** adding optional fields or new endpoints does not break clients; removing or renaming does.',
      '**Deprecate gracefully:** announce changes early, provide migration guides and use deprecation headers and logs to see who still uses old versions.',
      '**Never silently change behaviour,** such as the meaning or format of an existing field.',
      '**Be careful with enums and defaults,** because clients may depend on them.',
    ),

    h2('Authentication and authorisation'),
    p(
      'Security must be designed in, as stressed in our [mobile app security checklist](/blog/mobile-app-security-checklist). Distinguish two questions: **who are you** (authentication) and **what are you allowed to do** (authorisation).',
    ),
    checklist(
      'Security checklist for APIs',
      [
        'Require HTTPS for all traffic',
        'Use a standard authentication approach such as OAuth 2.0 or OpenID Connect rather than inventing your own',
        'Use short-lived access tokens and secure refresh handling',
        'Check authorisation on every request, for each resource: users must only access their own data',
        'Validate and sanitise all input on the server; never trust the client',
        'Limit returned fields to what the client needs, to avoid exposing sensitive data',
        'Apply rate limiting and monitoring to detect and stop abuse',
        'Keep secrets out of URLs and logs',
        'Separate admin and internal endpoints and protect them more strictly',
      ],
    ),
    p(
      'The most common serious flaw is broken object-level authorisation: a user changes an ID in a request and sees another customer’s data. Test for it explicitly.',
    ),

    h2('Rate limiting and reliability'),
    ul(
      'Apply rate limits per client or key, and return clear 429 responses with retry information.',
      'Set sensible timeouts and handle slow or failing dependencies gracefully.',
      'Design for retries with idempotency and avoid long-running synchronous requests; use asynchronous jobs with status endpoints where needed.',
      'Provide webhooks for event notification instead of forcing clients to poll constantly; see [REST vs. GraphQL vs. webhooks](/blog/rest-vs-graphql-vs-webhooks).',
      'Monitor latency, error rates and usage, and alert on anomalies.',
    ),

    h2('Documentation and developer experience'),
    p(
      'An undocumented API is half an API. Provide reference documentation generated from a specification such as OpenAPI, plus guides with real examples: authentication, common workflows, error handling and code samples. Offer a sandbox or test environment with sample data, a changelog and a clear way to contact support. Developer experience determines adoption: internal teams and partners integrate faster, and with fewer mistakes, when the API is consistent and well explained.',
    ),
    steps(
      'A design process that works',
      [
        { title: 'Identify use cases', text: 'List the tasks consumers need to perform.' },
        { title: 'Model resources', text: 'Define the nouns, relationships and operations.' },
        { title: 'Write the specification first', text: 'Draft an OpenAPI description and review it with consumers.' },
        { title: 'Mock and test', text: 'Let client developers try the design before building.' },
        { title: 'Implement and secure', text: 'Build with validation, authorisation and logging.' },
        { title: 'Document and publish', text: 'Release with docs, examples and a versioning policy.' },
      ],
    ),

    h2('Common mistakes'),
    ul(
      '**Designing around the database** instead of consumer tasks.',
      '**Inconsistent naming, formats and errors** across endpoints.',
      '**Breaking changes without versioning.**',
      '**Returning too much data,** exposing sensitive fields or slowing clients.',
      '**Skipping authorisation checks** for object-level access.',
      '**No rate limiting or monitoring.**',
      '**Poor documentation,** forcing developers to guess.',
    ),
    p(
      'APIs also underpin SaaS products; our [guide to building a SaaS product](/blog/how-to-build-a-saas-product) explains how they fit into a platform strategy.',
    ),
    h2('A short example of good design'),
    p(
      'Consider an invoicing product. A good API would expose invoices as a resource at a stable path, accept new invoices with a POST that returns the created invoice and a link to it, let clients list invoices with filters for status and date range and cursor-based pagination, and allow a PATCH to update fields while rejecting changes to a paid invoice with a clear 409 error and message. Authentication would use short-lived tokens tied to a user or integration, every request would check that the invoice belongs to that customer, and rate limits would protect the service. Creating a payment would accept an idempotency key so a retried request never charges twice. Documentation would show these flows with examples in several languages, and a changelog would announce additions. None of this is exotic; it is simply discipline applied consistently.',
    ),
    callout(
      'tip',
      'Review the API like a consumer',
      'Before release, ask someone who did not build it to complete three real tasks using only the documentation. Every place they get stuck is a design or documentation flaw worth fixing while changes are still cheap.',
    ),
    cta(
      'Need an API that is secure, consistent and built to last? We design and build APIs and integrations for web and mobile apps, partners and internal systems.',
      '/contact',
      'Design your API',
    ),
  ],
  faqs: [
    {
      question: 'What makes a good REST API?',
      answer:
        'Consistent resource-based URLs, correct use of HTTP methods and status codes, clear error responses, pagination and filtering, strong authentication and authorisation, versioning, rate limiting and good documentation.',
    },
    {
      question: 'How should I version my API?',
      answer:
        'Include a version in the URL or a header, prefer backward-compatible additive changes, announce deprecations early and keep old versions running for a published period so clients can migrate.',
    },
    {
      question: 'How do I secure an API?',
      answer:
        'Use HTTPS, standard authentication such as OAuth 2.0, check authorisation for every request and object, validate input, limit returned data, apply rate limiting and monitor for abuse.',
    },
    {
      question: 'Should I use REST or GraphQL?',
      answer:
        'REST is simple, widely supported and fits many business apps; GraphQL helps when clients need flexible queries across related data. Choose based on client needs and team experience.',
    },
    {
      question: 'What is idempotency in an API?',
      answer:
        'An idempotent operation produces the same result when repeated. It matters for retries: using idempotency keys prevents duplicates, such as charging a customer twice.',
    },
  ],
}
