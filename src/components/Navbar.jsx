import { useEffect, useState } from 'react'
import { NAV_LINKS, salonStatus } from '../data.js'
import { useActiveSection, useScrollProgress } from '../hooks.js'
import { Icon } from './Icons.jsx'

const IDS = NAV_LINKS.map((l) => l.id)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { progress, scrolled } = useScrollProgress()
  const active = useActiveSection(IDS)
  const status = salonStatus()

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-blush-50/90 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(194,42,99,0.25)]'
          : 'bg-transparent'
      }`}
    >
      <div
        className="h-[3px] origin-left bg-gradient-to-r from-petal-500 via-gold-400 to-petal-600 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
        role="progressbar"
        aria-label="Progresso de leitura da página"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 py-2.5">
        <a href="#inicio" className="flex items-center gap-2 shrink-0" aria-label="Studio E — voltar ao início">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1 shadow-sm">
            <img src="/images/logo.png" alt="Logo Studio E Salão de Beleza" className="h-full w-full object-contain" />
          </span>
          <span className="hidden sm:block leading-tight">
            <span className="font-display text-lg font-semibold text-ink-900 block">Studio E</span>
            <span className="text-[10px] tracking-[0.28em] uppercase text-gold-600">Salão de Beleza</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative px-3 py-2 text-[13px] tracking-wide uppercase transition-colors rounded-full ${
                  active === l.id ? 'text-petal-600 font-semibold' : 'text-ink-500 hover:text-petal-600'
                }`}
              >
                {l.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-petal-500 to-gold-400 transition-all duration-300 ${
                    active === l.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span
            className={`hidden md:inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              status.open ? 'bg-success/10 text-success' : 'bg-ink-900/5 text-ink-500'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.open ? 'bg-success animate-pulse' : 'bg-ink-400'}`} />
            {status.open ? 'Aberto agora' : 'Fechado agora'}
          </span>
          <a
            href="#agendar"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-petal-500 to-petal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-petal-500/30 transition-all hover:shadow-petal-500/50 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Icon name="calendar" className="w-4 h-4" />
            Agendar
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-blush-300 bg-white/70 text-ink-800 hover:border-petal-400 hover:text-petal-600 transition-colors"
            aria-label="Abrir menu de navegação"
            aria-expanded={menuOpen}
          >
            <Icon name="menu" className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu de navegação">
          <button
            type="button"
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-blush-50 shadow-2xl flex flex-col animate-pop overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-blush-200">
              <div className="flex items-center gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1 shadow-sm">
                  <img src="/images/logo.png" alt="" className="h-full w-full object-contain" />
                </span>
                <span className="font-display text-lg font-semibold text-ink-900">Studio E</span>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blush-300 text-ink-700 hover:border-petal-400 hover:text-petal-600 transition-colors"
                aria-label="Fechar menu"
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>
            <ul className="flex-1 px-5 py-4 space-y-1">
              {NAV_LINKS.map((l, i) => (
                <li key={l.id} className="staged" style={{ '--stage-delay': `${i * 50}ms` }}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base transition-colors ${
                      active === l.id
                        ? 'bg-blush-200 text-petal-700 font-semibold'
                        : 'text-ink-700 hover:bg-blush-100'
                    }`}
                  >
                    {l.label}
                    <Icon name="arrowRight" className="w-4 h-4 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-5 pb-6 space-y-3">
              <p className={`text-sm flex items-center gap-2 ${status.open ? 'text-success' : 'text-ink-500'}`}>
                <span className={`h-2 w-2 rounded-full ${status.open ? 'bg-success' : 'bg-ink-400'}`} />
                {status.label}
              </p>
              <a
                href="#agendar"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-petal-500 to-petal-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-petal-500/30"
              >
                <Icon name="calendar" className="w-4 h-4" />
                Agendar horário
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}