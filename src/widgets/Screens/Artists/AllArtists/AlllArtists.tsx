import clsx from 'clsx'
import styles from './AllArtists.module.scss'
import { artistsData } from '../../../../data'
import { Button } from '../../../../shared/Button/Button'
import { useState } from 'react'

export const AlllArtists = () => {
  const [showedMore, setShowedMore] = useState<boolean>(false)

  return (
    <section data-grid="false" className={clsx('section', styles.allArtists)}>
      <div className="container">
        <div className={styles.wrapper}>
          <span className="section-span">
            <div className="reveal">ALL ARTISTS</div>
          </span>
          <ul className={styles.artistsList}>
            {showedMore
              ? artistsData.map((artist, idx) => (
                  <li
                    style={{
                      transitionDelay: `${idx * 0.15 + 0.25}s`,
                    }}
                    className={clsx(styles.listItem, 'reveal')}
                  >
                    <div className={styles.img}>
                      <img
                        src={
                          Array.isArray(artist.media)
                            ? artist.media[0]
                            : artist.media
                        }
                        alt=""
                      />
                    </div>
                    <h6 className={styles.author}>{artist.title}</h6>
                    <span className={styles.theme}>{artist.theme}</span>
                    <a href="" className={styles.spotifyLink}>
                      <Button withUnderline={false} withAnim={false}>
                        View on Spotify
                      </Button>
                    </a>
                  </li>
                ))
              : artistsData.slice(0, 4).map((artist, idx) => (
                  <li
                    style={{
                      transitionDelay: `${idx * 0.15 + 0.25}s`,
                    }}
                    className={clsx(styles.listItem, 'reveal')}
                  >
                    <div className={styles.img}>
                      <img
                        src={
                          Array.isArray(artist.media)
                            ? artist.media[0]
                            : artist.media
                        }
                        alt=""
                      />
                    </div>
                    <h6 className={styles.author}>{artist.title}</h6>
                    <span className={styles.theme}>{artist.theme}</span>
                    <a href="" className={styles.spotifyLink}>
                      <Button withUnderline={false} withAnim={false}>
                        View on Spotify
                      </Button>
                    </a>
                  </li>
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
    </section>
  )
}
