import { FC, useContext, useEffect, useRef, useState } from 'react'
import styles from './Record.module.scss'
import clsx from 'clsx'
import { MainContext } from '../../app/providers/MainContext'
import { IRecord } from '../../interfaces/IRecord.interface'

export const Record: FC<IRecord> = ({ cover, title, artists, genre, id }) => {
  const { setTrackIndex, trackIndex, audioPlay, setAudioPlay } =
    useContext(MainContext)

  const [mobileActive, setMobileActive] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement>(null)

  const toggleMobile = () => {
    if (ref.current) {
      const bodyHeight = ref.current.querySelector<HTMLDivElement>(
        `.${styles.mobileInfo}`
      )?.offsetHeight

      if (mobileActive) {
        ref.current.style.minHeight = `80px`
        ref.current.style.height = `80px`
        setMobileActive(false)
        return
      }

      if (!mobileActive && bodyHeight) {
        ref.current.style.height = `calc(80px + ${bodyHeight}px)`
        ref.current.style.minHeight = `calc(80px + ${bodyHeight}px)`
        setMobileActive(true)
        return
      }
    }
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${id && id * 0.125 + 0.25}s`,
      }}
      className={clsx(
        styles.record,
        'reveal',
        audioPlay && trackIndex === id && styles.playing
      )}
    >
      <div className={styles.equalizer}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.action}>
        <div
          onClick={() => {
            if (trackIndex !== id) {
              if (audioPlay) {
                setAudioPlay(false)
                setTrackIndex(id)
                setAudioPlay(true)
              } else {
                setAudioPlay(true)
                setTrackIndex(id)
              }
            }

            if (trackIndex === id) {
              if (audioPlay) {
                setAudioPlay(false)
              } else {
                setAudioPlay(true)
              }
            }
          }}
          className={clsx(
            styles.icon,
            id === trackIndex && audioPlay && styles.active
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
        <span className={styles.title}>{title}</span>

        {window.innerWidth <= 768 && (
          <div
            className={clsx(styles.mobileInfo, mobileActive && styles.active)}
          >
            <div className={styles.infoGroup}>
              <span>Arist(s)</span>
              <span className={styles.title}>
                {Array.isArray(artists)
                  ? artists.map((artist, id) => {
                      return `${
                        id + 1 === artists.length ? artist : `${artist}, `
                      }`
                    })
                  : artists}
              </span>
            </div>
            <div className={styles.infoGroup}>
              <span>Genre</span>
              <span className={styles.title}>
                {Array.isArray(genre)
                  ? genre.map((item, id) => {
                      return `${id + 1 === genre.length ? item : `${item}, `}`
                    })
                  : genre}
              </span>
            </div>
          </div>
        )}
      </div>
      {window.innerWidth > 768 && (
        <>
          <div className={styles.artists}>
            <span>
              {Array.isArray(artists)
                ? artists.map((artist, id) => {
                    return `${
                      id + 1 === artists.length ? artist : `${artist}, `
                    }`
                  })
                : artists}
            </span>
          </div>
          <div className={styles.genre}>
            <span>
              {Array.isArray(genre)
                ? genre.map((item, id) => {
                    return `${id + 1 === genre.length ? item : `${item}, `}`
                  })
                : genre}
            </span>
          </div>
        </>
      )}
      {window.innerWidth <= 768 && (
        <div
          onClick={() => toggleMobile()}
          className={clsx(styles.info, mobileActive && styles.active)}
        >
          <span>Info</span>
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.375 9.01892L7.58125 12.8127L3.7875 9.01892"
              stroke="#FAFAFA"
              stroke-width="0.9375"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.58105 2.1875L7.58105 12.7062"
              stroke="#FAFAFA"
              stroke-width="0.9375"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
