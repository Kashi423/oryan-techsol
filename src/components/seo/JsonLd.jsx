// Renders a JSON-LD structured-data block. Google reads this regardless of where in the
// document it sits, so it doesn't need special <head> hoisting like <title>/<meta>/<link>.
export default function JsonLd({ data }) {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>
}
