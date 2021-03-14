import React, { useState } from 'react'
import { motion } from 'framer-motion'

import styles from './styles.module.css'

interface OptionProps {
  title: string
  index: number
  mouseOver: (index: number) => void
  mouseLeave: () => void
}

const Option = ({ title, index, mouseOver, mouseLeave }: OptionProps) => {
  const [rotating, setRotating] = useState(false)

  const mouseOverHandler = () => {
    setRotating(true)
    mouseOver(index)
  }
  const mouseLeaveHandler = () => {
    setRotating(false)
    mouseLeave()
  }

  return (
    <li className={styles.option}>
      <div onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler}>
        <motion.p
          animate={{
            rotateZ: rotating ? 5 : 0,
            y: rotating ? -35 : 0
          }}
          transition={{ duration: 0.35 }}
        >
          {title}
        </motion.p>
      </div>
    </li>
  )
}

export default React.memo(Option)