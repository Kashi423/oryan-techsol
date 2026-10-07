import { useRef, useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { api } from '@/lib/cms/api'
import { btn, inputClass, Labeled, useToast } from './ui'

// A URL field with an upload button. Uploads go to /api/admin/uploads (checked and resized by
// the server) and the returned /uploads/... path is stored as the value.
export default function ImageField({ label, value, onChange, hint, shape = 'square' }) {
  const input = useRef(null)
  const toast = useToast()
  const [busy, setBusy] = useState(false)

  async function upload(file) {
    if (!file) return
    setBusy(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const saved = await api('/admin/uploads', { method: 'POST', form })
      onChange(saved.url)
      toast('Image uploaded.')
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <Labeled label={label} hint={hint ?? 'JPG, PNG or WebP, up to 5 MB.'}>
      <div className="flex items-start gap-3">
        {value ? (
          <img
            src={value}
            alt=""
            className={shape === 'wide' ? 'h-16 w-28 rounded-lg border border-line object-cover' : 'size-16 rounded-lg border border-line object-cover'}
          />
        ) : (
          <span className={shape === 'wide' ? 'flex h-16 w-28 items-center justify-center rounded-lg border border-dashed border-line-strong text-fg-subtle' : 'flex size-16 items-center justify-center rounded-lg border border-dashed border-line-strong text-fg-subtle'}>
            <ImagePlus className="size-5" aria-hidden="true" />
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="/uploads/… or https://…" className={inputClass} />
          <div className="flex gap-2">
            <button type="button" className={btn.small} disabled={busy} onClick={() => input.current?.click()}>
              {busy ? 'Uploading…' : 'Upload image'}
            </button>
            {value && (
              <button type="button" className={btn.small} onClick={() => onChange('')}>
                <X className="size-3.5" aria-hidden="true" />
                Remove
              </button>
            )}
          </div>
          <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
        </div>
      </div>
    </Labeled>
  )
}
