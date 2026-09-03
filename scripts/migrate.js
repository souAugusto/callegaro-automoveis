// Executa os arquivos .sql em supabase/migrations que ainda não foram
// aplicados (registrados na tabela _migrations), contra o banco em
// DATABASE_URL.
// Uso: node scripts/migrate.js

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

const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();

;(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  await client.query(
    'create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())',
  );
  const { rows } = await client.query('select name from _migrations');
  const applied = new Set(rows.map((r) => r.name));
  const pending = files.filter((f) => !applied.has(f));

  console.log(`connected — ${pending.length} pending migration(s) of ${files.length} total`);

  try {
    for (const file of pending) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
      console.log(`applying ${file}...`);
      await client.query('begin');
      await client.query(sql);
      await client.query('insert into _migrations (name) values ($1)', [file]);
      await client.query('commit');
      console.log(`  ok`);
    }
    console.log(pending.length ? 'all pending migrations applied' : 'nothing to do, already up to date');
  } catch (err) {
    await client.query('rollback').catch(() => {});
    console.error('MIGRATION ERROR:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
})();
