import JsonLd from './JsonLd'

// FAQPage structured data. `faqs` must be the exact { question, answer } list already
// rendered visibly on the page (e.g. the array passed to <Accordion>) — never a separate
// or expanded list, so the schema can't drift from what a visitor actually sees.
export default function FaqSchema({ faqs }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  )
}
