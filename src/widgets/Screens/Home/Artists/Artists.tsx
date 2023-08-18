import clsx from 'clsx'
import styles from './Artists.module.scss'
import useSplit from '../../../../hooks/useSplit'
import { Button } from '../../../../shared/Button/Button'
import { ArtistsSlider } from '../../../../features/ArtistsSlider/ArtistsSlider'

export const Artists = () => {
  return (
    <section id="artists" className={clsx('section', styles.artists)}>
      <div className={styles.wrapper}>
        <div className="container">
          <div className={styles.textWrapper}>
            <div>
              <h1>
                {useSplit('Our', {
                  duration: 1,
                  delay: 0.115,
                  startDelay: 0,
                  ease: 'ease',
                })}
              </h1>
              <h1>
                {useSplit('Artists', {
                  duration: 1,
                  delay: 0.115,
                  startDelay: 0.5,
                  ease: 'ease',
                })}
              </h1>
              <span className="section-span">
                <div className="reveal">(Meet</div>
                <div className="reveal">our team)</div>
              </span>
            </div>
            <div>
              <img
                className={clsx('reveal', styles.soundWaves)}
                src="/images/Artists/soundWaves.svg"
                alt=""
              />
              <p className="brand-text">
                <div className="reveal">
                  Empowering artists, captivating global{' '}
                </div>
                <div className="reveal">
                  audiences, and redefining the future of{' '}
                </div>
                <div className="reveal">musicas a dynamic record label</div>
              </p>
              <div className="reveal opacity-0 translate-y-full duration-[1s] delay-[0.5s]">
                <Button>Learn more</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.slider}>
          <ArtistsSlider />
        </div>
      </div>
    </section>
  )
}
