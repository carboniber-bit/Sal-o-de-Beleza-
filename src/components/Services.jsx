import { useRef, useState } from 'react'
import { CATEGORIES, fmtPrice } from '../data.js'
import { useReveal } from '../hooks.js'
import { Icon } from './Icons.jsx'

export default function Services({ onBook }) {
  const ref = useReveal()
  const [activeId, setActiveId] = useState(CATEGORIES[0].id)
  const tabsRef = useRef(null)
  const active = CATEGORIES.find((c) => c.id === activeId)

  const onTabKey = (e, idx) => {
    let next = null
    if (e.key === 'ArrowRight') next = (idx + 1) % CATEGORIES.length
    if (e.key === 'ArrowLeft') next = (idx - 1 + CATEGORIES.length) % CATEGORIES.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = CATEGORIES.length - 1
    if (next !== null) {
      e.preventDefault()
      setActiveId(CATEGORIES[next].id)
      tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus()
    }
  }

  return (
    <section id="servicos" ref={ref} className="relative overflow-x-clip py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blush-50 via-white to-blush-100" />
        <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-petal-300/20 blur-3xl animate-drift" />
        <div className="absolute bottom-20 -right-32 h-96 w-96 rounded-full bg-gold-300/25 blur-3xl animate-drift-late" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-condensed font-semibold uppercase tracking-[0.28em] text-gold-600">Nossos serviços</p>
          <h2 className="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">
            Tudo o que você ama, <em className="italic text-petal-600">em um só lugar</em>
          </h2>
          <p className="mt-4 text-ink-500">
            Escolha uma especialidade para ver os serviços e valores. Valores “a partir de”: o orçamento final é
            confirmado com você antes de começar, sem surpresas.
          </p>
        </div>

        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Especialidades do salão"
          className="reveal mt-10 flex flex-wrap justify-center gap-2"
          style={{ '--reveal-delay': '120ms' }}
        >
          {CATEGORIES.map((c, idx) => (
            <button
              key={c.id}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={activeId === c.id}
              aria-controls={`panel-${c.id}`}
              tabIndex={activeId === c.id ? 0 : -1}
              onClick={() => setActiveId(c.id)}
              onKeyDown={(e) => onTabKey(e, idx)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeId === c.id
                  ? 'bg-gradient-to-r from-petal-500 to-petal-600 text-white shadow-lg shadow-petal-500/35 scale-[1.03]'
                  : 'border border-blush-300 bg-white/80 text-ink-700 hover:border-petal-400 hover:text-petal-600'
              }`}
            >
              <Icon name={c.icon} className="w-4.5 h-4.5" />
              {c.label}
            </button>
          ))}
        </div>

        <div
          key={active.id}
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] animate-pop"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-blush-200 bg-blush-50 shadow-xl shadow-petal-600/10 lg:sticky lg:top-24">
            <img
              src={active.image}
              alt={`Serviços de ${active.label} no Studio E`}
              className="block h-auto w-full max-h-[calc(100vh-7rem)] object-contain"
              loading="lazy"
            />
            <div className="border-t border-blush-200 bg-gradient-to-br from-white to-blush-100 p-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold-500/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-ink-900">
                <Icon name={active.icon} className="w-4 h-4" />
                {active.label}
              </span>
              <p className="mt-3 font-display text-lg italic leading-snug text-ink-700">{active.blurb}</p>
            </div>
          </div>

          <ul className="divide-y divide-blush-200 rounded-[2rem] border border-blush-200 bg-white/85 px-6 shadow-xl shadow-petal-600/10 backdrop-blur">
            {active.services.map((s) => (
              <li key={s.name} className="group flex flex-wrap items-center gap-x-4 gap-y-2 py-4.5 first:pt-6 last:pb-6">
                <div className="min-w-0 flex-1 basis-52">
                  <p className="font-semibold text-ink-900">{s.name}</p>
                  <p className="mt-0.5 text-sm text-ink-500">{s.desc}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-ink-400">
                    <Icon name="clock" className="w-3.5 h-3.5" />
                    {s.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-ink-400">{s.price != null ? 'a partir de' : 'valores'}</p>
                  <p className={`font-display font-semibold text-petal-600 ${s.price != null ? 'text-2xl' : 'text-base'}`}>
                    {s.price != null ? fmtPrice(s.price) : 'Sob consulta'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onBook(active.id, s.name)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-petal-500/40 px-4 py-2 text-sm font-semibold text-petal-600 transition-all hover:bg-petal-500 hover:text-white hover:shadow-lg hover:shadow-petal-500/30"
                  aria-label={`Agendar ${s.name}`}
                >
                  Agendar
                  <Icon name="arrowRight" className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="reveal mt-8 flex items-center justify-center gap-2 text-center text-sm text-ink-400" style={{ '--reveal-delay': '150ms' }}>
          <Icon name="info" className="w-4 h-4 shrink-0 text-info" />
          Não encontrou o que procura? Fale com a gente pelo WhatsApp: montamos um pacote especial para você.
        </p>
      </div>
    </section>
  )
}