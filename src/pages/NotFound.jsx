import Seo from '@/components/seo/Seo'
import { Button, Section, SectionHeading } from '@/components/ui'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" noindex />
      <Section>
        <SectionHeading
          as="h1"
          align="center"
          eyebrow="Error 404"
          title="This page doesn't exist"
          description="The link may be broken or the page may have moved. Head back to the homepage or get in touch and we'll point you in the right direction."
        />
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/">Back to homepage</Button>
          <Button to="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Section>
    </>
  )
}
