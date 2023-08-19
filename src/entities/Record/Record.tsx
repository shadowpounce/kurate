import { FC, useContext, useEffect } from 'react'
import styles from './Record.module.scss'
import clsx from 'clsx'
import { MainContext } from '../../app/providers/MainContext'

interface IProps {
  idx?: number
  cover: string
  title: string
  artists: string | string[]
  genre: string | string[]
}

export const Record: FC<IProps> = ({ cover, title, artists, genre, idx }) => {
  const { setTrackIndex, trackIndex, audioPlay, setAudioPlay } =
    useContext(MainContext)

  return (
    <div
      style={{
        transitionDelay: `${idx && idx * 0.125 + 0.25}s`,
      }}
      className={clsx(styles.record, 'reveal')}
    >
      <div className={styles.action}>
        <div
          onClick={() => {
            if (trackIndex !== idx) {
              if (audioPlay) {
                setAudioPlay(false)
                setTrackIndex(idx)
                setAudioPlay(true)
              } else {
                setAudioPlay(true)
                setTrackIndex(idx)
              }
            }

            if (trackIndex === idx) {
              if (audioPlay) {
                setAudioPlay(false)
              } else {
                setAudioPlay(true)
              }
            }
          }}
          className={clsx(
            styles.icon,
            idx === trackIndex && audioPlay && styles.active
          )}
        >
          <svg
            className={styles.play}
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.6">
              <circle
                cx="15.051"
                cy="15.4583"
                r="14.301"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M12 12.7852V17.6208C12 18.6112 13.0763 19.2327 13.9353 18.7375L16.0322 17.5299L18.1292 16.3172C18.9882 15.822 18.9882 14.584 18.1292 14.0888L16.0322 12.8761L13.9353 11.6685C13.0763 11.1733 12 11.7897 12 12.7852Z"
                fill="white"
              />
            </g>
          </svg>
          <svg
            className={styles.pause}
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15.051" cy="15.5618" r="15.051" fill="white" />
            <path
              d="M14.3916 19.0303V12.0942C14.3916 11.4358 14.1135 11.1724 13.4111 11.1724H11.6406C10.9382 11.1724 10.6602 11.4358 10.6602 12.0942V19.0303C10.6602 19.6887 10.9382 19.9521 11.6406 19.9521H13.4111C14.1135 19.9521 14.3916 19.6887 14.3916 19.0303Z"
              fill="#292D32"
            />
            <path
              d="M19.4404 19.0303V12.0942C19.4404 11.4358 19.1624 11.1724 18.46 11.1724H16.6894C15.9919 11.1724 15.709 11.4358 15.709 12.0942V19.0303C15.709 19.6887 15.987 19.9521 16.6894 19.9521H18.46C19.1624 19.9521 19.4404 19.6887 19.4404 19.0303Z"
              fill="#292D32"
            />
          </svg>
        </div>
      </div>
      <div className={styles.track}>
        <div className={styles.cover}>
          <img src={cover} alt="" />
        </div>
        <span>{title}</span>
      </div>
      <div className={styles.artists}>
        <span>
          {Array.isArray(artists)
            ? artists.map((artist, idx) => {
                return `${idx + 1 === artists.length ? artist : `${artist}, `}`
              })
            : artists}
        </span>
      </div>
      <div className={styles.genre}>
        <span>
          {Array.isArray(genre)
            ? genre.map((item, idx) => {
                return `${idx + 1 === genre.length ? item : `${item}, `}`
              })
            : genre}
        </span>
      </div>
    </div>
  )
}
