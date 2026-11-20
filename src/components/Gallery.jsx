import { useCallback, useEffect, useState } from 'react'
import { GALLERY, GALLERY_FILTERS } from '../data.js'
import { useReveal } from '../hooks.js'
import { Icon } from './Icons.jsx'

export default function Gallery() {
  const ref = useReveal()
  const [filter, setFilter] = useState('todas')
  const [lightbox, setLightbox] = useState(null)

  const items = filter === 'todas' ? GALLERY : GALLERY.filter((g) => g.cat === filter)

  const step = useCallback(
    (dir) => {
      setLightbox((cur) => {
        if (cur === null) return cur
        return (cur + dir + items.length) % items.length
      })
    },
    [items.length],
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, step])

  return (
    <section id="galeria" ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-blush-100 via-blush-200/60 to-blush-100" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[11px] font-condensed font-semibold uppercase tracking-[0.28em] text-gold-600">Galeria</p>
            <h2 className="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">
              Nosso trabalho <em className="italic text-petal-600">fala por nós</em>
            </h2>
            <p className="mt-4 text-ink-500">
              Toque em uma foto para ampliar. Use as setas do teclado para navegar e <kbd className="rounded-md border border-blush-300 bg-white px-1.5 text-xs">Esc</kbd> para fechar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar galeria por especialidade">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => {
                  setFilter(f.id)
                  setLightbox(null)
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filter === f.id
                    ? 'bg-ink-900 text-gold-300 shadow-lg'
                    : 'border border-blush-300 bg-white/80 text-ink-600 hover:border-gold-400 hover:text-gold-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div key={filter} className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [column-fill:balance]">
          {items.map((g, i) => (
            <button
              key={g.src + i}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-white/60 shadow-md shadow-petal-600/10 transition-all duration-300 hover:shadow-xl hover:shadow-petal-600/25 animate-pop focus-visible:outline-2 focus-visible:outline-petal-500"
              style={{ animationDelay: `${i * 60}ms` }}
              aria-label={`Ampliar foto: ${g.title}`}
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
              />
              <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-900/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center justify-between gap-2 text-left">
                  <span className="text-sm font-medium text-blush-100">{g.title}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500 text-ink-900">
                    <Icon name="zoom" className="w-4 h-4" />
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && items[lightbox] && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-900/90 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ampliada: ${items[lightbox].title}`}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-full max-w-4xl animate-pop" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[lightbox].src}
              alt={items[lightbox].title}
              className="max-h-[78vh] w-auto rounded-2xl border border-gold-500/40 object-contain shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="font-display text-lg italic text-blush-100">{items[lightbox].title}</p>
              <p className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-sm text-blush-200">
                {lightbox + 1} / {items.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-petal-500"
              aria-label="Foto anterior"
            >
              <Icon name="arrowLeft" className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-petal-500"
              aria-label="Próxima foto"
            >
              <Icon name="arrowRight" className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-petal-500 text-white shadow-lg transition-transform hover:scale-110"
              aria-label="Fechar foto ampliada (Esc)"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}