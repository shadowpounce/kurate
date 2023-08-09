import { useContext, useEffect, useRef, useState } from 'react'
import styles from './BackgroundGrid.module.scss'
import MouseFollower from 'mouse-follower'
import { MainContext } from '../../app/providers/MainContext'

export const BackgroundGrid = () => {
  const { pageLoaded } = useContext(MainContext)
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
    if (pageLoaded && cursorRef.current) {
      cursorRef.current.style.transform = `translate(${
        window.innerWidth / 2
      }px,${window.innerHeight / 2}px)`
    }
  }, [pageLoaded])

  return (
    <div className={styles.backgroundGrid}>
      <div ref={cursorRef} className={styles.cursorFollower}>
        <div></div>
      </div>
      <div className={styles.grid}></div>
    </div>
  )
}
