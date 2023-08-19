import { FC } from 'react'
import styles from './Record.module.scss'
import clsx from 'clsx'

interface IProps {
  idx?: number
  cover: string
  title: string
  artists: string | string[]
  genre: string | string[]
}

export const Record: FC<IProps> = ({ cover, title, artists, genre, idx }) => {
  return (
    <div
      style={{
        transitionDelay: `${idx && idx * 0.125 + 0.25}s`,
      }}
      className={clsx(styles.record, 'reveal')}
    >
      <div className={styles.action}>
        <div className={styles.icon}>
          <svg
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
