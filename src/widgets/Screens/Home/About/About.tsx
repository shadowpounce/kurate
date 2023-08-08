import styles from './About.module.scss'
import { DrawableLine } from '../../../../shared/DrawableLine/DrawableLine'
import { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../../app/providers/MainContext'
import clsx from 'clsx'
import { Cross } from '../../../../shared/Cross/Cross'
import useSplit from '../../../../hooks/useSplit'

export const About = () => {
  const { activeScreen } = useContext(MainContext)

  const [init, setInit] = useState<boolean>(false)

  useEffect(() => {
    if (activeScreen === 2 && !init) {
      setInit(true)
    }
  }, [activeScreen])

  return (
    <section className={clsx(styles.about, 'section')} id="about">
      <div className={styles.line}>
        <DrawableLine anim={activeScreen === 1 && true}>
          <svg
            width="199"
            height="464"
            viewBox="0 0 199 464"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 19.3123C63.7255 19.3123 125.55 13.9353 186.907 13.9353C201.249 13.9353 199.943 3.66424 186.907 3.18145C166.129 2.41188 139.648 -0.462263 120.293 7.0648C116.022 8.72585 33.5983 27.4268 66.5234 46.7945C74.0917 51.2464 87.0611 62.3279 96.0966 62.3279C100.354 62.3279 79.5924 54.2624 73.2445 54.2624C63.6952 54.2624 53.8413 59.6505 65.3285 69.049C88.2425 87.7969 105.24 110 121.338 134.767C131.569 150.506 138.634 175.038 136.274 193.914C135.268 201.962 123.342 209.961 117.455 214.376C105.449 223.381 93.8389 235.154 83.2516 245.741C48.3967 280.596 27.7675 323.169 34.411 372.996C35.2306 379.143 36.3731 385.227 37.6155 391.291C42.9319 417.241 64.336 438.493 76.5455 462V462"
              stroke="white"
              strokeWidth="2.72727"
              strokeLinecap="round"
            />
          </svg>
        </DrawableLine>
      </div>
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
            <span className={styles.rect}>
              <img src="/images/About/rect.jpg" alt="" />
            </span>{' '}
            audiences,
          </h3>
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
          <p>
            <div className="reveal">
              Empowering artists, captivating global{' '}
            </div>
            <div className="reveal">
              audiences, and redefining the future of{' '}
            </div>
            <div className="reveal">musicas a dynamic record label</div>
          </p>
        </div>
      </div>
    </section>
  )
}
