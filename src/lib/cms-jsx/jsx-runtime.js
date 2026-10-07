// Custom JSX runtime (wired up in vite.config.js via jsxImportSource: 'cms-jsx'). It is React's
// own runtime plus one step: text children are passed through the admin's text overrides.
import { Fragment, jsx as reactJsx, jsxs as reactJsxs } from 'react/jsx-runtime'
import { patchProps } from '../cms/patch'

export { Fragment }

export function jsx(type, props, key) {
  return reactJsx(type, patchProps(type, props, reactJsx), key)
}

export function jsxs(type, props, key) {
  return reactJsxs(type, patchProps(type, props, reactJsx), key)
}
