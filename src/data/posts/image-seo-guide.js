import { callout, checklist, compare, cta, h2, p, steps, table, ul } from './helpers.js'

export default {
  slug: 'image-seo-guide',
  title: 'Image SEO: How to Get Your Photos Ranking in Google Images',
  shortTitle: 'Image SEO guide',
  description:
    'Image SEO guide: file names, alt text, formats, compression, responsive images, image sitemaps and structured data to rank in Google Images and speed up pages.',
  date: '2026-11-26',
  updated: '2026-11-26',
  category: 'Web Development',
  keywords:
    'image seo, how to optimize images for seo, alt text best practices, best image format for websites, webp vs jpeg, google images ranking, image sitemap, compress images for web',
  service: { label: 'Custom web development', to: '/web-development' },
  related: ['core-web-vitals-explained', 'technical-seo-checklist-for-business-websites', 'website-accessibility-basics', 'schema-markup-guide-for-small-business'],
  intro:
    'Images do two jobs for your website at once. They make pages more engaging and persuasive, and, if handled well, they bring in visitors directly from Google Images and image-rich results. They can also be your biggest performance problem: oversized, unoptimised pictures are among the most common reasons pages load slowly and fail Core Web Vitals. Image SEO is the discipline of getting both sides right. This guide covers what matters: choosing and naming files, writing useful alt text, picking formats and sizes, loading images efficiently, helping search engines discover them, and the mistakes that quietly cost traffic.',
  takeaways: [
    'Good image SEO improves discoverability in Google Images, accessibility and page speed at the same time.',
    'Use descriptive file names and meaningful alt text that describes the image in context, written for people first.',
    'Serve modern formats such as WebP or AVIF at the right dimensions, compressed, and lazy-load below-the-fold images.',
    'Always set width and height to prevent layout shift, and never lazy-load your main hero image.',
    'Use real <img> elements, image sitemaps and relevant surrounding text so search engines can find and understand your images.',
  ],
  blocks: [
    h2('Why image SEO matters'),
    p(
      'Google Images and image results inside regular search drive a meaningful amount of traffic for some businesses, particularly those with visual products or services: furniture, food, travel, fashion, property, construction, design. Even for others, images appear in rich results, product listings and AI-driven summaries. Search engines cannot “see” a photograph the way you do, though they have become better at understanding images; they rely heavily on the clues you provide: file names, alt text, captions, surrounding content, structured data and the page’s overall relevance.',
    ),
    p(
      'Images are also usually the heaviest assets on a page. Optimising them improves loading speed, which supports conversion, user satisfaction and the metrics discussed in [Core Web Vitals explained](/blog/core-web-vitals-explained). So the same work pays off twice.',
    ),

    h2('Start with the right image'),
    ul(
      '**Relevance:** choose images that genuinely illustrate the content, not generic filler.',
      '**Originality:** your own photos, diagrams and screenshots stand out and cannot be found on a thousand other sites.',
      '**Quality:** sharp, well-lit and properly cropped images build trust. Blurry images signal low quality.',
      '**Licensing:** use images you own or have the right to use; stock images from licensed or free-to-use sources are fine when properly licensed.',
      '**Text in images:** avoid putting essential text only inside an image; search engines and screen readers cannot rely on it. Put it in HTML.',
    ),
    callout(
      'tip',
      'Infographics and diagrams earn links',
      'Original, useful visuals, such as process diagrams and comparison charts, are often cited and linked to. Publish them with a text explanation underneath so they work for readers, accessibility tools and search engines alike.',
    ),

    h2('File names: a small signal worth getting right'),
    p(
      'Before uploading, rename the file from something like “IMG_4021.jpg” to a short, descriptive name using lowercase words separated by hyphens, such as “kitchen-renovation-oak-cabinets.jpg”. Describe the subject accurately without stuffing keywords. File names are a lightweight signal, but they help search engines and also help you keep your media library organised.',
    ),
    table(
      'File name examples',
      ['Weak', 'Better', 'Why'],
      [
        ['IMG_4021.jpg', 'oak-kitchen-cabinets.jpg', 'Describes the subject'],
        ['photo1 final FINAL.png', 'team-meeting-london-office.png', 'No spaces or vague words'],
        ['best-cheap-kitchen-renovation-london-cheap.jpg', 'kitchen-renovation-london.jpg', 'No keyword stuffing'],
        ['banner.jpg', 'plumber-fixing-boiler.jpg', 'Specific to the image'],
      ],
    ),

    h2('Alt text that helps people and search engines'),
    p(
      'Alt text, the alt attribute on an image, is read aloud by screen readers and displayed when an image fails to load. Search engines also use it to understand the image. Write it for the person who cannot see the picture: a short, accurate description of what the image shows and why it is there. Include relevant words where natural, but never stuff keywords. We cover the accessibility side in [website accessibility basics](/blog/website-accessibility-basics).',
    ),
    compare(
      'Writing alt text',
      {
        title: 'Good alt text',
        points: [
          '“Electrician testing a consumer unit in a domestic fuse box”',
          'Describes content and context concisely',
          'Empty alt (alt="") for purely decorative images',
          'For linked images, describes the destination or action',
        ],
      },
      {
        title: 'Poor alt text',
        tone: 'bad',
        points: [
          '“image” or “photo” or the file name',
          'A string of keywords: “electrician london cheap electrician best”',
          'Missing alt on meaningful images',
          'Repeating the same alt on every image',
        ],
      },
    ),
    p(
      'For charts and infographics, state the key takeaway in the alt text or surrounding paragraph, and provide the full data in text or a table.',
    ),

    h2('Formats, sizes and compression'),
    p(
      'Choosing the right format and size can cut image weight dramatically with no visible loss. Here is a practical guide.',
    ),
    table(
      'Image formats at a glance',
      ['Format', 'Best for', 'Notes'],
      [
        ['WebP', 'Most photos and graphics', 'Widely supported; smaller than JPEG and PNG at similar quality'],
        ['AVIF', 'Photos where maximum compression matters', 'Very efficient; check tooling and fallback'],
        ['JPEG', 'Photos when compatibility is crucial', 'Good fallback; larger files'],
        ['PNG', 'Graphics needing transparency or sharp edges', 'Can be large for photos'],
        ['SVG', 'Logos, icons and simple illustrations', 'Scales perfectly; tiny files; keep them clean'],
      ],
    ),
    checklist(
      'Size and compression checklist',
      [
        'Resize images to the largest size they will actually display, not the camera original',
        'Compress with a quality setting that looks good (often 70 to 85 for photos)',
        'Serve responsive images using srcset and sizes so phones get smaller files',
        'Use WebP or AVIF with a sensible fallback',
        'Strip unnecessary metadata where privacy or size matters',
        'Use a content delivery network for faster global delivery',
        'Keep an eye on total page weight on mobile connections',
      ],
    ),

    h2('Load images efficiently without breaking layout'),
    ul(
      '**Set width and height** on every image (or use aspect-ratio) so the browser reserves space and avoids layout shift.',
      '**Lazy-load below-the-fold images** with the loading="lazy" attribute so they download only when needed.',
      '**Never lazy-load your main hero or largest above-the-fold image;** that is usually the Largest Contentful Paint element and should load as early as possible, ideally with high fetch priority.',
      '**Preload critical images** when appropriate and avoid chains of blocking requests.',
      '**Avoid CSS background images for content that matters;** use real image elements so search engines can find them.',
    ),
    p(
      'These practices are part of the wider performance work in our [technical SEO checklist](/blog/technical-seo-checklist-for-business-websites).',
    ),

    h2('Help search engines discover your images'),
    steps(
      'Make images easy to find',
      [
        { title: 'Use standard HTML', text: 'Real <img> or <picture> elements with src values crawlers can fetch.' },
        { title: 'Add context', text: 'Place images near relevant headings and text; add captions where helpful.' },
        { title: 'Allow crawling', text: 'Do not block image files or folders in robots.txt.' },
        { title: 'Submit an image sitemap', text: 'List important images, or include them within your normal XML sitemap.' },
        { title: 'Use structured data', text: 'Include image properties in Product, Article and Organization markup.' },
      ],
    ),
    p(
      'Structured data can reference your primary images for articles and products, which supports eligibility for richer results; see our [schema markup guide](/blog/schema-markup-guide-for-small-business). Make sure images use stable, permanent URLs, because changing them without redirects can lose visibility.',
    ),

    h2('Page-level factors'),
    p(
      'Google evaluates images in the context of the page. A great image on a thin or irrelevant page rarely ranks. Make sure the page has a clear topic, a descriptive title and heading, helpful text and a good user experience. Descriptive captions can help readers, and text around an image adds relevance. For product images, show multiple angles and use consistent, high-quality photography, since shoppers click on clear, attractive thumbnails.',
    ),

    h2('Common mistakes'),
    ul(
      '**Uploading full-size camera photos:** enormous files wreck speed.',
      '**Keyword-stuffed alt text:** unhelpful for users and risks being treated as spam.',
      '**Hiding images behind scripts or CSS** where crawlers may not find them.',
      '**Lazy-loading the hero image,** which delays the main content and hurts Largest Contentful Paint.',
      '**Changing image URLs without redirects,** which breaks existing image rankings.',
      '**Ignoring licensing:** unlicensed images can create legal trouble.',
    ),
    h2('A simple image workflow for every new page'),
    steps(
      'Before you hit publish',
      [
        { title: 'Choose', text: 'Select an original or properly licensed image that adds meaning.' },
        { title: 'Edit', text: 'Crop to the layout and resize to the displayed dimensions.' },
        { title: 'Compress and convert', text: 'Export to WebP or AVIF with a sensible quality level.' },
        { title: 'Name and describe', text: 'Use a clear file name and write honest alt text.' },
        { title: 'Place and test', text: 'Set width and height, decide on lazy-loading and check the result on mobile.' },
      ],
    ),
    p(
      'Make this routine part of your publishing checklist and train everyone who uploads content. A single careless upload, such as a ten-megabyte photo at the top of a landing page, can undo weeks of performance work. If you manage many images, ask your developer to automate resizing and format conversion so the right versions are generated from each upload.',
    ),
    cta(
      'Want a fast, image-optimised website that earns traffic from Google Images as well as search? We build performance and image SEO into every project.',
      '/contact',
      'Optimise your site’s images',
    ),
  ],
  faqs: [
    {
      question: 'How do I optimise images for SEO?',
      answer:
        'Use relevant, original images with descriptive file names and accurate alt text, serve compressed WebP or AVIF at the right dimensions, set width and height, lazy-load below-the-fold images, use real image elements and include images in your sitemap or structured data.',
    },
    {
      question: 'What is the best image format for websites?',
      answer:
        'WebP is a strong default for most photos and graphics, AVIF offers even better compression where supported, JPEG remains a safe fallback, PNG suits transparency, and SVG is ideal for logos and icons.',
    },
    {
      question: 'Do alt texts really matter for ranking?',
      answer:
        'Alt text helps search engines understand images and is essential for accessibility. It is not a magic ranking lever, but accurate, descriptive alt text supports image search visibility and a better user experience.',
    },
    {
      question: 'Should I lazy-load all my images?',
      answer:
        'Lazy-load images below the fold, but not your main above-the-fold image. Lazy-loading the hero can delay the Largest Contentful Paint and hurt your Core Web Vitals.',
    },
    {
      question: 'How big should website images be?',
      answer:
        'As small as possible while looking sharp at the size they display. Resize to the displayed dimensions, compress sensibly and use responsive images so mobile devices receive smaller files.',
    },
  ],
}
