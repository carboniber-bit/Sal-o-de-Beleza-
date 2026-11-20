import { SALON } from '../data.js'
import { useReveal } from '../hooks.js'
import { Icon } from './Icons.jsx'

const REASONS = [
  {
    icon: 'nail',
    title: 'Capricho em cada detalhe',
    text: 'Profissionais dedicadas que tratam cada unha, fio e olhar como uma pequena obra de arte.',
  },
  {
    icon: 'coffee',
    title: 'Acolhimento de verdade',
    text: 'Você é recebida com café fresquinho e bolo caseiro. Aqui, cuidar de você começa na recepção.',
  },
  {
    icon: 'shield',
    title: 'Higiene e segurança',
    text: 'Materiais esterilizados e protocolos rigorosos em todos os procedimentos, sempre.',
  },
  {
    icon: 'users',
    title: 'Atendimento personalizado',
    text: 'Escutamos o que você deseja antes de começar — o resultado é a sua cara, não uma fórmula.',
  },
]

const BADGES = [
  { icon: 'heart', label: 'Negócio liderado por mulheres' },
  { icon: 'users', label: 'LGBTQ+ friendly' },
  { icon: 'wifi', label: 'Wi-Fi gratuito' },
  { icon: 'card', label: 'Crédito, débito, NFC e Pix' },
]

export function WhyUs() {
  const ref = useReveal()
  return (
    <section ref={ref} className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal max-w-2xl">
          <p className="text-[11px] font-condensed font-semibold uppercase tracking-[0.28em] text-gold-600">Por que o Studio E?</p>
          <h2 className="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">
            Um salão que cuida de <em className="italic text-petal-600">você</em> por inteiro
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <article
              key={r.title}
              className="reveal group relative overflow-hidden rounded-3xl border border-blush-200 bg-white/80 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-petal-500/15 hover:border-petal-300"
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <div aria-hidden="true" className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blush-200 to-petal-300/30 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-petal-500 to-petal-600 text-white shadow-lg shadow-petal-500/30">
                <Icon name={r.icon} className="w-6 h-6" />
              </span>
              <h3 className="relative mt-5 font-display text-xl font-semibold text-ink-900">{r.title}</h3>
              <p className="relative mt-2.5 text-[15px] leading-relaxed text-ink-500">{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function About() {
  const ref = useReveal()
  return (
    <section id="sobre" ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-blush-100 via-blush-50 to-gold-300/15" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div className="reveal relative order-2 lg:order-1">
          <div aria-hidden="true" className="absolute -left-5 -top-5 h-full w-full rounded-[2.5rem] border border-gold-400/50" />
          <img
            src="/images/salao.jpg"
            alt="Recepção do Studio E: balcão branco, cadeiras pretas e espelhos com LED na parede verde"
            className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-2xl shadow-petal-600/20"
            loading="lazy"
          />
          <div className="absolute -bottom-7 left-6 right-6 sm:left-10 sm:right-auto rounded-2xl border border-blush-200 bg-white/95 px-6 py-4 shadow-xl backdrop-blur">
            <div className="flex items-center gap-6">
              <div>
                <p className="font-display text-3xl font-semibold text-petal-600">3+</p>
                <p className="text-xs text-ink-500">anos de clientes fiéis</p>
              </div>
              <div className="h-10 w-px bg-blush-300" aria-hidden="true" />
              <div>
                <p className="font-display text-3xl font-semibold text-gold-600">8</p>
                <p className="text-xs text-ink-500">especialidades</p>
              </div>
              <div className="h-10 w-px bg-blush-300" aria-hidden="true" />
              <div>
                <p className="font-display text-3xl font-semibold text-ink-900">5.0</p>
                <p className="text-xs text-ink-500">no Google</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="reveal text-[11px] font-condensed font-semibold uppercase tracking-[0.28em] text-gold-600">O salão</p>
          <h2 className="reveal mt-3 font-display text-4xl leading-tight text-ink-900 sm:text-5xl" style={{ '--reveal-delay': '80ms' }}>
            Elegância que se redefine <em className="italic text-petal-600">todos os dias</em>
          </h2>
          <div className="reveal gold-rule mt-6 w-40" style={{ '--reveal-delay': '140ms' }} aria-hidden="true" />
          <p className="reveal mt-6 text-lg leading-relaxed text-ink-500" style={{ '--reveal-delay': '200ms' }}>
            O <strong className="text-ink-800">Studio E Salão de Beleza</strong> nasceu em Osasco com uma missão simples:
            unir técnica impecável e um acolhimento que faz você se sentir em casa. Somos especialistas em{' '}
            <strong className="text-ink-800">estética facial e corporal</strong> — unhas, cabelo, cílios, massagem e maquiagem.
          </p>
          <p className="reveal mt-4 leading-relaxed text-ink-500" style={{ '--reveal-delay': '260ms' }}>
            Clientes que estão conosco há anos dizem a mesma coisa: o atendimento é diferenciado. Cada visita é pensada
            nos mínimos detalhes, com cuidado, segurança e atenção — do agendamento ao último retoque.
          </p>
          <ul className="reveal mt-8 grid gap-3 sm:grid-cols-2" style={{ '--reveal-delay': '320ms' }}>
            {BADGES.map((b) => (
              <li key={b.label} className="flex items-center gap-3 rounded-2xl border border-blush-200 bg-white/70 px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
                  <Icon name={b.icon} className="w-4.5 h-4.5" />
                </span>
                <span className="text-sm font-medium text-ink-700">{b.label}</span>
              </li>
            ))}
          </ul>
          <a
            href="#galeria"
            className="reveal group mt-8 inline-flex items-center gap-2 font-semibold text-petal-600 transition-colors hover:text-petal-700"
            style={{ '--reveal-delay': '380ms' }}
          >
            Conheça nosso trabalho na galeria
            <Icon name="arrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="reveal mt-6 flex items-center gap-2 text-sm text-ink-400" style={{ '--reveal-delay': '420ms' }}>
            <Icon name="pin" className="w-4 h-4 text-petal-500" />
            {SALON.addressShort}
          </p>
        </div>
      </div>
    </section>
  )
}