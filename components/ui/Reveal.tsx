"use client"

import { motion, useAnimation, type HTMLMotionProps } from "framer-motion"
import { useEffect, useRef, useState } from "react"

type Props = HTMLMotionProps<"div"> & {
  y?: number
  delay?: number
  once?: boolean
}

export default function Reveal({ y = 12, delay = 0, once = true, children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut", delay } })
          if (once) setSeen(true)
        } else if (!once || !seen) {
          controls.set({ opacity: 0, y })
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [controls, delay, once, seen, y])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={controls} {...rest}>
      {children}
    </motion.div>
  )
}
