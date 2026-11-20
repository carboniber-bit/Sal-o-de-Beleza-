export const SALON = {
  name: 'Studio E',
  tagline: 'Salão de Beleza',
  phone: '(11) 95407-9852',
  phoneRaw: '5511954079852',
  address: 'R. João de Deus, 397 — Bela Vista, Osasco · SP, 06060-210',
  addressShort: 'Rua João de Deus, 397 · Bela Vista · Osasco',
  instagram: 'https://www.instagram.com/salaostudioe_/',
  instagramHandle: '@salaostudioe_',
  rating: 5.0,
  reviewCount: 58,
  mapsQuery:
    'https://maps.google.com/maps?q=Rua%20Jo%C3%A3o%20de%20Deus%2C%20397%2C%20Bela%20Vista%2C%20Osasco%20-%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=Rua+Jo%C3%A3o+de+Deus+397+Bela+Vista+Osasco+SP',
}

export const waLink = (message) =>
  `https://wa.me/${SALON.phoneRaw}?text=${encodeURIComponent(message)}`

// 0 = domingo … 6 = sábado
export const HOURS = [
  { day: 'Domingo', short: 'Dom', open: null, close: null },
  { day: 'Segunda-feira', short: 'Seg', open: null, close: null },
  { day: 'Terça-feira', short: 'Ter', open: 9, close: 19 },
  { day: 'Quarta-feira', short: 'Qua', open: 9, close: 19 },
  { day: 'Quinta-feira', short: 'Qui', open: 9, close: 19 },
  { day: 'Sexta-feira', short: 'Sex', open: 9, close: 19 },
  { day: 'Sábado', short: 'Sáb', open: 9, close: 19 },
]

export function salonStatus(now = new Date()) {
  const h = HOURS[now.getDay()]
  const hour = now.getHours() + now.getMinutes() / 60
  if (h.open !== null && hour >= h.open && hour < h.close) {
    return { open: true, label: `Aberto agora · fecha às ${h.close}h` }
  }
  for (let i = 0; i < 8; i++) {
    const d = (now.getDay() + i) % 7
    const cand = HOURS[d]
    if (cand.open === null) continue
    if (i === 0 && hour < cand.open) {
      return { open: false, label: `Fechado · abre hoje às ${cand.open}h` }
    }
    if (i > 0) {
      const when = i === 1 ? 'amanhã' : cand.day.toLowerCase()
      return { open: false, label: `Fechado · abre ${when} às ${cand.open}h` }
    }
  }
  return { open: false, label: 'Fechado no momento' }
}

export const CATEGORIES = [
  {
    id: 'unhas',
    label: 'Unhas',
    icon: 'nail',
    image: '/images/unhas-poas.jpg',
    blurb: 'Manicure e pedicure caprichosas, do clássico ao nail art — a especialidade da casa.',
    services: [
      { name: 'Manicure tradicional', desc: 'Cutilagem cuidadosa + esmaltação', price: 35, time: '45 min' },
      { name: 'Pedicure completa', desc: 'Cutilagem, esfoliação e esmaltação', price: 45, time: '50 min' },
      { name: 'Mão + pé', desc: 'O combo queridinho das clientes', price: 70, time: '1h30' },
      { name: 'Esmaltação em gel', desc: 'Brilho intenso por até 3 semanas', price: 60, time: '1h' },
      { name: 'Alongamento em fibra', desc: 'Alongamento natural e resistente', price: 130, time: '2h' },
      { name: 'Nail art (por unha)', desc: 'Desenhos, francesinha e pedrarias', price: 8, time: '15 min' },
    ],
  },
  {
    id: 'cabelo',
    label: 'Cabelo',
    icon: 'hair',
    image: '/images/cabelo-liso.jpg',
    blurb: 'Corte, tratamento e finalização para você sair pronta para qualquer ocasião.',
    services: [
      { name: 'Corte feminino', desc: 'Consulta de visagismo + finalização', price: 70, time: '1h' },
      { name: 'Escova modelada', desc: 'Lavagem + escova com finalização', price: 55, time: '50 min' },
      { name: 'Hidratação profunda', desc: 'Reposição de massa e brilho', price: 80, time: '1h' },
      { name: 'Coloração', desc: 'Retoque de raiz ou cor global', price: 120, time: '1h30' },
      { name: 'Mechas / iluminado', desc: 'Técnica personalizada para seu tom', price: 220, time: '3h' },
      { name: 'Progressiva', desc: 'Alinhamento com produtos de qualidade', price: 180, time: '2h30' },
    ],
  },
  {
    id: 'cilios',
    label: 'Cílios & Sobrancelhas',
    icon: 'lash',
    image: '/images/cilios-volume.jpg',
    blurb: 'Olhar marcante todos os dias, sem esforço — extensão de cílios e design de sobrancelhas.',
    services: [
      { name: 'Extensão de cílios clássica', desc: 'Fio a fio, efeito natural', price: 120, time: '2h' },
      { name: 'Volume brasileiro', desc: 'Volume leve e elegante em Y', price: 150, time: '2h' },
      { name: 'Manutenção de cílios', desc: 'Até 3 semanas após aplicação', price: 80, time: '1h15' },
      { name: 'Design de sobrancelhas', desc: 'Mapeamento + design com pinça', price: 40, time: '30 min' },
      { name: 'Design com henna', desc: 'Design + preenchimento com henna', price: 55, time: '45 min' },
      { name: 'Brow lamination', desc: 'Fios alinhados e volumosos', price: 90, time: '1h' },
    ],
  },
  {
    id: 'massagem',
    label: 'Massagem & Terapias',
    icon: 'spa',
    image: '/images/massagem-pedras.jpg',
    blurb: 'Um momento só seu: relaxamento, bem-estar e terapias integrativas em um ambiente acolhedor.',
    services: [
      { name: 'Massagem relaxante', desc: 'Corpo inteiro, óleos aromáticos', price: 100, time: '1h' },
      { name: 'Massagem com pedras quentes', desc: 'Calor profundo que dissolve a tensão', price: 120, time: '1h' },
      { name: 'Massagem modeladora', desc: 'Movimentos intensos e drenantes', price: 110, time: '1h' },
      { name: 'Drenagem linfática', desc: 'Reduz inchaço e ativa a circulação', price: 110, time: '1h' },
      { name: 'Massagem nas costas', desc: 'Alívio de tensão em cervical e lombar', price: 60, time: '30 min' },
      { name: 'Spa dos pés', desc: 'Escalda-pés + esfoliação + massagem', price: 65, time: '40 min' },
      { name: 'Acupuntura', desc: 'Equilíbrio energético e alívio de dores', price: null, time: 'sob consulta' },
      { name: 'Acupuntura + laser', desc: 'Estímulo de pontos sem agulhas', price: null, time: 'sob consulta' },
      { name: 'Auriculoterapia', desc: 'Terapia por pontos da orelha', price: null, time: 'sob consulta' },
      { name: 'Fitoacupuntura', desc: 'Acupuntura com injeção de fitoterápicos', price: null, time: 'sob consulta' },
      { name: 'Laser terapêutico', desc: 'Ação anti-inflamatória e analgésica', price: null, time: 'sob consulta' },
      { name: 'Ventosaterapia', desc: 'Sucção que libera tensões musculares', price: null, time: 'sob consulta' },
      { name: 'Cone chinês', desc: 'Terapia térmica de relaxamento profundo', price: null, time: 'sob consulta' },
      { name: 'Moxaterapia', desc: 'Calor de artemísia em pontos energéticos', price: null, time: 'sob consulta' },
    ],
  },
  {
    id: 'maquiagem',
    label: 'Maquiagem',
    icon: 'makeup',
    image: '/images/maquiagem.png',
    blurb: 'Da make social à produção de festa, realçando a sua beleza com técnica e carinho.',
    services: [
      { name: 'Maquiagem social', desc: 'Pele glow + olhos marcados na medida', price: 120, time: '1h' },
      { name: 'Maquiagem para festa', desc: 'Alta durabilidade, acabamento HD', price: 160, time: '1h20' },
      { name: 'Make + penteado', desc: 'Produção completa para eventos', price: 230, time: '2h' },
      { name: 'Maquiagem noiva', desc: 'Prova + dia do casamento', price: 350, time: 'sob consulta' },
      { name: 'Aula de automaquiagem', desc: 'Aprenda a se maquiar no dia a dia', price: 150, time: '1h30' },
    ],
  },
  {
    id: 'estetica',
    label: 'Estética',
    icon: 'face',
    image: '/images/sala-massagem.jpg',
    blurb: 'Cuidados faciais e corporais para uma pele saudável e radiante.',
    services: [
      { name: 'Limpeza de pele profunda', desc: 'Extração + alta frequência + máscara', price: 110, time: '1h20' },
      { name: 'Peeling de diamante', desc: 'Renovação celular e viço imediato', price: 120, time: '1h' },
      { name: 'Revitalização facial', desc: 'Hidratação intensiva + massagem facial', price: 95, time: '1h' },
      { name: 'Massagem facial modeladora', desc: 'Efeito lifting e drenagem', price: 85, time: '50 min' },
    ],
  },
]

export const GALLERY = [
  { src: '/images/unhas-dourado.jpg', cat: 'unhas', title: 'Dourado metalizado — a cor da casa', tall: true },
  { src: '/images/cabelo-ondas.jpg', cat: 'cabelo', title: 'Ondas modeladas com brilho', tall: true },
  { src: '/images/cilios-volume.jpg', cat: 'cilios', title: 'Extensão de cílios — olhar marcante' },
  { src: '/images/unhas-poas.jpg', cat: 'unhas', title: 'Nail art — poá preto e branco' },
  { src: '/images/salao.jpg', cat: 'salao', title: 'Nosso espaço: recepção e atendimento', tall: true },
  { src: '/images/unhas-vermelho.jpg', cat: 'unhas', title: 'Clássico vermelho intenso' },
  { src: '/images/cabelo-cachos.jpg', cat: 'cabelo', title: 'Cachos definidos e iluminados', tall: true },
  { src: '/images/sobrancelha.jpg', cat: 'cilios', title: 'Design de sobrancelhas' },
  { src: '/images/unhas-glitter.jpg', cat: 'unhas', title: 'Azul sereno com glitter', tall: true },
  { src: '/images/massagem-pedras.jpg', cat: 'massagem', title: 'Massagem com pedras quentes' },
  { src: '/images/cabelo-liso.jpg', cat: 'cabelo', title: 'Iluminado dourado em fios lisos', tall: true },
  { src: '/images/unhas-gel.jpg', cat: 'unhas', title: 'Efeito gel — azul vibrante' },
  { src: '/images/cilios-natural.jpg', cat: 'cilios', title: 'Cílios fio a fio — efeito natural', tall: true },
  { src: '/images/unhas-marinho.jpg', cat: 'unhas', title: 'Marinho fosco + azul magnético' },
  { src: '/images/sala-massagem.jpg', cat: 'massagem', title: 'Sala de massagem e estética' },
  { src: '/images/unhas-prata.jpg', cat: 'unhas', title: 'Prata cromada espelhada' },
  { src: '/images/cabelo-penteado.jpg', cat: 'cabelo', title: 'Semipreso com ondas glam', tall: true },
  { src: '/images/unhas-azul.jpg', cat: 'unhas', title: 'Azul royal em todos os tons de pele' },
  { src: '/images/unhas-vinho.jpg', cat: 'unhas', title: 'Vinho profundo — unhas bem feitas', tall: true },
  { src: '/images/maquiagem.png', cat: 'maquiagem', title: 'Make social — pele glow' },
]

export const GALLERY_FILTERS = [
  { id: 'todas', label: 'Todas' },
  { id: 'unhas', label: 'Unhas' },
  { id: 'cilios', label: 'Cílios & Sobrancelhas' },
  { id: 'cabelo', label: 'Cabelo' },
  { id: 'massagem', label: 'Massagem & Terapias' },
  { id: 'maquiagem', label: 'Maquiagem' },
  { id: 'salao', label: 'O salão' },
]

export const REVIEWS = [
  {
    name: 'Karen Camargo',
    meta: '2 avaliações no Google',
    text: 'Edna, minha manicure, muito caprichosa e dedicada!! Além de ser uma excelente profissional, cuidadosa, atenciosa… o salão é uma graça, sempre sou recepcionada com café e bolo. Super recomendo!',
    highlight: 'café e bolo',
  },
  {
    name: 'Rosangela Basilio',
    meta: 'Local Guide · 19 avaliações',
    text: 'Atendimento impecável! O salão é maravilhoso, e o atendimento é realmente diferenciado. Dá para perceber o quanto se esforçam para fazer tudo da melhor forma possível, sempre com muito cuidado, segurança e atenção aos detalhes.',
    highlight: 'atenção aos detalhes',
  },
  {
    name: 'Carol Astolfi Antunes',
    meta: '10 avaliações no Google',
    text: 'Frequento o salão há 3 anos e todas são muito profissionais! Faço unha e sobrancelha com a Edna, maravilhosa! Lugar muito bom!',
    highlight: 'há 3 anos',
  },
]

export const FAQS = [
  {
    q: 'Como faço para agendar um horário?',
    a: 'Você pode agendar direto pelo formulário aqui do site (seção “Agende seu horário”) ou pelo WhatsApp (11) 95407-9852. Respondemos rapidinho e confirmamos o horário com você. Atendemos de terça a sábado, das 9h às 19h.',
  },
  {
    q: 'Quais formas de pagamento vocês aceitam?',
    a: 'Aceitamos cartões de crédito e débito, pagamentos por aproximação (NFC/celular), Pix e dinheiro. O Wi-Fi do salão é gratuito para clientes.',
  },
  {
    q: 'Preciso levar algum material para as unhas?',
    a: 'Não! Trabalhamos com materiais profissionais esterilizados. Se você tiver um esmalte queridinho ou alergias a algum produto, pode trazer ou nos avisar — cuidamos de tudo com segurança.',
  },
  {
    q: 'Quanto tempo dura a extensão de cílios?',
    a: 'Em média de 3 a 4 semanas, dependendo dos cuidados e do ciclo natural dos fios. Recomendamos manutenção a cada 2–3 semanas para manter o volume sempre bonito. Enviamos as orientações de cuidado após o procedimento.',
  },
  {
    q: 'Posso remarcar ou cancelar um horário?',
    a: 'Claro! Pedimos apenas que avise com pelo menos 4 horas de antecedência pelo WhatsApp, assim conseguimos oferecer o horário para outra cliente. Sem burocracia e sem taxa.',
  },
  {
    q: 'Onde fica o salão e como chego?',
    a: 'Estamos na Rua João de Deus, 397 — Bela Vista, Osasco/SP (CEP 06060-210). O mapa na seção de contato abre a rota direto no seu celular. Ficamos pertinho do centro de Osasco.',
  },
  {
    q: 'Vocês atendem noivas e grupos?',
    a: 'Sim! Fazemos produção de noivas (com prova de make) e atendemos grupos para festas e formaturas. Fale com a gente pelo WhatsApp para montar um pacote especial com horários reservados.',
  },
]

export const NAV_LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'O salão' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'avaliacoes', label: 'Avaliações' },
  { id: 'contato', label: 'Contato' },
  { id: 'faq', label: 'Dúvidas' },
]

export const fmtPrice = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })