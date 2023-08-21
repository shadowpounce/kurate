import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import styles from './MusicPlayer.module.scss'
import {
  LegacyRef,
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { MainContext } from '../../app/providers/MainContext'
import { recordsData } from '../../data'
import clsx from 'clsx'
import H5AudioPlayer from 'react-h5-audio-player'
import { getRandomIntInclusive } from '../../utils/getRandomIntInclusive'
import { Cubes } from '../../shared/Cubes/Cubes'

export const MusicPlayer = () => {
  const { setPlayerActive } = useContext(MainContext)

  const ref = useRef<H5AudioPlayer>(null)

  const [el, setEl] = useState<HTMLDivElement | null>()

  useEffect(() => {
    setEl(document.querySelector<HTMLDivElement>(`.rhap_progress-filled`))
  }, [])

  const {
    currentTrack,
    setCurrentTrack,
    trackIndex,
    setTrackIndex,
    audioPlay,
    setAudioPlay,
    shuffleMode,
    setShuffleMode,
    repeatMode,
    setRepeatMode,
    currentDuration,
    currentTime,
    setCurrentDuration,
    setCurrentTime,
  } = useContext(MainContext)

  const [covers, setCovers] = useState<string[]>()
  const [strings, setStrings] = useState<string[]>()

  useEffect(() => {
    const backIdx = trackIndex - 1 > 0 ? trackIndex - 1 : recordsData.length - 1

    const nextIdx =
      trackIndex + 1 <= recordsData.length - 1 ? trackIndex + 1 : 0

    setTimeout(() => {
      setCovers([recordsData[backIdx].cover, recordsData[nextIdx].cover])

      setStrings([recordsData[backIdx].title, recordsData[nextIdx].title])
    }, 500)
  }, [trackIndex])

  useEffect(() => {
    setCurrentTime(0)
    setCurrentTrack(recordsData[trackIndex].audio)
  }, [trackIndex])

  function next() {
    if (!shuffleMode) {
      setTrackIndex(trackIndex < recordsData.length - 1 ? trackIndex + 1 : 0)
    } else {
      setTrackIndex(getRandomIntInclusive(0, recordsData.length - 1))
    }
  }

  function prev() {
    const idPrev = trackIndex

    if (!shuffleMode) {
      setTrackIndex(trackIndex === 0 ? recordsData.length - 1 : trackIndex - 1)
    } else {
      setTrackIndex(idPrev)
    }
  }

  function togglePlay() {
    audioPlay ? setAudioPlay(false) : setAudioPlay(true)
  }

  function toggleRepeat() {
    repeatMode ? setRepeatMode(false) : setRepeatMode(true)
  }

  function toggleShuffle() {
    if (!shuffleMode) {
      setShuffleMode(true)
      setTrackIndex(getRandomIntInclusive(0, recordsData.length - 1))
      setAudioPlay(true)
    } else {
      setShuffleMode(false)
    }
  }

  useEffect(() => {
    if (ref.current?.audio.current) {
      if (audioPlay) {
        ref.current.audio.current.play()
      }

      if (!audioPlay) {
        ref.current.audio.current.pause()
      }
    }
  }, [audioPlay])

  return (
    <div className={styles.musicPlayer}>
      <div className={styles.hidden}>
        <AudioPlayer
          ref={ref}
          onListen={() => {
            if (ref.current?.audio.current) {
              setCurrentTime(ref.current.audio.current.currentTime)
            }
          }}
          onLoadedData={() => {
            if (ref.current?.audio) {
              setCurrentDuration(ref.current.audio.current?.duration)
            }
          }}
          listenInterval={10}
          src={recordsData[trackIndex].audio}
          showSkipControls={true}
          showJumpControls={false}
          loop={repeatMode ? true : false}
          onEnded={() => {
            if (shuffleMode && !repeatMode) {
              setTrackIndex(getRandomIntInclusive(0, recordsData.length - 1))
            }

            if (!shuffleMode && !repeatMode) {
              next()
            }
          }}
        />
      </div>
      <div
        style={{
          // width: `${currentTime / (currentDuration / 100)}%`,
          width: `${el && el.style.width}`,
        }}
        className={styles.progress}
      ></div>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <Cubes
            hovered={false}
            string={recordsData[trackIndex].title}
            cover={[
              recordsData[trackIndex].cover,
              recordsData[trackIndex].cover,
              recordsData[trackIndex].cover,
              recordsData[trackIndex].cover,
            ]}
          />
          <div className={styles.text}>
            <p className={styles.title}>{recordsData[trackIndex].title}</p>
            <span className={styles.artist}>
              {Array.isArray(recordsData[trackIndex].artists)
                ? Array.from(recordsData[trackIndex].artists).join(', ')
                : recordsData[trackIndex].artists}
            </span>
          </div>
        </div>
        <div className={styles.actions}>
          <div
            onClick={() => toggleShuffle()}
            className={clsx(styles.shuffle, shuffleMode && styles.active)}
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4351 12.6205C14.4351 12.6072 14.4285 12.5939 14.4285 12.5807C14.4219 12.5276 14.4152 12.4745 14.3953 12.428C14.3688 12.3683 14.3356 12.3218 14.2958 12.2754C14.2958 12.2754 14.2958 12.2688 14.2891 12.2688C14.2427 12.2223 14.1896 12.1891 14.1299 12.1626C14.0701 12.136 14.0038 12.1228 13.9374 12.1228L10.8382 12.136C10.8382 12.136 10.8382 12.136 10.8316 12.136C10.4334 12.136 10.0485 11.9502 9.80958 11.6317L8.99995 10.5898C8.83404 10.3708 8.52213 10.3309 8.30313 10.5035C8.08413 10.676 8.04431 10.9813 8.21686 11.2003L9.02649 12.2422C9.45786 12.7997 10.1348 13.1315 10.8382 13.1315H10.8449L12.7362 13.1248L12.265 13.596C12.0726 13.7885 12.0726 14.107 12.265 14.2995C12.3646 14.399 12.4907 14.4455 12.6168 14.4455C12.7429 14.4455 12.8689 14.399 12.9685 14.2995L14.2958 12.9722C14.3422 12.9258 14.3754 12.8727 14.4019 12.8129C14.4219 12.7466 14.4351 12.6802 14.4351 12.6205Z"
                fill="#B3B3B3"
              />
              <path
                d="M5.58878 5.12808C5.15741 4.5308 4.46723 4.17908 3.7306 4.17908C3.72396 4.17908 3.72396 4.17908 3.71732 4.17908L1.99187 4.18571C1.71978 4.18571 1.49414 4.41135 1.49414 4.68344C1.49414 4.95553 1.71978 5.18117 1.99187 5.18117L3.72396 5.17453H3.7306C4.14869 5.17453 4.54023 5.37362 4.77914 5.71208L5.49587 6.70753C5.59541 6.84026 5.74805 6.91326 5.90069 6.91326C6.00023 6.91326 6.10641 6.88008 6.19269 6.82035C6.41832 6.65444 6.46478 6.34253 6.3055 6.12353L5.58878 5.12808Z"
                fill="#B3B3B3"
              />
              <path
                d="M14.4284 4.72322C14.4284 4.70995 14.4351 4.69668 14.4351 4.69004C14.4351 4.62368 14.4218 4.55731 14.3952 4.49759C14.3687 4.43786 14.3355 4.38477 14.2891 4.33831L12.9618 3.01104C12.7693 2.81859 12.4508 2.81859 12.2583 3.01104C12.0659 3.20349 12.0659 3.52204 12.2583 3.71449L12.7295 4.18568L10.9178 4.17904C10.9111 4.17904 10.9111 4.17904 10.9045 4.17904C10.1413 4.17904 9.4246 4.55731 8.99987 5.20104L4.75923 11.5587C4.52032 11.917 4.1155 12.136 3.68414 12.136H3.6775L1.99187 12.1228C1.71978 12.1228 1.49414 12.3418 1.49414 12.6205C1.49414 12.8926 1.71314 13.1182 1.99187 13.1182L3.68414 13.1249C3.69078 13.1249 3.69078 13.1249 3.69741 13.1249C4.46723 13.1249 5.17732 12.7466 5.60205 12.1029L9.84269 5.74522C10.0816 5.38686 10.4864 5.16786 10.9178 5.16786H10.9244L13.9373 5.18113C14.0037 5.18113 14.0634 5.16786 14.1298 5.14131C14.1895 5.11477 14.2426 5.08159 14.2891 5.03513C14.2891 5.03513 14.2891 5.02849 14.2957 5.02849C14.3355 4.98204 14.3753 4.93559 14.3952 4.87586C14.4151 4.8294 14.4218 4.77631 14.4284 4.72322Z"
                fill="#B3B3B3"
              />
            </svg>
          </div>
          <div
            onClick={() => prev()}
            className={clsx(styles.direction, styles.prev)}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6304 5.47986V11.8309C13.6304 13.1316 12.2169 13.9479 11.0887 13.2975L8.3346 11.7114L5.58051 10.1187C4.45233 9.46832 4.45233 7.84241 5.58051 7.19205L8.3346 5.59932L11.0887 4.01323C12.2169 3.36286 13.6304 4.1725 13.6304 5.47986Z"
                fill="#B3B3B3"
              />
              <path
                d="M2.69499 13.251C2.4229 13.251 2.19727 13.0254 2.19727 12.7533V4.55077C2.19727 4.27868 2.4229 4.05304 2.69499 4.05304C2.96708 4.05304 3.19272 4.27868 3.19272 4.55077V12.7533C3.19272 13.0254 2.96708 13.251 2.69499 13.251Z"
                fill="#B3B3B3"
              />
            </svg>
          </div>
          <div
            onClick={() => togglePlay()}
            className={clsx(styles.main, audioPlay && styles.active)}
          >
            <svg
              className={styles.play}
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
            <svg
              className={styles.pause}
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
          </div>

          <div
            onClick={() => next()}
            className={clsx(styles.direction, styles.next)}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.36914 5.15412V11.5051C3.36914 12.8058 4.78269 13.6221 5.91087 12.9718L8.66496 11.3857L11.419 9.79294C12.5472 9.14257 12.5472 7.51666 11.419 6.8663L8.66496 5.27357L5.91087 3.68748C4.78269 3.03712 3.36914 3.84675 3.36914 5.15412Z"
                fill="#B3B3B3"
              />
              <path
                d="M14.3063 12.9253C14.0342 12.9253 13.8086 12.6997 13.8086 12.4276V4.22502C13.8086 3.95293 14.0342 3.72729 14.3063 3.72729C14.5784 3.72729 14.804 3.95293 14.804 4.22502V12.4276C14.804 12.6997 14.585 12.9253 14.3063 12.9253Z"
                fill="#B3B3B3"
              />
            </svg>
          </div>
          <div
            onClick={() => toggleRepeat()}
            className={clsx(styles.repeat, repeatMode && styles.active)}
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.66762 12.0897C2.54153 12.0897 2.41543 12.0432 2.31589 11.9437C1.40671 11.0279 0.902344 9.82004 0.902344 8.53922C0.902344 5.87804 3.05916 3.71459 5.71371 3.71459L9.74198 3.72786L9.01862 3.03768C8.81952 2.84522 8.81289 2.53332 9.00534 2.33422C9.1978 2.13513 9.50971 2.1285 9.7088 2.32095L11.3281 3.87386C11.4741 4.01322 11.5205 4.23222 11.4475 4.41804C11.3745 4.60386 11.1887 4.72995 10.983 4.72995L5.71371 4.71668C3.60998 4.71668 1.8978 6.4355 1.8978 8.54586C1.8978 9.56122 2.29598 10.5235 3.01934 11.2469C3.2118 11.4393 3.2118 11.7579 3.01934 11.9503C2.9198 12.0432 2.79371 12.0897 2.66762 12.0897Z"
                fill="#B3B3B3"
              />
              <path
                d="M6.70771 15.1225C6.58162 15.1225 6.46217 15.0761 6.36262 14.9832L4.74335 13.4303C4.59735 13.2909 4.55089 13.0719 4.62389 12.8861C4.70353 12.7003 4.88935 12.6007 5.08844 12.5742L10.3643 12.5874C12.4681 12.5874 14.1803 10.8686 14.1803 8.75827C14.1803 7.7429 13.7821 6.78063 13.0587 6.05727C12.8663 5.86481 12.8663 5.54627 13.0587 5.35381C13.2512 5.16136 13.5697 5.16136 13.7622 5.35381C14.6713 6.26963 15.1757 7.47745 15.1757 8.75827C15.1757 11.4194 13.0189 13.5829 10.3643 13.5829L6.33607 13.5696L7.05944 14.2598C7.25853 14.4523 7.26517 14.7642 7.07271 14.9633C6.96653 15.0694 6.84044 15.1225 6.70771 15.1225Z"
                fill="#B3B3B3"
              />
              <path
                d="M8.20119 10.9218C7.9291 10.9218 7.70347 10.6962 7.70347 10.4241V8.17435L7.57738 8.31372C7.39156 8.51945 7.07965 8.53272 6.87392 8.35354C6.66819 8.17435 6.65492 7.85581 6.8341 7.65008L7.82956 6.54181C7.96892 6.38917 8.18792 6.33608 8.38038 6.40908C8.57283 6.48872 8.69892 6.6679 8.69892 6.88026V10.4307C8.69892 10.7028 8.47328 10.9218 8.20119 10.9218Z"
                fill="#B3B3B3"
              />
            </svg>
          </div>
        </div>
        <div onClick={() => setPlayerActive(false)} className={styles.close}>
          <img src="/images/icons/menu-close.svg" alt="" />
        </div>
      </div>
    </div>
  )
}
