'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cookie-consent'

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== 'accepted') {
        setVisible(true)
      }
    } catch {
      // localStorage indisponível (ex: navegação privada) — não bloqueia o site.
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      // ignora falha de storage, apenas fecha o aviso nesta sessão
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          Usamos cookies para melhorar sua experiência de navegação. Ao
          continuar navegando, você concorda com nossa{' '}
          <Link
            href="/politica-de-privacidade"
            className="text-brand-yellow hover:underline"
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-xl bg-brand-yellow px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
