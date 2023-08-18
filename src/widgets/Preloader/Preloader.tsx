import { useContext, useEffect, useState } from 'react'
import styles from './Preloader.module.scss'
import { MainContext } from '../../app/providers/MainContext'
import clsx from 'clsx'
import useSplit from '../../hooks/useSplit'
import { Cross } from '../../shared/Cross/Cross'
import { Logo } from '../../shared/Logo/Logo'
import { preloader } from './function'

export const Preloader = () => {
  const { pageLoaded, setPageLoaded } = useContext(MainContext)

  const [loading, setLoading] = useState<number>(0)
  const [closing, setClosing] = useState<boolean>(false)

  const [logoAnimEnd, setLogoAnimEnd] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setLogoAnimEnd(true), 4000)
  }, [])

  useEffect(() => {
    preloader({
      onChange(percentage: number, complete: number) {
        setLoading(percentage)
      },
    })
  }, [])

  useEffect(() => {
    if (logoAnimEnd) {
      setClosing(true)
    }
  }, [logoAnimEnd])

  useEffect(() => {
    if (closing) {
      setTimeout(() => setPageLoaded(true), 1000)
    }
  }, [closing])

  return (
    <div
      id="preloader"
      className={clsx(
        styles.preloader,
        'reveal-container animated',
        closing && styles.closing
      )}
    >
      <div className={styles.content}>
        <div className={styles.logo}>
          <div className="reveal">
            <div className={styles.filled}>
              <img src="/images/Preloader/logo.png" alt="" />
            </div>
            <div className={styles.shadow}>
              <img src="/images/Preloader/logo-shadow.png" alt="" />
            </div>
          </div>
        </div>
        <div className={clsx(styles.text, styles.left)}>
          <p>
            {useSplit(
              'Dynamic',
              {
                duration: 1,
                delay: 0.075,
                startDelay: 0,
                ease: 'ease',
              },
              true
            )}
          </p>
          <p>
            {useSplit(
              'Record label',
              {
                duration: 1,
                delay: 0.075,
                startDelay: 0.125,
                ease: 'ease',
              },
              true
            )}
          </p>
        </div>
        <div className={clsx(styles.text, styles.right)}>
          <p>
            {' '}
            {loading < 100
              ? `0${loading.toFixed(0)}`
              : `${loading === 100 ? loading.toFixed(0) : `100`}`}{' '}
            %
          </p>
          <p>
            {' '}
            {useSplit(
              'Loading',
              {
                duration: 1,
                delay: 0.075,
                startDelay: 0.125,
                ease: 'ease',
              },
              true
            )}
          </p>
        </div>
        <div className={clsx(styles.text, styles.bottom)}>
          <div className={styles.cross}>
            <Cross />
          </div>
          <div>
            <span>
              <p>Empowering artists and redefining</p>
            </span>
            <p>the future of music</p>
          </div>
        </div>
      </div>
    </div>
  )
}
