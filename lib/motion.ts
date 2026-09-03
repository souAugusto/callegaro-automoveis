// Curva de easing e durações padrão das animações do site, para manter
// uma sensação coesa entre hovers, scroll-reveal e transições de página.

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

/** Classe Tailwind equivalente, para transições puramente em CSS (hover). */
export const EASE_CLASS = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

export const DURATION = {
  /** Hover de cards: sombra, elevação, borda. */
  hover: 0.5,
  /** Zoom de imagem e brilho deslizante. */
  zoom: 0.7,
  /** Entrada de seções/cards conforme o scroll. */
  reveal: 0.6,
  /** Fade entre páginas. */
  page: 0.4,
} as const
