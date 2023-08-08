import { useEffect, useRef, useState } from 'react'
import styles from './BackgroundGrid.module.scss'
import MouseFollower from 'mouse-follower'

export const BackgroundGrid = () => {
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

  return (
    <div className={styles.backgroundGrid}>
      <div ref={cursorRef} className={styles.cursorFollower}>
        <div></div>
      </div>
      <div className={styles.grid}></div>
    </div>
  )
}
