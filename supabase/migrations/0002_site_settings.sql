-- Configurações do site (uma única linha, id fixo 'default'), editável
-- pelo admin em /admin/site-info.

create table if not exists site_settings (
  id text primary key default 'default',
  name text not null,
  description text not null,
  phone text not null,
  whatsapp text not null,
  email text not null,
  street text not null,
  neighborhood text not null default '',
  city text not null,
  state text not null,
  zip text not null default '',
  lat double precision not null,
  lng double precision not null,
  hours jsonb not null default '[]',
  instagram text not null default '',
  facebook text not null default '',
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

-- Leitura pública: o site inteiro (header, rodapé, contato, JSON-LD)
-- lê essa tabela em toda página.
create policy "site_settings_public_read" on site_settings
  for select using (true);

-- Sem política de update/insert para o público: só o service_role
-- (Server Action do admin) pode alterar.
