// Popula o banco com os dados de exemplo que estavam em lib/data.ts.
// Uso: node scripts/seed.js

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const envPath = path.join(__dirname, '..', '.env.local');
for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
  if (!line.includes('=') || line.trim().startsWith('#')) continue;
  const idx = line.indexOf('=');
  const key = line.slice(0, idx).trim();
  const value = line.slice(idx + 1).trim();
  if (key) process.env[key] = value;
}

const cars = [
  {
    slug: 'vw-gol-1-6-2015', brand: 'Volkswagen', model: 'Gol', version: '1.6 Comfortline',
    year: 2015, km: 78000, color: 'Prata', transmission: 'Manual', fuel: 'Flex', doors: 4,
    price: 39900, images: ['/cars/vw-gol.png'], status: 'Disponível', featured: true, is_flagship: false,
    description: 'Volkswagen Gol 1.6 Comfortline completo, revisado e com pneus novos. Econômico, espaçoso e pronto para rodar. Aceitamos seu usado na troca e temos financiamento facilitado.',
  },
  {
    slug: 'fiat-uno-1-0-2014', brand: 'Fiat', model: 'Uno', version: '1.0 Vivace',
    year: 2014, km: 92000, color: 'Branco', transmission: 'Manual', fuel: 'Flex', doors: 4,
    price: 28900, images: ['/cars/fiat-uno.png'], status: 'Disponível', featured: true, is_flagship: false,
    description: 'Fiat Uno Vivace 1.0, o popular ideal para o dia a dia e para quem busca economia. Baixo custo de manutenção e ótimo primeiro carro. Documentação em dia.',
  },
  {
    slug: 'chevrolet-onix-1-4-2018', brand: 'Chevrolet', model: 'Onix', version: '1.4 LT',
    year: 2018, km: 54000, color: 'Vermelho', transmission: 'Manual', fuel: 'Flex', doors: 4,
    price: 54900, images: ['/cars/chevrolet-onix.png'], status: 'Disponível', featured: true, is_flagship: true,
    description: 'Chevrolet Onix 1.4 LT, um dos carros mais vendidos do Brasil. Multimídia, direção elétrica e excelente estado de conservação. Único dono, revisões em concessionária.',
  },
  {
    slug: 'ford-ka-1-0-2016', brand: 'Ford', model: 'Ka', version: '1.0 SE',
    year: 2016, km: 68000, color: 'Preto', transmission: 'Manual', fuel: 'Flex', doors: 4,
    price: 42900, images: ['/cars/ford-ka.png'], status: 'Disponível', featured: true, is_flagship: false,
    description: 'Ford Ka 1.0 SE completo, design moderno e ótimo espaço interno. Ar-condicionado gelando, ideal para cidade e estrada. Financiamento com aprovação rápida.',
  },
  {
    slug: 'renault-sandero-1-6-2017', brand: 'Renault', model: 'Sandero', version: '1.6 Expression',
    year: 2017, km: 61000, color: 'Cinza', transmission: 'Manual', fuel: 'Flex', doors: 4,
    price: 46900, images: ['/cars/renault-sandero.png'], status: 'Disponível', featured: true, is_flagship: false,
    description: 'Renault Sandero 1.6 Expression, um dos hatchs mais espaçosos da categoria. Porta-malas gigante, muito confortável e econômico. Aceita troca.',
  },
  {
    slug: 'hyundai-hb20-1-0-2019', brand: 'Hyundai', model: 'HB20', version: '1.0 Comfort Plus',
    year: 2019, km: 47000, color: 'Azul', transmission: 'Manual', fuel: 'Flex', doors: 4,
    price: 61900, images: ['/cars/hyundai-hb20.png'], status: 'Disponível', featured: true, is_flagship: false,
    description: 'Hyundai HB20 1.0 Comfort Plus, moderno, econômico e com baixa quilometragem. Multimídia, sensor de ré e garantia de procedência. Realize o sonho do carro seminovo.',
  },
  {
    slug: 'vw-fox-1-0-2013', brand: 'Volkswagen', model: 'Fox', version: '1.0 Trend',
    year: 2013, km: 105000, color: 'Prata', transmission: 'Manual', fuel: 'Flex', doors: 4,
    price: 32900, images: ['/cars/vw-fox.png'], status: 'Reservado', featured: false, is_flagship: false,
    description: 'Volkswagen Fox 1.0 Trend, alto, espaçoso e muito econômico. Perfeito para família. Mecânica revisada e pronto para transferir.',
  },
  {
    slug: 'fiat-palio-1-0-2012', brand: 'Fiat', model: 'Palio', version: '1.0 Attractive',
    year: 2012, km: 118000, color: 'Vermelho', transmission: 'Manual', fuel: 'Flex', doors: 4,
    price: 29900, images: ['/cars/fiat-palio.png'], status: 'Disponível', featured: false, is_flagship: false,
    description: 'Fiat Palio 1.0 Attractive, excelente custo-benefício e baixo consumo. Ótima opção de entrada com parcelas que cabem no bolso. Documentação segura.',
  },
];

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

const leads = [
  { name: 'Marcos Vieira', phone: '(51) 98111-2233', origin: 'WhatsApp', car_interest: 'Chevrolet Onix 1.4 LT', status: 'Novo', created_at: daysAgo(1) },
  { name: 'Juliana Souza', phone: '(51) 98222-3344', origin: 'Formulário do site', car_interest: 'Hyundai HB20 1.0', status: 'Em contato', created_at: daysAgo(2) },
  { name: 'Rafael Lima', phone: '(51) 98333-4455', origin: 'Instagram', car_interest: 'VW Gol 1.6', status: 'Negociando', created_at: daysAgo(3) },
  { name: 'Patrícia Gomes', phone: '(51) 98444-5566', origin: 'WhatsApp', car_interest: 'Fiat Uno 1.0', status: 'Vendido', created_at: daysAgo(6) },
  { name: 'Anderson Rocha', phone: '(51) 98555-6677', origin: 'Indicação', car_interest: 'Renault Sandero 1.6', status: 'Novo', created_at: daysAgo(6) },
  { name: 'Camila Fernandes', phone: '(51) 98666-7788', origin: 'Formulário do site', car_interest: 'Ford Ka 1.0', status: 'Perdido', created_at: daysAgo(12) },
];

;(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const { rows: existingCars } = await client.query('select count(*)::int as n from cars');
  const { rows: existingLeads } = await client.query('select count(*)::int as n from leads');
  if (existingCars[0].n > 0 || existingLeads[0].n > 0) {
    console.log(`Tabelas já têm dados (cars=${existingCars[0].n}, leads=${existingLeads[0].n}). Abortando pra não duplicar.`);
    await client.end();
    return;
  }

  for (const c of cars) {
    await client.query(
      `insert into cars (slug, brand, model, version, year, km, color, transmission, fuel, doors, price, images, status, featured, is_flagship, description)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
      [c.slug, c.brand, c.model, c.version, c.year, c.km, c.color, c.transmission, c.fuel, c.doors, c.price, c.images, c.status, c.featured, c.is_flagship, c.description],
    );
  }
  console.log(`${cars.length} carros inseridos`);

  for (const l of leads) {
    await client.query(
      `insert into leads (name, phone, origin, car_interest, status, created_at) values ($1,$2,$3,$4,$5,$6)`,
      [l.name, l.phone, l.origin, l.car_interest, l.status, l.created_at],
    );
  }
  console.log(`${leads.length} leads inseridos`);

  await client.end();
  console.log('seed concluído');
})();
