import clsx from 'clsx'
import styles from './AllArtists.module.scss'
import { artistsData } from '../../../../data'
import { Button } from '../../../../shared/Button/Button'
import { useState } from 'react'
import { ArtistListItem } from '../../../../entities/ArtistListItem/ArtistListItem'

export const AlllArtists = () => {
  const [showedMore, setShowedMore] = useState<boolean>(false)

  return (
    <section
      id="all-artists"
      data-grid="false"
      className={clsx('section', styles.allArtists)}
    >
      <div className="container">
        <div className={clsx(styles.wrapper, showedMore && styles.collapsed)}>
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
                <Button>Show more</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
