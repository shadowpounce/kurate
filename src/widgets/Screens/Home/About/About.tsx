import styles from './About.module.scss'
import { DrawableLine } from '../../../../shared/DrawableLine/DrawableLine'
import { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../../app/providers/MainContext'
import clsx from 'clsx'
import { Cross } from '../../../../shared/Cross/Cross'
import useSplit from '../../../../hooks/useSplit'
import { Disc } from '../../../../entities/Disc/Disc'

export const About = () => {
  const { activeScreen } = useContext(MainContext)

  const [init, setInit] = useState<boolean>(false)

  useEffect(() => {
    if (activeScreen === 2 && !init) {
      setInit(true)
    }
  }, [activeScreen])

  return (
    <>
      <section className={clsx(styles.about, 'section')} id="about">
        <div className="container">
          <div className={styles.aboutText}>
            <h3 className="reveal">
              <span className="section-span">
                <div className="reveal">(About)</div>
              </span>
              Empowering artists,
            </h3>
            <h3 className="reveal flex items-center justify-center">
              captivating global{' '}
              {window.innerWidth > 768 && (
                <>
                  <span className={clsx(styles.rect, 'reveal')}>
                    <div className={styles.spectograph}>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <img src="/images/About/rect.jpg" alt="" />
                  </span>{' '}
                  audiences,
                </>
              )}
            </h3>
            {window.innerWidth <= 768 && (
              <h3 className="reveal flex items-center justify-center">
                <>
                  <span className={clsx(styles.rect, 'reveal')}>
                    <div className={styles.spectograph}>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <img src="/images/About/rect.jpg" alt="" />
                  </span>{' '}
                  audiences,
                </>
              </h3>
            )}
            <h3 className="reveal">
              and{' '}
              <span>
                redefining
                <div className={clsx(styles.underline, 'reveal reveal-width')}>
                  <div></div>
                </div>
              </span>{' '}
              the future of music
            </h3>
            <h3 className={clsx('reveal', init && styles.shine)}>
              as a{' '}
              <span
                style={{
                  animationDelay: `0s`,
                }}
              >
                d
              </span>
              <span
                style={{
                  animationDelay: `0.15s`,
                }}
              >
                y
              </span>
              <span
                style={{
                  animationDelay: `0.3s`,
                }}
              >
                n
              </span>
              <span
                style={{
                  animationDelay: `0.45s`,
                }}
              >
                a
              </span>
              <span
                style={{
                  animationDelay: `0.6s`,
                }}
              >
                m
              </span>
              <span
                style={{
                  animationDelay: `0.75s`,
                }}
              >
                i
              </span>
              <span
                style={{
                  animationDelay: `0.85s`,
                }}
              >
                c
              </span>{' '}
              record label
            </h3>
          </div>
          <div className={styles.aboutGroup}>
            <Cross activeId={2} />
            <p className="brand-text">
              {window.innerWidth > 768 ? (
                <>
                  <div className="reveal">
                    Empowering artists, captivating global{' '}
                  </div>
                  <div className="reveal">
                    audiences, and redefining the future of{' '}
                  </div>
                  <div className="reveal">musicas a dynamic record label</div>
                </>
              ) : (
                <>
                  <div className="reveal">
                    Empowering artists, captivating global audiences, and
                  </div>
                  <div className="reveal">
                    redefining the future of musicas a dynamic record label
                  </div>
                </>
              )}
            </p>
          </div>
        </div>
      </section>
      <Disc />
    </>
  )
}
