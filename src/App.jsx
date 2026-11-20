import { useCallback, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About, { WhyUs } from './components/About.jsx'
import Services from './components/Services.jsx'
import Gallery from './components/Gallery.jsx'
import Reviews from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'
import Faq from './components/Faq.jsx'
import Booking from './components/Booking.jsx'
import Footer from './components/Footer.jsx'
import { Icon } from './components/Icons.jsx'
import { waLink } from './data.js'
import { useScrollProgress } from './hooks.js'

const TOAST_STYLE = {
  success: 'border-success/40 bg-white text-ink-800',
  warn: 'border-warn/40 bg-white text-ink-800',
  info: 'border-info/40 bg-white text-ink-800',
}
const TOAST_ICON = {
  success: ['check', 'text-success bg-success/12'],
  warn: ['alert', 'text-warn bg-warn/12'],
  info: ['info', 'text-info bg-info/12'],
}

export default function App() {
  const [toasts, setToasts] = useState([])
  const [prefill, setPrefill] = useState(null)
  const toastId = useRef(0)
  const { progress } = useScrollProgress()

  const notify = useCallback((message, type = 'info') => {
    const id = ++toastId.current
    setToasts((t) => [...t.slice(-2), { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5000)
  }, [])

  const onBook = useCallback((cat, service) => {
    setPrefill({ cat, service, stamp: Date.now() })
    document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="grain relative min-h-screen">
      <a
        href="#agendar"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-petal-600 focus:px-5 focus:py-2.5 focus:text-white"
      >
        Pular para o agendamento
      </a>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <About />
        <Services onBook={onBook} />
        <Gallery />
        <Reviews />
        <Contact />
        <Faq />
        <Booking prefill={prefill} notify={notify} />
      </main>
      <Footer />

      {/* atalhos flutuantes: WhatsApp + voltar ao topo */}
      <a
        href={waLink('Olá! Vim pelo site do Studio E e gostaria de agendar um horário.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-2xl shadow-success/40 transition-all hover:scale-110 hover:shadow-success/60"
      >
        <Icon name="whatsapp" className="w-7 h-7" />
        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-petal-500 animate-pulse" aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo da página"
        className={`fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-blush-300 bg-white/90 text-petal-600 shadow-xl backdrop-blur transition-all duration-300 hover:bg-petal-500 hover:text-white ${
          progress > 0.08 ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-4'
        }`}
      >
        <Icon name="arrowUp" className="w-5 h-5" />
      </button>

      {/* feedback de status (toasts) */}
      <div className="pointer-events-none fixed bottom-24 left-1/2 z-[90] w-[min(92vw,26rem)] -translate-x-1/2 space-y-2" aria-live="polite">
        {toasts.map((t) => {
          const [icon, iconCls] = TOAST_ICON[t.type]
          return (
            <div
              key={t.id}
              role="status"
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-2xl shadow-ink-900/15 animate-toast-in ${TOAST_STYLE[t.type]}`}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconCls}`}>
                <Icon name={icon} className="w-4.5 h-4.5" />
              </span>
              <p className="flex-1 pt-1 text-sm leading-snug">{t.message}</p>
              <button
                type="button"
                onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))}
                aria-label="Fechar aviso"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-blush-100 hover:text-ink-800"
              >
                <Icon name="close" className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}