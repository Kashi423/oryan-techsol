// Small helpers shared by the blog pages and the prerender script (so keep this file free of
// React/JSX and of path aliases — it is imported directly by Node).

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Strip the tiny inline markup ([text](url) and **bold**) down to plain text.
export const plainText = (text) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')

// Every h2 becomes an entry in the article's table of contents.
export const tocFromBlocks = (blocks) =>
  blocks.filter((block) => block.type === 'h2').map((block) => ({ id: slugify(block.text), text: block.text }))

const collectStrings = (block) => {
  switch (block.type) {
    case 'p':
    case 'h2':
    case 'h3':
      return [block.text]
    case 'ul':
    case 'ol':
    case 'checklist':
      return [block.title ?? '', ...block.items]
    case 'callout':
      return [block.title ?? '', block.text]
    case 'stats':
      return [block.title ?? '', ...block.items.flatMap((i) => [i.value, i.label, i.note ?? ''])]
    case 'steps':
    case 'timeline':
      return [block.title ?? '', ...block.items.flatMap((i) => [i.label ?? '', i.title ?? '', i.text ?? ''])]
    case 'bars':
      return [block.title ?? '', block.caption ?? '', ...block.items.flatMap((i) => [i.label, i.display ?? '', i.note ?? ''])]
    case 'compare':
      return [block.title ?? '', block.left.title, ...block.left.points, block.right.title, ...block.right.points]
    case 'table':
      return [block.title ?? '', ...block.columns, ...block.rows.flat()]
    default:
      return []
  }
}

export const countWords = (post) => {
  const text = [post.intro, ...(post.takeaways ?? []), ...post.blocks.flatMap(collectStrings), ...(post.faqs ?? []).flatMap((f) => [f.question, f.answer])]
    .map((s) => plainText(String(s ?? '')))
    .join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

export const readMinutes = (post) => Math.max(1, Math.round(countWords(post) / 215))
