import clsx from 'clsx'
import styles from './Hero.module.scss'
import useSplit from '../../../../hooks/useSplit'
import { Cross } from '../../../../shared/Cross/Cross'

export const Hero = () => {
  return (
    <section
      data-grid="false"
      className={clsx(styles.careersHero, 'section')}
      id="hero"
    >
      <div className="container">
        <div className={styles.wrapper}>
          <big>{useSplit('Careers')}</big>
          <div className={styles.block}>
            <div className={styles.cross}>
              <Cross activeId={0} />
            </div>
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
                <div className="reveal">
                  Empowering artists, captivating global audiences, and
                  redefining the future of musicas a dynamic record label
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
