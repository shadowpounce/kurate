import { useEffect, useRef, useState } from 'react'
import styles from './Cursor.module.scss'
import MouseFollower from 'mouse-follower'

export const Cursor = () => {
  const [init, setInit] = useState<boolean>(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!init) {
      const cursor = new MouseFollower({
        el: cursorRef.current,
        speed: 0.1,
      })

      setInit(true)
    }
  }, [init])

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <div></div>
    </div>
  )
}
