import { FC, useContext, useEffect, useRef, useState } from 'react'
import styles from './Cross.module.scss'
import { MainContext } from '../../app/providers/MainContext'
import clsx from 'clsx'
import { preloader } from '../../widgets/Preloader/function'

interface IProps {
  activeId?: number
  preloaderAnim?: boolean
}

export const Cross: FC<IProps> = ({ activeId, preloaderAnim }) => {
  const { activeScreen, pageLoaded } = useContext(MainContext)

  const ref = useRef<HTMLDivElement>(null)

  const [animated, setAnimated] = useState<boolean>(false)

  useEffect(() => {
    if (pageLoaded && !animated) {
      if (ref.current) {
        if (activeScreen === activeId) {
          ref.current.classList.add(styles.animated)
          setAnimated(true)
        }
      }
    }
  }, [animated, activeScreen, activeId, pageLoaded])

  useEffect(() => {
    if (preloaderAnim && ref.current) {
      ref.current.classList.add(styles.animated)
      setAnimated(true)
    }
  }, [preloaderAnim])

  return (
    <div ref={ref} className={styles.cross}>
      <svg
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.8018 18.1299V8.67879C16.8018 4.61903 13.5107 1.32794 9.45091 1.32794H-0.000183105"
          stroke="white"
          strokeWidth="1.57518"
        />
      </svg>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.801758 0V9.45109C0.801758 13.5109 4.09284 16.8019 8.15261 16.8019H17.6037"
          stroke="white"
          strokeWidth="1.57518"
        />
      </svg>
    </div>
  )
}
