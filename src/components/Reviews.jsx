import { REVIEWS, SALON } from '../data.js'
import { useReveal } from '../hooks.js'
import { Icon } from './Icons.jsx'

const BARS = [
  { stars: 5, pct: 100 },
  { stars: 4, pct: 0 },
  { stars: 3, pct: 0 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
]

export default function Reviews() {
  const ref = useReveal()
  return (
    <section id="avaliacoes" ref={ref} className="relative overflow-hidden bg-ink-900 py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-petal-600/20 blur-3xl animate-drift" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl animate-drift-late" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="reveal text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-400">Avaliações</p>
            <h2 className="reveal mt-3 font-display text-4xl leading-tight text-blush-100 sm:text-5xl" style={{ '--reveal-delay': '80ms' }}>
              Quem vem, <em className="italic text-petal-300">volta</em> — e recomenda
            </h2>
            <div className="reveal mt-8 flex items-end gap-5" style={{ '--reveal-delay': '160ms' }}>
              <p className="font-display text-7xl font-semibold text-gold-400">5.0</p>
              <div className="pb-2">
                <div className="flex gap-1 text-gold-400" aria-label="5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className="w-5 h-5" />
                  ))}
                </div>
                <p className="mt-1 text-sm text-blush-300">{SALON.reviewCount} avaliações no Google</p>
              </div>
            </div>
            <ul className="reveal mt-6 space-y-2" style={{ '--reveal-delay': '220ms' }}>
              {BARS.map((b) => (
                <li key={b.stars} className="flex items-center gap-3 text-sm text-blush-300">
                  <span className="w-3 text-right">{b.stars}</span>
                  <Icon name="star" className="w-3.5 h-3.5 text-gold-400" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold-400 to-petal-400 transition-all duration-1000"
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <a
              href={SALON.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="reveal group mt-8 inline-flex items-center gap-2 rounded-full border border-gold-400/50 px-6 py-3 font-semibold text-gold-300 transition-all hover:bg-gold-500 hover:text-ink-900"
              style={{ '--reveal-delay': '280ms' }}
            >
              Ver no Google
              <Icon name="arrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <article
                key={r.name}
                className={`reveal relative rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition-all duration-300 hover:border-gold-400/40 hover:bg-white/[0.09] ${
                  i === 2 ? 'sm:col-span-2' : ''
                }`}
                style={{ '--reveal-delay': `${i * 110}ms` }}
              >
                <Icon name="quote" className="w-8 h-8 text-petal-400/70" />
                <p className="mt-3 leading-relaxed text-blush-200">“{r.text}”</p>
                <footer className="mt-5 flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-ink-900 ${i % 2 ? 'bg-gold-400' : 'bg-petal-300'}`}>
                    {r.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                  </span>
                  <div>
                    <p className="font-semibold text-blush-100">{r.name}</p>
                    <p className="text-xs text-blush-300/70">{r.meta}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5 text-gold-400" aria-label="5 estrelas">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Icon key={j} name="star" className="w-3.5 h-3.5" />
                    ))}
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}