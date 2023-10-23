import clsx from 'clsx'
import styles from './AllArtists.module.scss'
import { artistsData } from '../../../../data'
import { Button } from '../../../../shared/Button/Button'
import { useEffect, useRef, useState } from 'react'
import { ArtistListItem } from '../../../../entities/ArtistListItem/ArtistListItem'

export const AlllArtists = () => {
  const [showedMore, setShowedMore] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && showedMore) {
      ref.current.classList.add(`${styles.collapsed}`)
    }
  }, [showedMore])

  return (
    <section
      ref={ref}
      data-start="top 50%"
      id="all-artists"
      data-grid="false"
      className={clsx('section', styles.allArtists)}
    >
      <div className="container">
        <div className={clsx(styles.wrapper)}>
          <div className={styles.wrap}>
            <span className="section-span">
              <div className="reveal">ALL ARTISTS</div>
            </span>
            <ul className={styles.artistsList}>
              {artistsData.map((artist, idx) => (
                <ArtistListItem
                  showedMore={showedMore}
                  setShowedMore={setShowedMore}
                  theme={artist.theme}
                  idx={idx}
                  title={artist.title}
                  media={artist.media}
                />
              ))}
            </ul>
            {!showedMore && (
              <div
                onClick={() => setShowedMore(true)}
                className={styles.showMore}
              >
                <Button withArrow={false}>Show more</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
