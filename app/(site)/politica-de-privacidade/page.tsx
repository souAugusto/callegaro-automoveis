import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/db'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings()
  return {
    title: 'Política de Privacidade',
    description: `Como a ${site.name} coleta, usa e protege os dados dos visitantes deste site, em conformidade com a LGPD.`,
    alternates: {
      canonical: '/politica-de-privacidade',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function PoliticaDePrivacidadePage() {
  const site = await getSiteSettings()

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-yellow">
          Transparência
        </span>
        <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Última atualização: 05/09/2026
        </p>
      </header>

      <div className="space-y-8 rounded-2xl border border-white/10 bg-card p-6 sm:p-8">
        <p className="leading-relaxed text-muted-foreground">
          A {site.name} ("nós") respeita a sua privacidade e está comprometida
          em proteger os dados pessoais dos visitantes deste site, em
          conformidade com a Lei Geral de Proteção de Dados (Lei nº
          13.709/2018 – LGPD).
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Esta Política de Privacidade explica quais informações coletamos,
          como as utilizamos e quais são os seus direitos como titular de
          dados.
        </p>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white">
            1. Quais dados coletamos
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Este site não exige cadastro ou criação de conta para navegação.
            As únicas informações pessoais coletadas são aquelas que você nos
            fornece voluntariamente ao entrar em contato com um de nossos
            vendedores, tais como:
          </p>
          <ul className="list-disc space-y-1 pl-5 leading-relaxed text-muted-foreground marker:text-brand-yellow">
            <li>Nome;</li>
            <li>Telefone/WhatsApp;</li>
            <li>
              Mensagem enviada através do formulário de contato ou botão de
              WhatsApp.
            </li>
          </ul>
          <p className="leading-relaxed text-muted-foreground">
            Também podemos coletar automaticamente dados de navegação por meio
            de cookies, como páginas visitadas, tempo de permanência no site e
            informações do dispositivo/navegador, conforme detalhado na seção
            "Cookies" abaixo.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white">
            2. Para que usamos esses dados
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Os dados fornecidos são utilizados exclusivamente para:
          </p>
          <ul className="list-disc space-y-1 pl-5 leading-relaxed text-muted-foreground marker:text-brand-yellow">
            <li>Possibilitar o contato entre você e nossa equipe de vendas;</li>
            <li>Responder dúvidas sobre os veículos anunciados;</li>
            <li>
              Melhorar a experiência de navegação no site (quando coletados
              via cookies de análise).
            </li>
          </ul>
          <p className="leading-relaxed text-muted-foreground">
            Não utilizamos seus dados para nenhuma outra finalidade além das
            descritas acima, e não os disponibilizamos publicamente.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white">
            3. Compartilhamento de dados
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Não vendemos, alugamos ou compartilhamos seus dados pessoais com
            terceiros para fins comerciais. Seus dados podem ser processados
            por prestadores de serviço que operam a infraestrutura do site
            (como hospedagem e ferramentas de análise de tráfego), sempre com
            o objetivo de manter o funcionamento do site.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-white">Importante:</strong> as informações
            dos veículos anunciados (fotos, descrições, preços e
            disponibilidade) também são publicadas no perfil da {site.name}{' '}
            no Google Meu Negócio, como parte da divulgação comercial do
            nosso estoque. Essa publicação envolve apenas dados dos veículos
            anunciados, e não os seus dados pessoais como visitante do site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white">
            4. Cookies
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Este site utiliza cookies para funcionamento básico e, quando
            aplicável, para análise de tráfego (por exemplo, Google
            Analytics). Cookies são pequenos arquivos armazenados no seu
            navegador que nos ajudam a entender como o site é utilizado.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Ao acessar o site, você pode optar por aceitar ou recusar o uso de
            cookies não essenciais através do aviso exibido na primeira
            visita. Você também pode gerenciar ou desativar cookies
            diretamente nas configurações do seu navegador a qualquer
            momento.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white">
            5. Seus direitos
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Como titular dos dados, você tem direito a, a qualquer momento e
            mediante solicitação:
          </p>
          <ul className="list-disc space-y-1 pl-5 leading-relaxed text-muted-foreground marker:text-brand-yellow">
            <li>Confirmar a existência de tratamento dos seus dados;</li>
            <li>Acessar os dados que temos sobre você;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>Solicitar a exclusão dos seus dados pessoais;</li>
            <li>Revogar o consentimento dado anteriormente.</li>
          </ul>
          <p className="leading-relaxed text-muted-foreground">
            Para exercer qualquer um desses direitos, entre em contato
            conosco pelo telefone{' '}
            <a href={`tel:${site.phoneRaw}`} className="text-brand-yellow hover:underline">
              {site.phone}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white">
            6. Segurança dos dados
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Adotamos medidas técnicas e administrativas razoáveis para
            proteger seus dados pessoais contra acessos não autorizados,
            perda, alteração ou divulgação indevida.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white">
            7. Alterações nesta política
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Esta Política de Privacidade pode ser atualizada periodicamente.
            Recomendamos revisitar esta página de tempos em tempos para se
            manter informado sobre eventuais mudanças.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white">
            8. Contato
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Em caso de dúvidas sobre esta Política de Privacidade ou sobre o
            tratamento dos seus dados, entre em contato:
          </p>
          <ul className="list-disc space-y-1 pl-5 leading-relaxed text-muted-foreground marker:text-brand-yellow">
            <li>
              Telefone/WhatsApp:{' '}
              <a href={`tel:${site.phoneRaw}`} className="text-brand-yellow hover:underline">
                {site.phone}
              </a>
            </li>
            <li>
              {site.name} — {site.address.city}/{site.address.state}
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
