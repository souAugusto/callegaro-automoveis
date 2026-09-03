// Camada de persistência das Informações do Site, isolada do resto do
// admin de propósito.
//
// TODO: plugar um banco real aqui (ex: uma tabela `site_settings` no
// Supabase, no mesmo projeto já usado por carros — ver lib/db.ts e
// supabase/migrations/ para o padrão já estabelecido). Hoje esta função
// não persiste nada de fato: ela só valida e devolve os dados, e o
// formulário em components/admin/site-info-form.tsx continua carregando
// os valores iniciais de lib/site-config.ts a cada carregamento da página.
// Depois de plugar o banco, o formulário deve passar a carregar os
// valores iniciais de lá em vez do arquivo estático.

export interface SiteInfoInput {
  name: string
  description: string
  phone: string
  whatsapp: string
  email: string
  street: string
  neighborhood: string
  city: string
  state: string
  zip: string
  lat: number
  lng: number
  hours: { days: string; time: string }[]
  instagram: string
  facebook: string
}

export async function saveSiteInfo(input: SiteInfoInput): Promise<void> {
  // TODO: substituir por um INSERT/UPDATE real assim que houver uma
  // tabela de configurações do site. Por enquanto, isso é só um stub.
  console.log('[saveSiteInfo] TODO: persistir no banco. Dados recebidos:', input)
}
