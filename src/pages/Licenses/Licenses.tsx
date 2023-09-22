import clsx from 'clsx'
import styles from './Licenses.module.scss'
import useSplit from '../../hooks/useSplit'
import { WithScrollSmoother } from '../../app/providers/WithScrollSmoother'
import { MainContext } from '../../app/providers/MainContext'
import { useContext, useEffect } from 'react'

export const Licenses = () => {
  const { setCurrentPage } = useContext(MainContext)

  useEffect(() => {
    setCurrentPage('licenses')
  }, [])

  return (
    <WithScrollSmoother>
      <section
        data-start="top 50%"
        id="licenses"
        className={clsx('section', styles.licenses)}
      >
        <div className="container">
          {window.innerWidth > 768 ? (
            <h2>{useSplit('Licenses')}</h2>
          ) : (
            <h2>Licenses</h2>
          )}
          {window.innerWidth > 768 ? (
            <h6 className="reveal">
              <a href="mailto:licensing@kuratemusic.com">
                licensing@kuratemusic.com
              </a>
            </h6>
          ) : (
            <h6>
              <a href="mailto:licensing@kuratemusic.com">
                licensing@kuratemusic.com
              </a>
            </h6>
          )}
        </div>
      </section>
    </WithScrollSmoother>
  )
}
