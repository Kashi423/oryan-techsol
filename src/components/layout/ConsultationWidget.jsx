import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

// Site-wide floating AI consultation chat — mounted once in Layout so it's reachable from
// every page. Real AI replies (not scripted): each message is sent to CHAT_ENDPOINT, a
// Cloudflare Worker (see worker/src/index.js) that holds the Groq API key server-side and
// proxies the request — the key can never live in this frontend bundle, since anyone could
// read it from the page source and run up charges on the account it belongs to.
//
// The model's behavior (what it knows, what it must never claim — no invented pricing,
// timelines, or client results) is entirely defined by the system prompt in that Worker, not
// here. This widget only renders the conversation and forwards messages.
const CHAT_ENDPOINT = 'https://oryan-techsol-chat.oryan-techsol-chat-worker.workers.dev'

const greeting = {
  role: 'assistant',
  content: "Hi! I'm here to help you figure out what you need — an app, custom software, a website, an AI bot, whatever it is. What are you trying to build or fix?",
}

function BotBubble({ children }) {
  return (
    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-overlay px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line text-fg">
      {children}
    </div>
  )
}

function UserBubble({ children }) {
  return (
    <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-fg">
      {children}
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-surface-overlay px-4 py-3" aria-label="Assistant is typing">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="motion-safe:animate-pulse size-1.5 rounded-full bg-fg-subtle"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}

export default function ConsultationWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([greeting])
  const [inputValue, setInputValue] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, pending])

  async function sendMessage(event) {
    event.preventDefault()
    const text = inputValue.trim()
    if (!text || pending) return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInputValue('')
    setError(false)
    setPending(true)

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.map(({ role, content }) => ({ role, content })) }),
      })
      if (!response.ok) throw new Error('Request failed')
      const data = await response.json()
      setMessages((current) => [...current, { role: 'assistant', content: data.reply }])
    } catch {
      setError(true)
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble replying right now. You can reach us directly instead.",
        },
      ])
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <m.section
            aria-label="AI consultation chat"
            data-tone="default"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 bottom-[calc(100%+1rem)] flex h-[32rem] max-h-[75vh] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-card"
          >
            <div className="flex shrink-0 items-center gap-3 border-b border-line bg-surface-overlay px-4 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-highlight/10 text-highlight">
                <Sparkles className="size-4" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-bold text-fg">Ask Oryan AI</p>
                <p className="text-xs text-fg-subtle">Real AI — a person reviews every conversation</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div ref={scrollRef} aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              {messages.map((message, index) =>
                message.role === 'assistant' ? (
                  <BotBubble key={index}>{message.content}</BotBubble>
                ) : (
                  <UserBubble key={index}>{message.content}</UserBubble>
                ),
              )}
              {pending && <TypingIndicator />}
            </div>

            <div className="shrink-0 border-t border-line p-3">
              <form onSubmit={sendMessage} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Ask about your project…"
                  aria-label="Message"
                  disabled={pending}
                  className="w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-base text-fg placeholder:text-fg-subtle focus-visible:border-highlight disabled:opacity-60 sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={pending || !inputValue.trim()}
                  aria-label="Send"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-fg transition-colors hover:bg-primary-hover disabled:opacity-50"
                >
                  <Send className="size-4" aria-hidden="true" />
                </button>
              </form>
              <p className="mt-2 text-center text-xs text-fg-subtle">
                {error ? (
                  <Link to="/contact" onClick={() => setOpen(false)} className="font-semibold text-highlight hover:underline">
                    Or use the full contact form
                  </Link>
                ) : (
                  <>
                    Ready to talk?{' '}
                    <Link to="/contact" onClick={() => setOpen(false)} className="font-semibold text-highlight hover:underline">
                      Book a free consultation
                    </Link>
                  </>
                )}
              </p>
            </div>
          </m.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? 'Close AI consultation chat' : 'Open AI consultation chat'}
        className={cn(
          'group relative flex h-14 items-center gap-2.5 rounded-full bg-primary pr-5 pl-4 text-primary-fg shadow-button transition-[background-color,transform] duration-200 hover:bg-primary-hover',
          !open && 'hover:-translate-y-0.5',
        )}
      >
        {!open && (
          <span className="motion-safe:absolute motion-safe:-top-1 motion-safe:-right-1 motion-safe:z-10 flex size-3.5">
            <span className="motion-safe:absolute motion-safe:inline-flex motion-safe:size-full motion-safe:animate-ping motion-safe:rounded-full motion-safe:bg-highlight/70" />
            <span className="relative inline-flex size-3.5 rounded-full bg-highlight" />
          </span>
        )}
        {open ? <X className="size-5 shrink-0" aria-hidden="true" /> : <MessageCircle className="size-5 shrink-0" aria-hidden="true" />}
        <span className="hidden font-display text-sm font-bold whitespace-nowrap sm:inline">{open ? 'Close' : 'Ask Oryan AI'}</span>
      </button>
    </div>
  )
}
