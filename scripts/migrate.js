// Executa os arquivos .sql em supabase/migrations contra o banco em DATABASE_URL.
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
  console.log(`connected — applying ${files.length} migration(s)`);

  try {
    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
      console.log(`applying ${file}...`);
      await client.query(sql);
      console.log(`  ok`);
    }
    console.log('all migrations applied successfully');
  } catch (err) {
    console.error('MIGRATION ERROR:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
})();
