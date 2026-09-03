'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { DURATION, EASE_PREMIUM } from '@/lib/motion'

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.page, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  )
}
