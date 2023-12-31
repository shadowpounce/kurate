import clsx from 'clsx'
import styles from './Records.module.scss'
import useSplit from '../../../../hooks/useSplit'
import { SendButton } from '../../../../entities/SendButton/SendButton'
import { Cross } from '../../../../shared/Cross/Cross'
import { RecordsList } from '../../../../features/RecordsList/RecordsList'

export const Records = () => {
  return (
    <section
      data-end="bottom 50%"
      data-grid="false"
      id="releases"
      className={clsx(styles.records, 'section')}
    >
      <div className="container">
        {window.innerWidth <= 768 && (
          <div className={styles.titleGroup}>
            <h2>
              <div className={styles.transparent}>
                {useSplit('Let’s', {
                  duration: 1,
                  delay: 0.075,
                  startDelay: 0.5,
                  ease: 'ease',
                })}
              </div>
              <div className={styles.filled}>
                {useSplit('Let’s', {
                  duration: 1,
                  delay: 0.075,
                  startDelay: 1,
                  ease: 'ease',
                })}
              </div>
            </h2>
            <h2>
              <div className={styles.transparent}>
                {useSplit('Explore', {
                  duration: 1,
                  delay: 0.075,
                  startDelay: 1,
                  ease: 'ease',
                })}
              </div>

              <div className={styles.filled}>
                {useSplit('Explore', {
                  duration: 1,
                  delay: 0.075,
                  startDelay: 1.5,
                  ease: 'ease',
                })}
              </div>
            </h2>
          </div>
        )}
        <div className={styles.textCol}>
          <div className={styles.group}>
            {window.innerWidth > 768 && (
              <div className={styles.titleGroup}>
                <h2>
                  <div className={styles.transparent}>
                    {useSplit('Let’s', {
                      duration: 1,
                      delay: 0.075,
                      startDelay: 0.5,
                      ease: 'ease',
                    })}
                  </div>
                  <div className={styles.filled}>
                    {useSplit('Let’s', {
                      duration: 1,
                      delay: 0.075,
                      startDelay: 1,
                      ease: 'ease',
                    })}
                  </div>
                </h2>
                <h2>
                  <div className={styles.transparent}>
                    {useSplit('Explore', {
                      duration: 1,
                      delay: 0.075,
                      startDelay: 1,
                      ease: 'ease',
                    })}
                  </div>

                  <div className={styles.filled}>
                    {useSplit('Explore', {
                      duration: 1,
                      delay: 0.075,
                      startDelay: 1.5,
                      ease: 'ease',
                    })}
                  </div>
                </h2>
              </div>
            )}
            <SendButton />
          </div>
          <div className={styles.group}>
            <div className={styles.cross}>
              <Cross activeId={4} />
            </div>
            {window.innerWidth > 768 ? (
              <p className="brand-text">
                <div className="reveal">
                  Empowering artists, captivating global{' '}
                </div>
                <div className="reveal">
                  audiences, and redefining the future of{' '}
                </div>
                <div className="reveal">musicas a dynamic record label</div>
              </p>
            ) : (
              <p className="brand-text">
                <div className="reveal">
                  Empowering artists, captivating global audiences, and
                  redefining the future of musicas a dynamic record label
                </div>
              </p>
            )}
          </div>
        </div>
        <div className={styles.recordsList}>
          <RecordsList />
        </div>
      </div>
    </section>
  )
}
