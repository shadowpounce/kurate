import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './DrawableLine.module.scss'
import clsx from 'clsx'

interface IProps {
  anim: boolean
  children: ReactNode
}

export const DrawableLine: FC<IProps> = ({ anim, children }) => {
  const [animated, setAnimated] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (anim && !animated && ref.current) {
      ref.current.classList.add(`${styles.animated}`)
      setAnimated(true)
    }
  }, [anim, animated])

  return (
    <div ref={ref} className={styles.drawableLine}>
      {children}
    </div>
  )
}
