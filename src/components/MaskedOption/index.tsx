import React, { useCallback, useEffect, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'

import styles from './styles.module.css'

interface MaskedOptionProps {
  title: string
  isActive: boolean
}

const MaskedOption = ({ title, isActive }: MaskedOptionProps) => {
  const liRef = useRef<HTMLLIElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMovement = useCallback((event: MouseEvent) => {
    if (!liRef || !liRef.current || !isActive)
      return

    const { x: liX, y: liY, width, height } = liRef.current.getBoundingClientRect()
    x.set((event.pageX - (liX + width / 2)) * 0.2)
    y.set((event.pageY - (liY + height / 2)) * 0.2)
  }, [x, y, isActive])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMovement)
    return () => document.removeEventListener('mousemove', handleMouseMovement)
  }, [handleMouseMovement])

  return (
    <li className={styles.option} ref={liRef}>
      <div>
        <motion.p
          style={{ x, y }}
          animate={{
            rotateZ: isActive ? 0 : 5,
            y: isActive ? 0 : 35
          }}
          transition={{ duration: 0.35 }}
          className={styles.maskedText}
        >
          {title}
        </motion.p>
      </div>
    </li>
  )
}

export default React.memo(MaskedOption)