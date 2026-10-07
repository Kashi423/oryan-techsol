import { hasOverrides, isEditing, translate } from './translate'

// Tags whose text must stay a plain string (never wrapped in an editing <span>).
const PLAIN_PARENTS = new Set(['title', 'option', 'textarea', 'script', 'style', 'text', 'tspan', 'textPath', 'code', 'pre'])
// DOM attributes that carry visible text.
const TEXT_ATTRS = ['aria-label', 'alt', 'placeholder', 'title']

function mapText(text, type, makeElement, index) {
  if (text.trim() === '') return text
  const translated = translate(text)
  if (!isEditing() || (typeof type === 'string' && PLAIN_PARENTS.has(type))) return translated
  // Edit mode: wrap each text piece so the on-site editor can find and change it.
  return makeElement('span', { 'data-cms-orig': text, className: 'cms-editable', children: translated }, `cms-${index}`)
}

// Called for every JSX element the app creates. Returns the same props object when nothing
// needs to change (the common case), so normal rendering stays cheap.
export function patchProps(type, props, makeElement) {
  if (props == null) return props
  const active = hasOverrides() || isEditing()
  if (!active) return props

  let next = props
  const children = props.children
  if (typeof children === 'string') {
    const mapped = mapText(children, type, makeElement, 0)
    if (mapped !== children) next = { ...next, children: mapped }
  } else if (Array.isArray(children)) {
    let changed = false
    const out = children.map((child, index) => {
      if (typeof child !== 'string') return child
      const mapped = mapText(child, type, makeElement, index)
      if (mapped !== child) changed = true
      return mapped
    })
    if (changed) next = { ...next, children: out }
  }

  if (typeof type === 'string' && hasOverrides()) {
    for (const attr of TEXT_ATTRS) {
      const value = props[attr]
      if (typeof value === 'string') {
        const mapped = translate(value)
        if (mapped !== value) next = next === props ? { ...props, [attr]: mapped } : { ...next, [attr]: mapped }
      }
    }
    if (type === 'meta' && typeof props.content === 'string') {
      const mapped = translate(props.content)
      if (mapped !== props.content) next = { ...next, content: mapped }
    }
  }
  return next
}
