import { callout, checklist, cta, h2, h3, p, table, ul } from './helpers.js'

export default {
  slug: 'website-accessibility-basics',
  title: 'Website Accessibility Basics: A Practical WCAG Checklist for Business Sites',
  shortTitle: 'Website accessibility basics',
  description:
    'Website accessibility basics for business owners: why it matters, the WCAG principles, and a practical checklist for contrast, keyboards, alt text and forms.',
  date: '2026-11-06',
  updated: '2026-11-06',
  category: 'Web Development',
  keywords:
    'website accessibility, WCAG checklist, web accessibility basics, ADA website compliance, alt text best practices, accessible forms, keyboard navigation, colour contrast',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['technical-seo-checklist-for-business-websites', 'core-web-vitals-explained', 'website-redesign-seo-checklist'],
  intro:
    'Roughly one in six people lives with some form of disability, and many more face temporary or situational limits: a broken arm, bright sunlight on a phone, a noisy room, slow ageing eyes. A website that cannot be used with a keyboard, read by a screen reader or understood at a glance excludes real customers — and increasingly exposes businesses to legal risk. Accessibility is also good for everyone and aligns closely with good SEO and usability. This guide explains the principles and gives a practical checklist you can apply to your site.',
  takeaways: [
    'Accessibility means people with different abilities can perceive, operate and understand your site.',
    'WCAG, built on four principles (POUR), is the widely used standard; many businesses aim for level AA.',
    'Most issues come from a handful of basics: contrast, alt text, keyboard access, form labels and clear structure.',
    'Accessible sites tend to rank better and convert better because they are clearer and faster to use.',
    'Test with automated tools and by hand — automation catches only part of the problems.',
  ],
  blocks: [
    h2('Why accessibility matters for a business'),
    ul(
      '**Reach:** more customers can use your site, including older people and those using assistive technology.',
      '**Legal and contractual risk:** accessibility laws and procurement requirements exist in many regions; claims over inaccessible websites are common.',
      '**Better usability for everyone:** clear text, good contrast and simple navigation help all visitors.',
      '**SEO alignment:** semantic headings, descriptive links and image text help search engines too — see our [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites).',
      '**Brand:** inclusion is part of a trustworthy, professional image.',
    ),

    h2('The four WCAG principles (POUR)'),
    table(
      'What WCAG asks of your site',
      ['Principle', 'Meaning', 'Example'],
      [
        ['Perceivable', 'Information can be perceived through at least one sense', 'Text alternatives for images; captions for video; enough contrast'],
        ['Operable', 'Everything can be used without a mouse and without time traps', 'Keyboard access; visible focus; no flashing content'],
        ['Understandable', 'Content and interface are clear and predictable', 'Plain language; helpful error messages; consistent navigation'],
        ['Robust', 'Works with browsers and assistive technologies', 'Valid, semantic HTML; correct labels and roles'],
      ],
      'The Web Content Accessibility Guidelines (WCAG) are published by the W3C. Level AA is a common target.',
    ),

    h2('The practical checklist'),
    h3('Content and structure'),
    checklist(
      'Structure',
      [
        'One H1 per page and a logical heading order (H2, H3) — not chosen for size',
        'Use real lists, tables with headers and landmarks (header, nav, main, footer)',
        'Descriptive link text; avoid “click here” and “read more” on their own',
        'Page language set, and a descriptive page title on every page',
        'Plain, concise language and short paragraphs',
      ],
    ),
    h3('Images, colour and media'),
    checklist(
      'Visual content',
      [
        'Meaningful images have concise alt text; decorative images have empty alt text',
        'Text has enough contrast against its background (at least 4.5:1 for normal text at level AA)',
        'Information is never conveyed by colour alone',
        'Videos have captions; audio has transcripts',
        'Text can be resized up to 200% without losing content',
        'No auto-playing audio, and no content flashing more than three times per second',
      ],
    ),
    callout(
      'tip',
      'Alt text in one sentence',
      'Describe the purpose of the image in context, not just what it looks like. For a chart, state the key takeaway; for a logo that links home, say where it goes.',
    ),
    h3('Keyboard and interaction'),
    checklist(
      'Operating the site',
      [
        'Every interactive element reachable and usable with the Tab, Enter, Space and arrow keys',
        'A clearly visible focus indicator',
        'A “skip to content” link for keyboard users',
        'Menus, modals and carousels that trap or hide focus incorrectly are fixed',
        'Touch targets large enough and spaced out on mobile',
        'Timeouts that give users warning and a way to extend',
      ],
    ),
    h3('Forms'),
    checklist(
      'Accessible forms',
      [
        'Every field has a visible, associated label',
        'Required fields and formats are stated in text, not only by colour',
        'Error messages say what went wrong and how to fix it, and are announced to assistive tools',
        'Autocomplete attributes set for common personal details',
        'Instructions appear before the field, not only as placeholder text',
      ],
    ),

    h2('How to test'),
    ul(
      '**Automated checks:** tools such as Lighthouse, axe or WAVE catch many technical issues, but typically not all.',
      '**Keyboard-only run-through:** put the mouse away and complete your key journeys.',
      '**Screen reader spot checks:** try your main pages with a screen reader such as NVDA or VoiceOver.',
      '**Zoom and contrast checks:** test at 200% zoom and with a contrast tool.',
      '**Real users:** feedback from people with disabilities is the most valuable test of all.',
    ),
    p(
      'Build testing into every release rather than treating accessibility as a one-off audit. If you are planning a relaunch, include it from the start — it is far cheaper than retrofitting, and part of the process in our [website redesign SEO checklist](/blog/website-redesign-seo-checklist). Accessible markup also contributes to the page experience that [Core Web Vitals](/blog/core-web-vitals-explained) measure.',
    ),
    h2('Publish an accessibility statement'),
    p(
      'A short statement describing your commitment, the standard you aim for, known limitations and a contact route for feedback builds trust and gives people a way to ask for help. It is not a substitute for fixing problems, but it shows good faith.',
    ),
    p(
      'This article is general guidance and not legal advice; requirements vary by country and sector.',
    ),
    cta(
      'Want an accessible website that is also fast and search-friendly? We build accessibility into design and development from day one.',
      '/contact',
      'Request an accessibility review',
    ),
  ],
  faqs: [
    {
      question: 'What is web accessibility?',
      answer:
        'Designing and building websites so people with disabilities and different needs can perceive, understand, navigate and interact with them, including via assistive technology.',
    },
    {
      question: 'What is WCAG?',
      answer:
        'The Web Content Accessibility Guidelines, published by the W3C, are the widely used standard for web accessibility. They are organised around four principles: perceivable, operable, understandable and robust.',
    },
    {
      question: 'Is website accessibility a legal requirement?',
      answer:
        'In many regions and sectors, yes or effectively so, through disability and consumer laws or procurement rules. Requirements vary, so seek professional advice for your situation.',
    },
    {
      question: 'Does accessibility help SEO?',
      answer:
        'Indirectly and often directly: semantic structure, descriptive links, alt text and clear content help both users and search engines understand pages.',
    },
    {
      question: 'Can an automated tool make my site fully accessible?',
      answer:
        'No. Automated tools find only a portion of issues. Combine them with keyboard testing, screen reader checks and, ideally, feedback from real users.',
    },
  ],
}
