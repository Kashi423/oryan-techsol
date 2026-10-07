// Development twin of ./jsx-runtime.js (Vite uses the dev runtime while `npm run dev` is running).
import { jsx as reactJsx } from 'react/jsx-runtime'
import { Fragment, jsxDEV as reactJsxDEV } from 'react/jsx-dev-runtime'
import { patchProps } from '../cms/patch'

export { Fragment }

export function jsxDEV(type, props, key, isStatic, source, self) {
  return reactJsxDEV(type, patchProps(type, props, reactJsx), key, isStatic, source, self)
}
