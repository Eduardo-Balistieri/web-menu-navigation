import React, { useEffect, useCallback, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

import styles from './styles.module.css'
import Option from '../Option'
import MaskedOption from '../MaskedOption'


const MENU_OPTIONS = ['Free Fee', 'Benefits', 'Security']
const CURSOR_SIZE = 30

const Menu = () => {
  const scale = useMotionValue(0)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const [activeMenuOption, setActiveMenuOption] = useState<null | number>(null)

  const mouseMoveHandler = useCallback((event: MouseEvent) => {
    x.set(event.pageX - CURSOR_SIZE)
    y.set(event.pageY - CURSOR_SIZE)
  }, [x, y])


  const mouseWindowMovement = useCallback((entering: boolean) => {
    if (entering)
      animate(scale, 1)
    else
      animate(scale, 0, { duration: 0.1 })
  }, [scale])


  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler)

    document.body.addEventListener('mouseenter', () => mouseWindowMovement(true))
    document.body.addEventListener('mouseleave', () => mouseWindowMovement(false))
  }, [mouseMoveHandler, mouseWindowMovement])


  return (
    <>
      <svg style={{ width: '100%', height: '100%' }}>
        <clipPath id='clip'>
          <motion.circle
            cx={CURSOR_SIZE}
            cy={CURSOR_SIZE}
            r={CURSOR_SIZE / 2}
            style={{
              x,
              y,
              scale,
              originX: `${CURSOR_SIZE}px`,
              originY: `${CURSOR_SIZE}px`
            }}
          />
        </clipPath>

        <foreignObject
          x='0'
          y='0'
          width='100%'
          height='100%'
          clipPath='url(#clip)'
        >
          <div
            style={{ width: '100%', height: '100%', background: '#1D20A4' }}
          >
            <nav className={styles.navBar}>
              {MENU_OPTIONS.map((title, index) => (
                <MaskedOption key={index} title={title} isActive={activeMenuOption === index} />
              ))}
            </nav>
          </div>
        </foreignObject>
      </svg>

      <div style={{ width: '100%', position: 'absolute', top: 0 }}>
        <nav className={styles.navBar}>
          {MENU_OPTIONS.map((title, index) => (
            <Option
              key={index}
              title={title}
              index={index}
              mouseOver={() => {
                setActiveMenuOption(index)
                animate(scale, 5)
              }}
              mouseLeave={() => {
                setActiveMenuOption(null)
                animate(scale, 1)
              }}
            />
          ))}
        </nav>
      </div>
    </>
  )
}

export default Menu