import { useEffect, useMemo, useRef, useState } from 'react'
import { CATEGORIES, HOURS, waLink } from '../data.js'
import { useReveal } from '../hooks.js'
import { Icon } from './Icons.jsx'

const maskPhone = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const todayStr = () => {
  const n = new Date()
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`
}

const parseDate = (s) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const SLOTS = []
for (let h = 9; h <= 18; h++) {
  SLOTS.push(`${String(h).padStart(2, '0')}:00`)
  if (h < 18) SLOTS.push(`${String(h).padStart(2, '0')}:30`)
}

const EMPTY = { name: '', phone: '', cat: '', service: '', date: '', time: '', notes: '' }

export default function Booking({ prefill, notify }) {
  const ref = useReveal()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  useEffect(() => {
    if (!prefill) return
    setDone(null)
    setForm((f) => ({ ...f, cat: prefill.cat, service: prefill.service }))
    setErrors((e) => ({ ...e, cat: undefined, service: undefined }))
  }, [prefill])

  const cat = CATEGORIES.find((c) => c.id === form.cat)
  const isToday = form.date === todayStr()

  const slots = useMemo(() => {
    if (!isToday) return SLOTS
    const limit = new Date().getHours() + new Date().getMinutes() / 60 + 1
    return SLOTS.filter((s) => {
      const [h, m] = s.split(':').map(Number)
      return h + m / 60 >= limit
    })
  }, [isToday, form.date])

  const validate = (f) => {
    const e = {}
    if (!f.name.trim()) e.name = 'Conta pra gente seu nome — assim sabemos quem vamos receber.'
    else if (f.name.trim().length < 2) e.name = 'Seu nome parece incompleto. Pode escrever o nome completo?'
    const digits = f.phone.replace(/\D/g, '')
    if (!digits) e.phone = 'Precisamos do seu WhatsApp para confirmar o horário com você.'
    else if (digits.length < 10) e.phone = 'O número parece incompleto. Use DDD + número, ex.: (11) 95407-9852.'
    else if (digits.length === 11 && digits[2] !== '9') e.phone = 'Celulares com 9 dígitos começam com 9 após o DDD. Confira o número.'
    if (!f.cat) e.cat = 'Escolha a especialidade que você quer agendar.'
    if (!f.service) e.service = 'Escolha o serviço desejado dentro da especialidade.'
    if (!f.date) e.date = 'Escolha o dia da sua visita.'
    else {
      const d = parseDate(f.date)
      const t = parseDate(todayStr())
      if (d < t) e.date = 'Essa data já passou. Escolha hoje ou um dia futuro.'
      else if ([0, 1].includes(d.getDay()))
        e.date = `${HOURS[d.getDay()].day} o salão está fechado. Atendemos de terça a sábado — que tal escolher um desses dias?`
    }
    if (!f.time) e.time = 'Escolha o horário que fica melhor para você.'
    else if (isToday && !SLOTS.includes(f.time)) e.time = 'Esse horário não está mais disponível hoje. Escolha outro.'
    return e
  }

  const set = (key, value) => {
    setForm((f) => {
      const next = { ...f, [key]: value }
      if (key === 'cat') next.service = ''
      if (key === 'date' && next.time && value === todayStr()) {
        const [h, m] = next.time.split(':').map(Number)
        const limit = new Date().getHours() + new Date().getMinutes() / 60 + 1
        if (h + m / 60 < limit) next.time = ''
      }
      if (touched[key] || errors[key]) setErrors(validate(next))
      return next
    })
  }

  const blur = (key) => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors(validate(form))
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    setTouched({ name: true, phone: true, cat: true, service: true, date: true, time: true })
    if (Object.keys(e).length) {
      notify('Alguns campos precisam de atenção — veja as mensagens em vermelho.', 'warn')
      const first = document.querySelector('[aria-invalid="true"]')
      first?.focus()
      return
    }
    setSending(true)
    timerRef.current = setTimeout(() => {
      setSending(false)
      setDone({ ...form })
      notify('Pedido de agendamento pronto! Confirme pelo WhatsApp para garantir o horário.', 'success')
    }, 900)
  }

  const clear = () => {
    setForm(EMPTY)
    setErrors({})
    setTouched({})
    notify('Formulário limpo. Pode começar de novo quando quiser.', 'info')
  }

  const prettyDate = (s) =>
    parseDate(s).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

  const waMessage = (d) => {
    const c = CATEGORIES.find((x) => x.id === d.cat)
    return [
      `Olá! Sou ${d.name.trim()} e quero agendar no Studio E:`,
      `• Serviço: ${d.service} (${c?.label})`,
      `• Dia: ${prettyDate(d.date)}`,
      `• Horário: ${d.time.replace(':', 'h')}`,
      d.notes.trim() ? `• Observações: ${d.notes.trim()}` : null,
      'Podem confirmar? Obrigada!',
    ]
      .filter(Boolean)
      .join('\n')
  }

  const field = (key) => ({
    'aria-invalid': errors[key] && touched[key] ? 'true' : undefined,
    'aria-describedby': errors[key] && touched[key] ? `err-${key}` : undefined,
    onBlur: () => blur(key),
  })

  const inputCls = (key) =>
    `w-full rounded-2xl border bg-white px-4 py-3 text-ink-800 placeholder:text-ink-400 outline-none transition-all focus:ring-4 ${
      errors[key] && touched[key]
        ? 'border-danger focus:border-danger focus:ring-danger/15'
        : 'border-blush-300 focus:border-petal-400 focus:ring-petal-400/15'
    }`

  const Err = ({ k }) =>
    errors[k] && touched[k] ? (
      <p id={`err-${k}`} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger" role="alert">
        <Icon name="alert" className="mt-0.5 w-4 h-4 shrink-0" />
        {errors[k]}
      </p>
    ) : null

  return (
    <section id="agendar" ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blush-200 via-blush-100 to-gold-300/25" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-petal-300/30 blur-3xl animate-drift" />
        <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-gold-300/30 blur-3xl animate-drift-late" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="reveal text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-600">Agende seu horário</p>
          <h2 className="reveal mt-3 font-display text-4xl leading-tight text-ink-900 sm:text-5xl" style={{ '--reveal-delay': '80ms' }}>
            Seu momento de <em className="italic text-petal-600">cuidado</em> começa aqui
          </h2>
          <p className="reveal mt-5 leading-relaxed text-ink-500" style={{ '--reveal-delay': '140ms' }}>
            Preencha o formulário e enviaremos seu pedido direto para o nosso WhatsApp. A confirmação final do
            horário é feita por lá, rapidinho, com uma de nossas profissionais.
          </p>
          <ol className="reveal mt-8 space-y-4" style={{ '--reveal-delay': '200ms' }}>
            {[
              ['Escolha o serviço', 'Especialidade, serviço, dia e horário — do seu jeito.'],
              ['Envie pelo WhatsApp', 'Seu pedido chega prontinho para a nossa equipe.'],
              ['Receba a confirmação', 'Confirmamos o horário e te esperamos com café e bolo.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-petal-500 to-petal-600 font-display font-semibold text-white shadow-lg shadow-petal-500/30">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink-900">{t}</p>
                  <p className="text-sm text-ink-500">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="reveal mt-8 flex items-start gap-3 rounded-2xl border border-info/25 bg-info/8 p-4 text-sm text-ink-700" style={{ '--reveal-delay': '260ms' }}>
            <Icon name="info" className="mt-0.5 w-4.5 h-4.5 shrink-0 text-info" />
            <p>Atendemos de <strong>terça a sábado, das 9h às 19h</strong>. Precisa remarcar ou cancelar? É só avisar pelo WhatsApp com 4h de antecedência — sem taxa.</p>
          </div>
        </div>

        <div className="reveal" style={{ '--reveal-delay': '150ms' }}>
          {done ? (
            <div className="animate-pop rounded-[2rem] border border-gold-400/50 bg-white/95 p-8 text-center shadow-2xl shadow-petal-600/20 sm:p-10">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/12 text-success">
                <Icon name="check" className="w-8 h-8" />
              </span>
              <h3 className="mt-5 font-display text-4xl text-ink-900">Obrigada, {done.name.trim().split(' ')[0]}!</h3>
              <p className="mt-3 text-ink-500">
                Seu pedido de agendamento está pronto. Toque no botão abaixo para enviar pelo WhatsApp —
                é o último passo para garantir seu horário.
              </p>
              <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-2xl bg-blush-100 p-5 text-left text-sm">
                <div className="flex justify-between gap-4"><dt className="text-ink-400">Serviço</dt><dd className="font-semibold text-ink-900 text-right">{done.service}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-400">Dia</dt><dd className="font-semibold text-ink-900 text-right capitalize">{prettyDate(done.date)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-400">Horário</dt><dd className="font-semibold text-ink-900">{done.time.replace(':', 'h')}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-400">WhatsApp</dt><dd className="font-semibold text-ink-900">{done.phone}</dd></div>
              </dl>
              <a
                href={waLink(waMessage(done))}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-success px-6 py-4 font-semibold text-white shadow-xl shadow-success/30 transition-all hover:-translate-y-0.5 hover:shadow-success/50 sm:w-auto"
              >
                <Icon name="whatsapp" className="w-5 h-5" />
                Confirmar pelo WhatsApp
              </a>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setDone(null)
                    setForm(EMPTY)
                    setTouched({})
                    setErrors({})
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-petal-600 underline-offset-4 hover:underline"
                >
                  <Icon name="arrowLeft" className="w-4 h-4" />
                  Fazer novo agendamento
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="rounded-[2rem] border border-blush-200 bg-white/90 p-7 shadow-2xl shadow-petal-600/15 backdrop-blur sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-name" className="mb-1.5 block text-sm font-semibold text-ink-800">Seu nome *</label>
                  <input id="bk-name" type="text" autoComplete="name" placeholder="Como podemos te chamar?" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls('name')} {...field('name')} />
                  <Err k="name" />
                </div>
                <div>
                  <label htmlFor="bk-phone" className="mb-1.5 block text-sm font-semibold text-ink-800">WhatsApp *</label>
                  <input id="bk-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(11) 90000-0000" value={form.phone} onChange={(e) => set('phone', maskPhone(e.target.value))} className={inputCls('phone')} {...field('phone')} />
                  <Err k="phone" />
                </div>
                <div>
                  <label htmlFor="bk-cat" className="mb-1.5 block text-sm font-semibold text-ink-800">Especialidade *</label>
                  <select id="bk-cat" value={form.cat} onChange={(e) => set('cat', e.target.value)} className={inputCls('cat')} {...field('cat')}>
                    <option value="">Escolha uma especialidade…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                  <Err k="cat" />
                </div>
                <div>
                  <label htmlFor="bk-service" className="mb-1.5 block text-sm font-semibold text-ink-800">Serviço *</label>
                  <select id="bk-service" value={form.service} onChange={(e) => set('service', e.target.value)} disabled={!cat} className={`${inputCls('service')} disabled:cursor-not-allowed disabled:bg-blush-100 disabled:text-ink-400`} {...field('service')}>
                    <option value="">{cat ? 'Escolha o serviço…' : 'Primeiro escolha a especialidade'}</option>
                    {cat?.services.map((s) => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                  <Err k="service" />
                </div>
                <div>
                  <label htmlFor="bk-date" className="mb-1.5 block text-sm font-semibold text-ink-800">Dia *</label>
                  <input id="bk-date" type="date" min={todayStr()} value={form.date} onChange={(e) => set('date', e.target.value)} className={inputCls('date')} {...field('date')} />
                  <Err k="date" />
                  {!errors.date && <p className="mt-1.5 text-xs text-ink-400">Terça a sábado · domingos e segundas fechamos para descanso.</p>}
                </div>
                <div>
                  <label htmlFor="bk-time" className="mb-1.5 block text-sm font-semibold text-ink-800">Horário *</label>
                  <select id="bk-time" value={form.time} onChange={(e) => set('time', e.target.value)} className={inputCls('time')} {...field('time')}>
                    <option value="">{slots.length ? 'Escolha o horário…' : 'Sem horários restantes hoje'}</option>
                    {slots.map((s) => (
                      <option key={s} value={s}>{s.replace(':', 'h')}</option>
                    ))}
                  </select>
                  <Err k="time" />
                  {isToday && !errors.time && <p className="mt-1.5 text-xs text-ink-400">Para hoje, mostramos só horários com pelo menos 1h de folga.</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="bk-notes" className="mb-1.5 block text-sm font-semibold text-ink-800">
                    Observações <span className="font-normal text-ink-400">(opcional)</span>
                  </label>
                  <textarea id="bk-notes" rows={3} maxLength={300} placeholder="Alergias, preferências de cor, ocasião especial…" value={form.notes} onChange={(e) => set('notes', e.target.value)} className={`${inputCls('notes')} resize-none`} />
                  <p className="mt-1 text-right text-xs text-ink-400">{form.notes.length}/300</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-blush-300 px-6 py-3.5 text-sm font-semibold text-ink-500 transition-colors hover:border-danger hover:text-danger"
                >
                  <Icon name="close" className="w-4 h-4" />
                  Limpar formulário
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-petal-500 to-petal-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-petal-500/35 transition-all hover:-translate-y-0.5 hover:shadow-petal-500/55 active:translate-y-0 disabled:cursor-wait disabled:opacity-80"
                >
                  {sending ? (
                    <>
                      <span className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                      Preparando seu pedido…
                    </>
                  ) : (
                    <>
                      <Icon name="send" className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Enviar pedido de agendamento
                    </>
                  )}
                </button>
              </div>
              <p className="mt-4 text-center text-xs text-ink-400">* campos obrigatórios · nenhum dado é enviado sem você confirmar no WhatsApp.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}