import clsx from 'clsx'
import styles from './PreAbout.module.scss'

import useSplit from '../../../../hooks/useSplit'
import { DrawableLine } from '../../../../shared/DrawableLine/DrawableLine'
import { useContext } from 'react'
import { MainContext } from '../../../../app/providers/MainContext'

export const PreAbout = () => {
  const { activeScreen } = useContext(MainContext)

  return (
    <section className={clsx('section', styles.preAbout)} id="pre-about">
      <div className="container">
        <div className={styles.text}>
          <div>
            <p>
              {useSplit('Empowering artists and', {
                duration: 0.5,
                delay: 0.025,
                startDelay: 0.5,
                ease: 'ease',
              })}
            </p>
          </div>
          <div>
            <p>
              {useSplit('redefining', {
                duration: 0.5,
                delay: 0.025,
                startDelay: 0.75,
                ease: 'ease',
              })}
            </p>{' '}
            <b>
              {useSplit(' the future of music', {
                duration: 0.5,
                delay: 0.05,
                startDelay: 1,
                ease: 'ease',
              })}
            </b>
          </div>

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
        </div>
      </div>
    </section>
  )
}
