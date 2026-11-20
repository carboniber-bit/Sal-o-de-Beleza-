import { NAV_LINKS, SALON, waLink } from '../data.js'
import { Icon } from './Icons.jsx'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-900 pt-16 text-blush-200">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-petal-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blush-50 p-1">
                <img src="/images/logo.png" alt="Logo Studio E" className="h-full w-full object-contain" />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold text-blush-100">Studio E</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400">Salão de Beleza</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed text-blush-300/80">
              Especialistas em estética facial e corporal. Unha, cabelo, cílios, massagem e maquiagem,
              com o cuidado e o acolhimento que você merece.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={SALON.instagram} target="_blank" rel="noreferrer" aria-label="Instagram do Studio E" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-blush-200 transition-all hover:border-petal-400 hover:bg-petal-500 hover:text-white">
                <Icon name="instagram" className="w-5 h-5" />
              </a>
              <a href={waLink('Olá! Vim pelo site do Studio E.')} target="_blank" rel="noreferrer" aria-label="WhatsApp do Studio E" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-blush-200 transition-all hover:border-success hover:bg-success hover:text-white">
                <Icon name="whatsapp" className="w-5 h-5" />
              </a>
              <a href={SALON.mapsLink} target="_blank" rel="noreferrer" aria-label="Localização no Google Maps" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-blush-200 transition-all hover:border-gold-400 hover:bg-gold-500 hover:text-ink-900">
                <Icon name="pin" className="w-5 h-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">Navegue</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="group inline-flex items-center gap-2 text-blush-300/85 transition-colors hover:text-petal-300">
                    <span className="h-px w-3 bg-gold-500/50 transition-all group-hover:w-5 group-hover:bg-petal-400" aria-hidden="true" />
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#agendar" className="group inline-flex items-center gap-2 font-semibold text-gold-300 transition-colors hover:text-gold-400">
                  <span className="h-px w-3 bg-gold-500/50 transition-all group-hover:w-5" aria-hidden="true" />
                  Agendar horário
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-400">Visite-nos</p>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 w-4.5 h-4.5 shrink-0 text-petal-400" />
                <span className="text-blush-300/85">{SALON.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="clock" className="mt-0.5 w-4.5 h-4.5 shrink-0 text-petal-400" />
                <span className="text-blush-300/85">Terça a sábado · 9h às 19h<br />Domingo e segunda · fechado</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="phone" className="mt-0.5 w-4.5 h-4.5 shrink-0 text-petal-400" />
                <a href={waLink('Olá! Vim pelo site do Studio E.')} target="_blank" rel="noreferrer" className="text-blush-300/85 transition-colors hover:text-petal-300">{SALON.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="instagram" className="mt-0.5 w-4.5 h-4.5 shrink-0 text-petal-400" />
                <a href={SALON.instagram} target="_blank" rel="noreferrer" className="text-blush-300/85 transition-colors hover:text-petal-300">{SALON.instagramHandle}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-rule" aria-hidden="true" />
        <p aria-hidden="true" className="select-none whitespace-nowrap text-center font-display text-[16vw] leading-[0.95] text-blush-100/[0.07] lg:text-[11rem]">
          Studio E
        </p>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-blush-300/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Studio E Salão de Beleza · Osasco, SP. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5">
            Feito com <Icon name="heart" className="w-3.5 h-3.5 text-petal-400" /> em Bela Vista
          </p>
        </div>
      </div>
    </footer>
  )
}