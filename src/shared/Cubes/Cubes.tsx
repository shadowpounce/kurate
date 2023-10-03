import clsx from 'clsx'
import styles from './Cubes.module.scss'
import { FC, useContext, useEffect } from 'react'
import { MainContext } from '../../app/providers/MainContext'

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
  const { audioPlay, setAudioPlay } = useContext(MainContext)

  // useEffect(() => ,[])

  return (
    <div
      className={clsx(
        styles.scene,
        hovered && styles.hovered,
        audioPlay && hovered && styles.audioPlaying
      )}
    >
      <div className={styles.spectograph}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        className={clsx(
          styles.sceneAction,
          !audioPlay && styles.audioNotPlaying
        )}
      >
        {!audioPlay && hovered && (
          <svg
            className="player-switch-action-button"
            onClick={() => setAudioPlay(true)}
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="12.0001"
              cy="12.4526"
              rx="11.9455"
              ry="12.1351"
              fill="white"
            />
            <path
              d="M8.88281 9.39268V14.608C8.88281 15.6762 10.0436 16.3465 10.9701 15.8124L13.2317 14.51L15.4933 13.202C16.4198 12.668 16.4198 11.3328 15.4933 10.7987L13.2317 9.49077L10.9701 8.18829C10.0436 7.65422 8.88281 8.31908 8.88281 9.39268Z"
              fill="#292D32"
            />
          </svg>
        )}
        {audioPlay && hovered && (
          <svg
            className="player-switch-action-button"
            onClick={() => setAudioPlay(false)}
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="12.0001"
              cy="12.4526"
              rx="11.9455"
              ry="12.1351"
              fill="white"
            />
            <path
              d="M11.4791 15.1315V9.62668C11.4791 9.10406 11.2584 8.89502 10.7009 8.89502H9.29569C8.73824 8.89502 8.51758 9.10406 8.51758 9.62668V15.1315C8.51758 15.6542 8.73824 15.8632 9.29569 15.8632H10.7009C11.2584 15.8632 11.4791 15.6542 11.4791 15.1315Z"
              fill="#292D32"
            />
            <path
              d="M15.4849 15.1315V9.62668C15.4849 9.10406 15.2643 8.89502 14.7068 8.89502H13.3016C12.748 8.89502 12.5234 9.10406 12.5234 9.62668V15.1315C12.5234 15.6542 12.7441 15.8632 13.3016 15.8632H14.7068C15.2643 15.8632 15.4849 15.6542 15.4849 15.1315Z"
              fill="#292D32"
            />
          </svg>
        )}
      </div>
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
