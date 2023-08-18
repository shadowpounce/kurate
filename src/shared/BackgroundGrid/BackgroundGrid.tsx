import { useContext, useEffect, useRef, useState } from 'react'
import styles from './BackgroundGrid.module.scss'
import MouseFollower from 'mouse-follower'
import { MainContext } from '../../app/providers/MainContext'
import clsx from 'clsx'

export const BackgroundGrid = () => {
  const { pageLoaded, activeScreen } = useContext(MainContext)
  const [init, setInit] = useState<boolean>(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!init) {
      const cursorGrid = new MouseFollower({
        el: cursorRef.current,
        speed: 0.1,
      })

      setInit(true)
    }
  }, [init])

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${
        window.innerWidth / 2
      }px,${window.innerHeight / 2}px)`
    }
  }, [])

  return (
    <div className={styles.backgroundGrid}>
      <div
        ref={cursorRef}
        className={clsx(
          styles.cursorFollower,
          activeScreen === 3 && styles.hidden,
          activeScreen === 4 && styles.hidden,
          activeScreen === 5 && styles.hidden,
          activeScreen === 6 && styles.hidden
        )}
      >
        <div></div>
      </div>
      <div
        className={clsx(
          styles.grid,
          activeScreen === 3 && styles.hidden,
          activeScreen === 4 && styles.hidden,
          activeScreen === 5 && styles.hidden,
          activeScreen === 6 && styles.hidden
        )}
      ></div>
    </div>
  )
}
