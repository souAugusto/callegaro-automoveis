'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { DURATION, EASE_PREMIUM } from '@/lib/motion'

export function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: DURATION.reveal, delay, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  )
}
