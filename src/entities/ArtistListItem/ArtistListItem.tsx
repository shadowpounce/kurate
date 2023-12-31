import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Button } from '../../shared/Button/Button'
import styles from './ArtistListItem.module.scss'
import clsx from 'clsx'

interface IProps {
  idx: number
  title: string
  theme: string
  media: string | string[]
  showedMore: boolean
  setShowedMore: Dispatch<SetStateAction<boolean>>
}

export const ArtistListItem: FC<IProps> = ({
  idx,
  title,
  theme,
  media,
  showedMore,
  setShowedMore,
}) => {
  const bodyRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState<boolean>(false)
  const [bodyHeight, setBodyHeight] = useState<number>(0)

  useEffect(() => {
    const body = bodyRef.current

    if (body) {
      setBodyHeight(body.offsetHeight)
    }
  }, [bodyRef])

  const toggleDropdown = () => {
    if (active) {
      setActive(false)
    } else {
      setActive(true)

      if (!showedMore) {
        setShowedMore(true)
      }
    }
  }

  return (
    <li
      data-start="top 100%"
      data-height={bodyHeight}
      style={{
        height:
          active && window.innerWidth <= 768
            ? `${bodyHeight + 60}px`
            : `11.5vh`,
      }}
      className={clsx(styles.artistListItem, active && styles.active)}
    >
      {/* <div className={styles.img}>
        <img src={Array.isArray(media) ? media[0] : media} alt="" />
      </div> */}
      <div
        style={{
          transitionDelay: `${idx * 0.15 + 0.25}s`,
        }}
        className={clsx(styles.head, window.innerWidth > 768 && 'reveal')}
      >
        {window.innerWidth <= 768 && (
          <div ref={bodyRef} className={styles.mobileBody}>
            <div className={styles.artistInfoGroup}>
              <span className={styles.artistInfoLabel}>Genre</span>
              <div className={styles.artistInfoTitle}>{theme}</div>
            </div>
            <Button withUnderline={false}>Listen</Button>
          </div>
        )}

        <h6 className={styles.author}>{title}</h6>
        {window.innerWidth > 768 ? (
          <>
            <span className={styles.theme}>{theme}</span>
            <a href="" className={styles.spotifyLink}>
              <Button withUnderline={false} withAnim={false}>
                Listen
              </Button>
            </a>
          </>
        ) : (
          <Button
            className={styles.headButton}
            handleClick={() => {
              toggleDropdown()
            }}
            withUnderline={false}
            withAnim={false}
          >
            Info
          </Button>
        )}
      </div>
    </li>
  )
}
