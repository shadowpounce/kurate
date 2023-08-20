import { FC } from 'react'
import styles from './ArtistsSliderCard.module.scss'
import clsx from 'clsx'

interface IProps {
  id: number
  title: string
  text: string
  media: string | string[]
}

export const ArtistsSliderCard: FC<IProps> = ({ id, title, text, media }) => {
  return (
    <div className={clsx('artist-slider-card', styles.artistsSliderCard)}>
      <div id="artists-slider-card-content" className={styles.content}>
        <div className={clsx(styles.title, 'reveal')}>
          <sup>({id})</sup>
          <h6>{title}</h6>
        </div>
        <div className={clsx(styles.text, 'reveal')}>
          <p>{text}</p>
        </div>
        <div
          className={clsx(
            styles.media,
            Array.isArray(media) && styles.gallery,
            'reveal'
          )}
        >
          {Array.isArray(media) ? (
            media.map((img, idx) => (
              <img src={img} alt={`media-image-${idx}`} />
            ))
          ) : (
            <img src={media} alt={`media-image-${media}`} />
          )}
        </div>
      </div>
    </div>
  )
}
