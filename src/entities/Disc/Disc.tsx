import clsx from 'clsx'
import styles from './Disc.module.scss'

export const Disc = () => {
  return (
    <div className={styles.disc}>
      <div className={clsx(styles.piece, styles.middle)}>
        <img src="/images/Disc/middle.png" alt="" />
      </div>
      <div className={clsx(styles.piece, styles.side)}>
        <img src="/images/Disc/side.png" alt="" />
      </div>
      <div className={clsx(styles.piece, styles.side)}>
        <img src="/images/Disc/side.png" alt="" />
      </div>
      <div className={clsx(styles.piece, styles.lastSide)}>
        <img src="/images/Disc/last-side.png" alt="" />
      </div>
      <div className={clsx(styles.piece, styles.lastSide)}>
        <img src="/images/Disc/last-side.png" alt="" />
      </div>
    </div>
  )
}
