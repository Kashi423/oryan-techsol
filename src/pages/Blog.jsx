import { FlaskConical } from 'lucide-react'
import PlaceholderPage from '@/components/layout/PlaceholderPage'

export default function Blog() {
  return (
    <PlaceholderPage
      icon={FlaskConical}
      eyebrow="Blog"
      title="Nothing published here yet."
      notice="We haven't published any articles yet — real posts will replace this page once they exist. In the meantime, get in touch if you have a question we haven't written about."
    />
  )
}
