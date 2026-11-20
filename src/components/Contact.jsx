import { HOURS, SALON, salonStatus, waLink } from '../data.js'
import { useReveal } from '../hooks.js'
import { Icon } from './Icons.jsx'

export default function Contact() {
  const ref = useReveal()
  const today = new Date().getDay()
  const status = salonStatus()

  return (
    <section id="contato" ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-blush-100 via-blush-50 to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-condensed font-semibold uppercase tracking-[0.28em] text-gold-600">Contato rápido</p>
          <h2 className="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">
            Pertinho de <em className="italic text-petal-600">você</em>, em Osasco
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="reveal relative overflow-hidden rounded-[2rem] border border-blush-200 shadow-xl shadow-petal-600/10 lg:col-span-1 min-h-72">
            <iframe
              title="Mapa: Studio E Salão de Beleza — Rua João de Deus, 397, Bela Vista, Osasco"
              src={SALON.mapsQuery}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href={SALON.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink-900/90 px-4 py-2 text-sm font-semibold text-gold-300 shadow-lg backdrop-blur transition-colors hover:bg-petal-600 hover:text-white"
            >
              <Icon name="pin" className="w-4 h-4" />
              Traçar rota
            </a>
          </div>

          <div className="reveal rounded-[2rem] border border-blush-200 bg-white/85 p-7 shadow-xl shadow-petal-600/10 backdrop-blur" style={{ '--reveal-delay': '100ms' }}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink-900">
                <Icon name="clock" className="w-5 h-5 text-petal-500" />
                Horários
              </h3>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${status.open ? 'bg-success/10 text-success' : 'bg-warn/10 text-warn'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${status.open ? 'bg-success animate-pulse' : 'bg-warn'}`} />
                {status.open ? 'Aberto' : 'Fechado'}
              </span>
            </div>
            <ul className="mt-5 space-y-1">
              {HOURS.map((h, i) => (
                <li
                  key={h.day}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                    i === today ? 'bg-blush-200 font-semibold text-petal-700' : 'text-ink-500'
                  }`}
                >
                  <span>
                    {h.day}
                    {i === today && <span className="ml-2 rounded-full bg-petal-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">hoje</span>}
                  </span>
                  <span>{h.open === null ? 'Fechado' : `${h.open}h — ${h.close}h`}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-400">{status.label}. Feriados podem alterar os horários — confirme pelo WhatsApp.</p>
          </div>

          <div className="reveal flex flex-col gap-4" style={{ '--reveal-delay': '200ms' }}>
            <div className="rounded-[2rem] border border-blush-200 bg-white/85 p-7 shadow-xl shadow-petal-600/10 backdrop-blur">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink-900">
                <Icon name="phone" className="w-5 h-5 text-petal-500" />
                Fale com a gente
              </h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a href={waLink('Olá! Vim pelo site do Studio E.')} target="_blank" rel="noreferrer" className="group flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/12 text-success"><Icon name="whatsapp" className="w-4.5 h-4.5" /></span>
                    <span>
                      <span className="block font-semibold text-ink-900 group-hover:text-success transition-colors">{SALON.phone}</span>
                      <span className="text-ink-400">WhatsApp — resposta rápida</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={SALON.instagram} target="_blank" rel="noreferrer" className="group flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-petal-500/12 text-petal-600"><Icon name="instagram" className="w-4.5 h-4.5" /></span>
                    <span>
                      <span className="block font-semibold text-ink-900 group-hover:text-petal-600 transition-colors">{SALON.instagramHandle}</span>
                      <span className="text-ink-400">Novidades e trabalhos no Instagram</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600"><Icon name="pin" className="w-4.5 h-4.5" /></span>
                  <span>
                    <span className="block font-semibold text-ink-900">R. João de Deus, 397</span>
                    <span className="text-ink-400">Bela Vista, Osasco · SP — 06060-210</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-gold-400/40 bg-gradient-to-br from-gold-300/20 to-blush-200/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">Pagamento facilitado</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Crédito', 'Débito', 'Aproximação (NFC)', 'Pix', 'Dinheiro'].map((p) => (
                  <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-ink-700">
                    <Icon name="check" className="w-3.5 h-3.5 text-success" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}