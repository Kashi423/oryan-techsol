import { pinterestSaveHref } from './pinterest'

// Pinterest-style "Save" badge that sits on top of an image (the parent must be `relative`).
export default function PinSaveButton({ slug, title, path }) {
  return (
    <a
      href={pinterestSaveHref({ slug, title, path })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Save “${title}” to Pinterest`}
      className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#e60023] px-4 py-2 font-display text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#ad081b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
        <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.66.97-2.9 2.17-2.9 1.02 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-1 4.01-.28 1.2.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.07-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.2 0 1.03.4 2.14.89 2.74a.36.36 0 0 1 .08.34l-.33 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.43-2.89-2.43-4.65 0-3.78 2.75-7.26 7.92-7.26 4.16 0 7.4 2.96 7.4 6.93 0 4.13-2.6 7.46-6.22 7.46-1.21 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z" />
      </svg>
      Save
    </a>
  )
}
