import { useMemo, useState } from 'react'
import { FAQS, waLink } from '../data.js'
import { useReveal } from '../hooks.js'
import { Icon } from './Icons.jsx'

export default function Faq() {
  const ref = useReveal()
  const [open, setOpen] = useState(0)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return FAQS.map((f, i) => ({ ...f, i }))
    return FAQS.map((f, i) => ({ ...f, i })).filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <section id="faq" ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blush-50 to-blush-100" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="reveal text-[11px] font-condensed font-semibold uppercase tracking-[0.28em] text-gold-600">Dúvidas frequentes</p>
          <h2 className="reveal mt-3 font-display text-4xl leading-tight text-ink-900 sm:text-5xl" style={{ '--reveal-delay': '80ms' }}>
            Perguntou, <em className="italic text-petal-600">respondemos</em>
          </h2>
          <p className="reveal mt-5 leading-relaxed text-ink-500" style={{ '--reveal-delay': '140ms' }}>
            Reunimos aqui as perguntas que mais recebemos. Busque por uma palavra (ex.: “pagamento”, “cílios”) ou
            toque na pergunta para ver a resposta.
          </p>
          <label className="reveal mt-6 block" style={{ '--reveal-delay': '200ms' }}>
            <span className="sr-only">Buscar nas dúvidas frequentes</span>
            <span className="relative block">
              <Icon name="zoom" className="pointer-events-none absolute left-4 top-1/2 w-4.5 h-4.5 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar dúvida…"
                className="w-full rounded-full border border-blush-300 bg-white/85 py-3 pl-11 pr-4 text-ink-800 placeholder:text-ink-400 outline-none transition-all focus:border-petal-400 focus:ring-4 focus:ring-petal-400/15"
              />
            </span>
          </label>
          <div className="reveal mt-8 rounded-3xl border border-blush-200 bg-white/80 p-6" style={{ '--reveal-delay': '260ms' }}>
            <p className="font-semibold text-ink-900">Não encontrou sua resposta?</p>
            <p className="mt-1 text-sm text-ink-500">A gente responde rapidinho no WhatsApp.</p>
            <a
              href={waLink('Olá! Tenho uma dúvida sobre os serviços do Studio E.')}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-success px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-success/30 transition-all hover:-translate-y-0.5 hover:shadow-success/45"
            >
              <Icon name="whatsapp" className="w-4.5 h-4.5" />
              Perguntar no WhatsApp
            </a>
          </div>
        </div>

        <div className="reveal" style={{ '--reveal-delay': '150ms' }}>
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-blush-200 bg-white/80 p-8 text-center">
              <Icon name="info" className="mx-auto w-8 h-8 text-info" />
              <p className="mt-3 font-semibold text-ink-900">Nenhuma dúvida encontrada para “{query}”.</p>
              <p className="mt-1 text-sm text-ink-500">
                Tente outra palavra, ou{' '}
                <button type="button" onClick={() => setQuery('')} className="font-semibold text-petal-600 underline underline-offset-2">
                  limpe a busca
                </button>{' '}
                para ver todas as perguntas.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {filtered.map((f) => {
                const isOpen = open === f.i
                return (
                  <li key={f.i} className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'border-petal-400/60 bg-white shadow-lg shadow-petal-500/10' : 'border-blush-200 bg-white/70 hover:border-petal-300'}`}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : f.i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${f.i}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left"
                    >
                      <span className={`font-semibold ${isOpen ? 'text-petal-600' : 'text-ink-800'}`}>{f.q}</span>
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'rotate-180 bg-petal-500 text-white' : 'bg-blush-200 text-ink-500'}`}>
                        <Icon name="chevron" className="w-4 h-4" />
                      </span>
                    </button>
                    <div
                      id={`faq-panel-${f.i}`}
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 leading-relaxed text-ink-500">{f.a}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}