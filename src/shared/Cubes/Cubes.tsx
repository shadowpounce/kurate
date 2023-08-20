import clsx from 'clsx'
import styles from './Cubes.module.scss'
import { FC } from 'react'

interface IProps {
  string?: string
  cover?: string[]
  hovered?: boolean
}

export const Cubes: FC<IProps> = ({
  hovered = true,
  //   string = ['Play music', 'Play music', 'Play music', 'Play music'],
  string = 'Play music',
  //   cover = '/images/Hero/card1.jpg',
  cover = [
    '/images/Hero/card1.jpg',
    '/images/Hero/card2.jpg',
    '/images/Hero/card3_1.jpg',
    '/images/Hero/card3_2.jpg',
  ],
}) => {
  return (
    <div className={clsx(styles.scene, hovered && styles.hovered)}>
      <div className={styles.cube}>
        <div className={clsx(styles.cubeFace, styles.cubeFaceFront)}>
          <span>{string}</span>
          <span>{string}</span>
        </div>
        <div className={clsx(styles.cubeFace, styles.cubeFaceBack)}>
          <span>{string}</span>
          <span>{string}</span>
        </div>
        <div className={clsx(styles.cubeFace, styles.cubeFaceTop)}>
          <span>{string}</span>
          <span>{string} </span>
        </div>
        <div className={clsx(styles.cubeFace, styles.cubeFaceBottom)}>
          <span>{string} </span>
          <span>{string} </span>
        </div>
        <div className={clsx(styles.cubeFace, styles.cubeFaceRight)}></div>
        <div className={clsx(styles.cubeFace, styles.cubeFaceLeft)}></div>
      </div>
      <div className={styles.cube}>
        <div className={clsx(styles.cubeFace, styles.cubeFaceFront)}>
          <img src={cover[0]} alt="" />
        </div>
        <div className={clsx(styles.cubeFace, styles.cubeFaceBack)}>
          <img src={cover[1]} alt="" />
        </div>
        <div className={clsx(styles.cubeFace, styles.cubeFaceTop)}>
          <img src={cover[2]} alt="" />
        </div>
        <div className={clsx(styles.cubeFace, styles.cubeFaceBottom)}>
          <img src={cover[3]} alt="" />
        </div>
        <div className={clsx(styles.cubeFace, styles.cubeFaceRight)}></div>
        <div className={clsx(styles.cubeFace, styles.cubeFaceLeft)}></div>
      </div>
    </div>
  )
}
