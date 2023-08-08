import clsx from 'clsx'
import styles from './PreAbout.module.scss'

import useSplit from '../../../../hooks/useSplit'

export const PreAbout = () => {
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
        </div>
      </div>
    </section>
  )
}
