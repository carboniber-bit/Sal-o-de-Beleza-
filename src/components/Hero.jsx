import { SALON, waLink } from '../data.js'
import { useParallax } from '../hooks.js'
import { Icon } from './Icons.jsx'

const WORDS = ['Unhas', 'Cabelo', 'Cílios', 'Sobrancelhas', 'Massagem', 'Terapias integrativas', 'Maquiagem', 'Estética facial', 'Estética corporal']

export default function Hero() {
  const parallaxRef = useParallax(0.08)

  return (
    <section id="inicio" className="relative overflow-hidden pt-28 lg:pt-32">
      {/* fundo em camadas: aurora + brilho à deriva */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blush-100 via-blush-50 to-blush-100" />
        <div className="absolute -top-32 -left-32 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-petal-300/40 via-blush-300/30 to-transparent blur-3xl animate-drift" />
        <div className="absolute top-24 -right-40 h-[30rem] w-[30rem] rounded-full bg-gradient-to-bl from-gold-300/35 via-petal-300/25 to-transparent blur-3xl animate-drift-late" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blush-300/30 blur-3xl animate-float-slow" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        <div>
          <p className="staged inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-white/60 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-gold-600" style={{ '--stage-delay': '0ms' }}>
            <Icon name="sparkle" className="w-4 h-4" />
            Estética facial e corporal
          </p>
          <h1 className="staged mt-6 font-display text-[2.6rem] leading-[1.05] text-ink-900 sm:text-6xl lg:text-[4.2rem]" style={{ '--stage-delay': '120ms' }}>
            Sua beleza,
            <br />
            elevada à <em className="text-petal-600 not-italic font-display italic">arte</em>
            <span className="text-gold-500">.</span>
          </h1>
          <p className="staged mt-6 max-w-xl text-lg text-ink-500 leading-relaxed" style={{ '--stage-delay': '240ms' }}>
            No <strong className="text-ink-800 font-semibold">Studio E</strong>, cada detalhe é cuidado com carinho:
            unhas impecáveis, olhar marcante e momentos de puro bem-estar, com café e bolo esperando por você.
          </p>

          <div className="staged mt-6 flex flex-wrap gap-2" style={{ '--stage-delay': '340ms' }}>
            {['Unha', 'Cabelo', 'Cílios', 'Massagem', 'Maquiagem'].map((s) => (
              <a
                key={s}
                href="#servicos"
                className="rounded-full border border-blush-300 bg-white/70 px-4 py-1.5 text-sm text-ink-700 transition-all hover:border-petal-400 hover:bg-petal-500 hover:text-white hover:-translate-y-0.5"
              >
                {s}
              </a>
            ))}
          </div>

          <div className="staged mt-9 flex flex-wrap items-center gap-4" style={{ '--stage-delay': '440ms' }}>
            <a
              href="#agendar"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-petal-500 via-petal-600 to-petal-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-petal-500/35 transition-all hover:shadow-petal-500/55 hover:-translate-y-0.5 active:translate-y-0"
            >
              Agendar meu horário
              <Icon name="arrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={waLink('Olá! Vim pelo site do Studio E e gostaria de agendar um horário.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink-900/15 bg-white/70 px-6 py-3 font-semibold text-ink-800 transition-all hover:border-success hover:text-success hover:-translate-y-0.5"
            >
              <Icon name="whatsapp" className="w-5 h-5" />
              WhatsApp
            </a>
          </div>

          <div className="staged mt-10 flex items-center gap-5" style={{ '--stage-delay': '540ms' }}>
            <div className="flex -space-x-2" aria-hidden="true">
              {['EC', 'RB', 'CA'].map((ini, i) => (
                <span
                  key={ini}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-blush-50 text-xs font-semibold text-white ${
                    ['bg-petal-500', 'bg-gold-500', 'bg-ink-700'][i]
                  }`}
                >
                  {ini}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-gold-500" aria-label={`Nota ${SALON.rating} de 5 estrelas`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="w-4 h-4" />
                ))}
                <span className="ml-1.5 font-semibold text-ink-900">{SALON.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-ink-500">{SALON.reviewCount} avaliações no Google</p>
            </div>
          </div>
        </div>

        <div className="relative staged" style={{ '--stage-delay': '300ms' }}>
          <div ref={parallaxRef} className="relative mx-auto max-w-md will-change-transform">
            <div aria-hidden="true" className="absolute -inset-4 rounded-t-[12rem] rounded-b-[2.5rem] border border-gold-400/60" />
            <div aria-hidden="true" className="absolute -inset-4 rounded-t-[12rem] rounded-b-[2.5rem] bg-gradient-to-b from-gold-300/20 to-petal-300/20 blur-xl" />
            <img
              src="/images/unhas-dourado.jpg"
              alt="Unhas com esmaltação dourada metalizada feita no Studio E"
              className="relative aspect-[4/5] w-full rounded-t-[11rem] rounded-b-[2rem] object-cover shadow-2xl shadow-petal-600/25"
            />
            <div className="absolute -left-6 bottom-16 animate-float rounded-2xl border border-blush-200 bg-white/95 px-4 py-3 shadow-xl shadow-petal-600/15 backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                  <Icon name="coffee" className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">Café & bolo</p>
                  <p className="text-xs text-ink-500">por nossa conta</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 top-14 animate-float-slow rounded-2xl border border-blush-200 bg-white/95 px-4 py-3 shadow-xl shadow-petal-600/15 backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-petal-500/12 text-petal-600">
                  <Icon name="heart" className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">Feito por mulheres</p>
                  <p className="text-xs text-ink-500">espaço acolhedor e seguro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* faixa marquee escura, como no layout de referência */}
      <div className="relative border-y border-gold-500/30 bg-ink-900 py-4 overflow-hidden">
        <div className="flex w-max animate-marquee gap-0" aria-hidden="true">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex shrink-0 items-center">
              {WORDS.map((w) => (
                <span key={`${rep}-${w}`} className="flex items-center gap-6 px-6">
                  <span className="font-display text-xl italic text-blush-200">{w}</span>
                  <Icon name="sparkle" className="w-4 h-4 text-gold-400" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className="sr-only">{WORDS.join(', ')}</span>
      </div>
    </section>
  )
}