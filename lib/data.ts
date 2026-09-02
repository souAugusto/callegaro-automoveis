// Camada de dados mockados em memória.
// TODO: conectar a um banco de dados real (ex: Supabase) e substituir estes
// arrays por consultas. Cada função abaixo é o ponto de integração.

import { SITE_NAME, site } from './site'

export type CarStatus = 'Disponível' | 'Reservado' | 'Vendido'
export type Transmission = 'Manual' | 'Automático'
export type Fuel = 'Flex' | 'Gasolina' | 'Diesel'

export interface Car {
  id: string
  slug: string
  brand: string
  model: string
  version: string
  year: number
  km: number
  color: string
  transmission: Transmission
  fuel: Fuel
  doors: number
  price: number
  images: string[]
  status: CarStatus
  featured: boolean
  isFlagship: boolean
  description: string
}

export type LeadStatus = 'Novo' | 'Em contato' | 'Negociando' | 'Vendido' | 'Perdido'

export interface Lead {
  id: string
  name: string
  phone: string
  origin: string
  carInterest: string
  status: LeadStatus
  createdAt: string // ISO
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  cover: string
  author: string
  date: string // ISO
  content: string // markdown-like simples (parágrafos separados por \n\n)
}

/* ------------------------------------------------------------------ */
/* Carros                                                              */
/* ------------------------------------------------------------------ */

export const cars: Car[] = [
  {
    id: 'car-1',
    slug: 'vw-gol-1-6-2015',
    brand: 'Volkswagen',
    model: 'Gol',
    version: '1.6 Comfortline',
    year: 2015,
    km: 78000,
    color: 'Prata',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 39900,
    images: ['/cars/vw-gol.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: false,
    description:
      'Volkswagen Gol 1.6 Comfortline completo, revisado e com pneus novos. Econômico, espaçoso e pronto para rodar. Aceitamos seu usado na troca e temos financiamento facilitado.',
  },
  {
    id: 'car-2',
    slug: 'fiat-uno-1-0-2014',
    brand: 'Fiat',
    model: 'Uno',
    version: '1.0 Vivace',
    year: 2014,
    km: 92000,
    color: 'Branco',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 28900,
    images: ['/cars/fiat-uno.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: false,
    description:
      'Fiat Uno Vivace 1.0, o popular ideal para o dia a dia e para quem busca economia. Baixo custo de manutenção e ótimo primeiro carro. Documentação em dia.',
  },
  {
    id: 'car-3',
    slug: 'chevrolet-onix-1-4-2018',
    brand: 'Chevrolet',
    model: 'Onix',
    version: '1.4 LT',
    year: 2018,
    km: 54000,
    color: 'Vermelho',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 54900,
    images: ['/cars/chevrolet-onix.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: true,
    description:
      'Chevrolet Onix 1.4 LT, um dos carros mais vendidos do Brasil. Multimídia, direção elétrica e excelente estado de conservação. Único dono, revisões em concessionária.',
  },
  {
    id: 'car-4',
    slug: 'ford-ka-1-0-2016',
    brand: 'Ford',
    model: 'Ka',
    version: '1.0 SE',
    year: 2016,
    km: 68000,
    color: 'Preto',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 42900,
    images: ['/cars/ford-ka.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: false,
    description:
      'Ford Ka 1.0 SE completo, design moderno e ótimo espaço interno. Ar-condicionado gelando, ideal para cidade e estrada. Financiamento com aprovação rápida.',
  },
  {
    id: 'car-5',
    slug: 'renault-sandero-1-6-2017',
    brand: 'Renault',
    model: 'Sandero',
    version: '1.6 Expression',
    year: 2017,
    km: 61000,
    color: 'Cinza',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 46900,
    images: ['/cars/renault-sandero.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: false,
    description:
      'Renault Sandero 1.6 Expression, um dos hatchs mais espaçosos da categoria. Porta-malas gigante, muito confortável e econômico. Aceita troca.',
  },
  {
    id: 'car-6',
    slug: 'hyundai-hb20-1-0-2019',
    brand: 'Hyundai',
    model: 'HB20',
    version: '1.0 Comfort Plus',
    year: 2019,
    km: 47000,
    color: 'Azul',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 61900,
    images: ['/cars/hyundai-hb20.png'],
    status: 'Disponível',
    featured: true,
    isFlagship: false,
    description:
      'Hyundai HB20 1.0 Comfort Plus, moderno, econômico e com baixa quilometragem. Multimídia, sensor de ré e garantia de procedência. Realize o sonho do carro seminovo.',
  },
  {
    id: 'car-7',
    slug: 'vw-fox-1-0-2013',
    brand: 'Volkswagen',
    model: 'Fox',
    version: '1.0 Trend',
    year: 2013,
    km: 105000,
    color: 'Prata',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 32900,
    images: ['/cars/vw-fox.png'],
    status: 'Reservado',
    featured: false,
    isFlagship: false,
    description:
      'Volkswagen Fox 1.0 Trend, alto, espaçoso e muito econômico. Perfeito para família. Mecânica revisada e pronto para transferir.',
  },
  {
    id: 'car-8',
    slug: 'fiat-palio-1-0-2012',
    brand: 'Fiat',
    model: 'Palio',
    version: '1.0 Attractive',
    year: 2012,
    km: 118000,
    color: 'Vermelho',
    transmission: 'Manual',
    fuel: 'Flex',
    doors: 4,
    price: 29900,
    images: ['/cars/fiat-palio.png'],
    status: 'Disponível',
    featured: false,
    isFlagship: false,
    description:
      'Fiat Palio 1.0 Attractive, excelente custo-benefício e baixo consumo. Ótima opção de entrada com parcelas que cabem no bolso. Documentação segura.',
  },
]

/* ------------------------------------------------------------------ */
/* Leads                                                               */
/* ------------------------------------------------------------------ */

export const leads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Marcos Vieira',
    phone: '(51) 98111-2233',
    origin: 'WhatsApp',
    carInterest: 'Chevrolet Onix 1.4 LT',
    status: 'Novo',
    createdAt: daysAgo(1),
  },
  {
    id: 'lead-2',
    name: 'Juliana Souza',
    phone: '(51) 98222-3344',
    origin: 'Formulário do site',
    carInterest: 'Hyundai HB20 1.0',
    status: 'Em contato',
    createdAt: daysAgo(2),
  },
  {
    id: 'lead-3',
    name: 'Rafael Lima',
    phone: '(51) 98333-4455',
    origin: 'Instagram',
    carInterest: 'VW Gol 1.6',
    status: 'Negociando',
    createdAt: daysAgo(3),
  },
  {
    id: 'lead-4',
    name: 'Patrícia Gomes',
    phone: '(51) 98444-5566',
    origin: 'WhatsApp',
    carInterest: 'Fiat Uno 1.0',
    status: 'Vendido',
    createdAt: daysAgo(6),
  },
  {
    id: 'lead-5',
    name: 'Anderson Rocha',
    phone: '(51) 98555-6677',
    origin: 'Indicação',
    carInterest: 'Renault Sandero 1.6',
    status: 'Novo',
    createdAt: daysAgo(6),
  },
  {
    id: 'lead-6',
    name: 'Camila Fernandes',
    phone: '(51) 98666-7788',
    origin: 'Formulário do site',
    carInterest: 'Ford Ka 1.0',
    status: 'Perdido',
    createdAt: daysAgo(12),
  },
]

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export const posts: Post[] = [
  {
    id: 'post-1',
    slug: 'manutencao-preventiva-do-carro',
    title: 'Manutenção preventiva: o segredo para o carro durar mais',
    excerpt:
      'Pequenos cuidados no dia a dia evitam grandes dores de cabeça (e gastos) no futuro. Veja o checklist essencial da Callegaro Automóveis.',
    cover: '/blog/manutencao-preventiva.png',
    author: 'Equipe Callegaro Automóveis',
    date: daysAgo(4),
    content: `Manter o carro em dia não é luxo, é economia. A manutenção preventiva é aquela que você faz antes de o problema aparecer, evitando que uma peça barata comprometa um conjunto caro.

O primeiro ponto de atenção é o óleo do motor. Verifique o nível pelo menos uma vez por mês e respeite o intervalo de troca indicado no manual, geralmente entre 5.000 e 10.000 km. Óleo velho perde a capacidade de lubrificar e acelera o desgaste do motor.

Fique de olho também nos itens de segurança: pastilhas e discos de freio, pneus e suspensão. Pneus carecas ou calibrados de forma errada aumentam o consumo de combustível e o risco de acidentes. O ideal é calibrar a cada 15 dias, sempre com os pneus frios.

Não ignore os ruídos e luzes do painel. Um barulho novo ao frear ou uma luz acesa é o carro pedindo atenção. Quanto antes você levar a um profissional de confiança, menor tende a ser o custo do reparo.

Por fim, mantenha um histórico das revisões. Além de garantir a segurança da família, um carro com manutenção documentada vale mais na hora da revenda. Na ${SITE_NAME}, todos os nossos seminovos passam por uma checagem completa antes de irem para a loja.`,
  },
  {
    id: 'post-2',
    slug: 'como-conseguir-financiamento-consignado',
    title: 'Como conseguir financiamento consignado para o seu carro',
    excerpt:
      'O crédito consignado pode ser uma porta de entrada para sair de carro novo com parcelas menores. Entenda como funciona.',
    cover: '/blog/financiamento-consignado.png',
    author: `Equipe ${site.shortName}`,
    date: daysAgo(8),
    content: `O financiamento consignado é aquele em que a parcela é descontada diretamente da folha de pagamento ou do benefício do INSS. Por ter menos risco de inadimplência para o banco, ele costuma oferecer juros mais baixos do que o financiamento tradicional de veículos.

Para conseguir, o primeiro passo é verificar se a sua categoria tem convênio: servidores públicos, aposentados e pensionistas do INSS e funcionários de empresas conveniadas são os públicos mais comuns. Vale confirmar também qual a sua margem consignável disponível, ou seja, quanto do seu salário ainda pode ser comprometido.

Com a margem em mãos, simule o valor da parcela antes de escolher o carro. Assim você define uma faixa de preço realista e evita comprometer o orçamento. Lembre-se: uma boa compra é aquela cuja parcela cabe tranquilamente no seu bolso.

Separe os documentos com antecedência: identidade, CPF, comprovante de renda e de residência costumam ser suficientes. Quanto mais organizada a documentação, mais rápida é a aprovação.

Na ${SITE_NAME} nós ajudamos você a encontrar a melhor linha de crédito, incluindo o consignado, e cuidamos de toda a burocracia. Fale com a nossa equipe e descubra as condições para o seu perfil.`,
  },
  {
    id: 'post-3',
    slug: 'dicas-para-comprar-o-primeiro-carro',
    title: '7 dicas para comprar o seu primeiro carro sem erro',
    excerpt:
      'Comprar o primeiro carro é um momento especial. Para não errar, separamos dicas práticas de quem vive o mercado todos os dias.',
    cover: '/blog/primeiro-carro.png',
    author: `Equipe ${site.shortName}`,
    date: daysAgo(15),
    content: `Comprar o primeiro carro é a realização de um sonho, mas exige planejamento para não virar dor de cabeça. A primeira dica é definir o orçamento total, e não apenas o valor do carro: inclua documentação, seguro, IPVA e manutenção.

A segunda dica é escolher um modelo popular. Carros como Gol, Uno, Onix e HB20 têm peças acessíveis, mão de obra barata e boa revenda. Para quem está começando, isso faz muita diferença no bolso.

Terceiro: priorize a procedência. Compre de uma loja de confiança, que apresente o histórico do veículo e a documentação regularizada. Desconfie de preços muito abaixo do mercado.

Quarto: faça uma vistoria. Leve o carro a um mecânico de confiança ou compre de quem já entrega o veículo revisado. Confira pneus, freios, suspensão e sinais de batida.

Quinto: teste o carro. Dirija em diferentes situações, sinta os freios, o câmbio e escute o motor. O carro precisa ser confortável para o seu dia a dia.

Sexto: negocie com calma. Pesquise o preço de tabela e use isso a seu favor. Uma boa loja vai ser transparente sobre o valor.

Sétimo: planeje o financiamento. Dê a maior entrada possível e escolha um prazo que não comprometa o orçamento. Na ${SITE_NAME}, orientamos cada cliente para que a primeira compra seja segura e tranquila.`,
  },
  {
    id: 'post-4',
    slug: 'documentacao-e-transferencia-de-veiculo',
    title: 'Documentação e transferência de veículo: guia completo',
    excerpt:
      'Comprou um seminovo? Saiba exatamente quais documentos você precisa e como transferir o carro para o seu nome com segurança.',
    cover: '/blog/documentacao-transferencia.png',
    author: `Equipe ${site.shortName}`,
    date: daysAgo(20),
    content: `Transferir um veículo para o seu nome é obrigatório e, quando feito da forma certa, é simples. O prazo legal é de 30 dias a partir da compra para evitar multas.

O documento central é o CRV (Certificado de Registro de Veículo), o antigo DUT. Nele, o vendedor preenche os dados do comprador e reconhece firma da assinatura em cartório. Hoje muitos estados já utilizam a versão digital (ATPV-e), que agiliza o processo.

Antes de fechar negócio, confirme se o veículo está sem débitos: IPVA, licenciamento, multas e eventuais restrições ou financiamentos em aberto. Um carro com pendências pode impedir a transferência.

O comprador precisa providenciar vistoria do veículo, pagamento das taxas do Detran e, em alguns casos, do ITBI veicular. Com tudo pago e a documentação preenchida, o registro é atualizado e o novo CRV sai no nome do comprador.

A boa notícia: ao comprar na ${SITE_NAME}, a nossa equipe cuida de toda a documentação e transferência para você. Entregamos o carro com a papelada em dia e total segurança jurídica, para você só se preocupar em aproveitar a estrada.`,
  },
]

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })
}

export function formatKm(km: number): string {
  return `${km.toLocaleString('pt-BR')} km`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

// TODO: substituir por SELECT ... WHERE featured = true
export function getFeaturedCars(excludeId?: string): Car[] {
  return cars.filter((c) => c.featured && c.id !== excludeId).slice(0, 6)
}

// TODO: substituir por SELECT ... WHERE is_flagship = true LIMIT 1
export function getFlagshipCar(): Car | undefined {
  return cars.find((c) => c.isFlagship) ?? cars.find((c) => c.featured) ?? cars[0]
}

// TODO: substituir por SELECT ... WHERE slug = ?
export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug)
}

// TODO: substituir por SELECT ... WHERE slug = ?
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/* ------------------------------------------------------------------ */
/* CRUD mockado em memória (painel admin).                            */
/* TODO: substituir por operações reais de banco de dados.            */
/* ------------------------------------------------------------------ */

export function getCarById(id: string): Car | undefined {
  return cars.find((c) => c.id === id)
}

export function addCar(input: Omit<Car, 'id' | 'slug'>): Car {
  const car: Car = {
    ...input,
    id: `car-${Date.now()}`,
    slug: slugify(`${input.brand}-${input.model}-${input.version}-${input.year}`),
  }
  cars.unshift(car)
  return car
}

export function updateCar(id: string, input: Omit<Car, 'id' | 'slug'>): Car | undefined {
  const car = getCarById(id)
  if (!car) return undefined
  Object.assign(car, input)
  return car
}

export function deleteCar(id: string): void {
  const index = cars.findIndex((c) => c.id === id)
  if (index !== -1) cars.splice(index, 1)
}

// Garante que só um carro por vez seja o carro-chefe da home.
export function setFlagshipCar(id: string): void {
  for (const c of cars) c.isFlagship = c.id === id
}

export function getPostById(id: string): Post | undefined {
  return posts.find((p) => p.id === id)
}

export function addPost(input: Omit<Post, 'id' | 'slug'>): Post {
  const post: Post = {
    ...input,
    id: `post-${Date.now()}`,
    slug: slugify(input.title),
  }
  posts.unshift(post)
  return post
}

export function updatePost(id: string, input: Omit<Post, 'id' | 'slug'>): Post | undefined {
  const post = getPostById(id)
  if (!post) return undefined
  Object.assign(post, input)
  return post
}

export function deletePost(id: string): void {
  const index = posts.findIndex((p) => p.id === id)
  if (index !== -1) posts.splice(index, 1)
}

export function getLeadById(id: string): Lead | undefined {
  return leads.find((l) => l.id === id)
}

export function addLead(input: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
  const lead: Lead = {
    ...input,
    id: `lead-${Date.now()}`,
    status: 'Novo',
    createdAt: new Date().toISOString(),
  }
  leads.unshift(lead)
  return lead
}

export function updateLeadStatus(id: string, status: LeadStatus): void {
  const lead = getLeadById(id)
  if (lead) lead.status = status
}

export function deleteLead(id: string): void {
  const index = leads.findIndex((l) => l.id === id)
  if (index !== -1) leads.splice(index, 1)
}

export const carBrands = Array.from(new Set(cars.map((c) => c.brand))).sort()
export const transmissions: Transmission[] = ['Manual', 'Automático']
export const fuels: Fuel[] = ['Flex', 'Gasolina', 'Diesel']
export const leadStatuses: LeadStatus[] = [
  'Novo',
  'Em contato',
  'Negociando',
  'Vendido',
  'Perdido',
]
export const carStatuses: CarStatus[] = ['Disponível', 'Reservado', 'Vendido']
