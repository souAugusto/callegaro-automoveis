-- Schema inicial: carros e leads.
-- Espelha os campos já usados em lib/data.ts e nos filtros da página de estoque.

create extension if not exists pgcrypto;

create table if not exists cars (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  brand text not null,
  model text not null,
  version text not null,
  year integer not null,
  km integer not null,
  color text not null,
  transmission text not null check (transmission in ('Manual', 'Automático')),
  fuel text not null check (fuel in ('Flex', 'Gasolina', 'Diesel')),
  doors integer not null,
  price numeric not null,
  images text[] not null default '{}',
  status text not null default 'Disponível'
    check (status in ('Disponível', 'Reservado', 'Vendido')),
  featured boolean not null default false,
  is_flagship boolean not null default false,
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Garante que só um carro por vez seja o carro-chefe da home.
create unique index if not exists one_flagship_car
  on cars ((is_flagship))
  where is_flagship = true;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  origin text not null,
  car_interest text not null,
  status text not null default 'Novo'
    check (status in ('Novo', 'Em contato', 'Negociando', 'Vendido', 'Perdido')),
  created_at timestamptz not null default now()
);

alter table cars enable row level security;
alter table leads enable row level security;

-- Qualquer visitante pode ler o estoque (página de estoque e home).
create policy "cars_public_read" on cars
  for select using (true);

-- Qualquer visitante pode enviar o formulário de contato (cria um lead).
create policy "leads_public_insert" on leads
  for insert with check (true);

-- Sem políticas de update/delete para o público: só o service_role
-- (usado nos Server Actions do admin, que roda só no servidor) pode
-- alterar carros e ler/editar leads, já que ele ignora o RLS.
