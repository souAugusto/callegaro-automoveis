import 'server-only'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    'Faltam as variáveis de ambiente do Supabase (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).',
  )
}

// Cliente usado nos Server Components e Server Actions (roda só no
// servidor). Usa a chave secreta, que ignora o RLS — a autorização do
// admin já é garantida pelo cookie de sessão em lib/auth.ts.
// Sem opções de fetch customizadas: as consultas passam pelo cache padrão
// do Next.js (páginas ficam estáticas/rápidas) e cada Server Action que
// muda dados chama revalidatePath() nas rotas afetadas, invalidando o
// cache na hora certa em vez de desativá-lo por completo.
export const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})
