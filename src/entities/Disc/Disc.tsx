import clsx from 'clsx'
import styles from './Disc.module.scss'
import { useContext, useEffect, useRef } from 'react'
import { MainContext } from '../../app/providers/MainContext'
import { HomeContext } from '../../app/providers/HomeContext'
import { DrawableLine } from '../../shared/DrawableLine/DrawableLine'

export const Disc = () => {
  const ref = useRef<HTMLDivElement>(null)

  const { pageLoaded } = useContext(MainContext)

  const { discDeployed, setDiscDeployed } = useContext(HomeContext)

  useEffect(() => {
    if (pageLoaded) {
      ScrollTrigger.create({
        trigger: ref.current,
        start: `top 50%`,
        onEnter: () => {
          !discDeployed && setDiscDeployed(true)
        },
      })
    }
  }, [pageLoaded])

  return (
    <div
      ref={ref}
      className={clsx(styles.disc, discDeployed && styles.animated)}
    >
      <div className={clsx(styles.piece, styles.middle)}>
        <img src="/images/Disc/hole.svg" alt="" className={styles.hole} />
        <svg
          width="263"
          height="263"
          viewBox="0 0 263 263"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            style={{
              mixBlendMode: 'color-dodge',
            }}
          >
            <path
              d="M260.933 131.116C260.933 202.701 202.902 260.732 131.317 260.732C59.7322 260.732 1.70117 202.701 1.70117 131.116C1.70117 59.531 59.7322 1.5 131.317 1.5C202.902 1.5 260.933 59.531 260.933 131.116Z"
              stroke="white"
              stroke-width="3"
            />
          </g>
        </svg>

        <img src="/images/Disc/middle.png" alt="" />
      </div>
      <div className={clsx(styles.piece, styles.side)}>
        <img src="/images/Disc/side.png" alt="" />
      </div>
      <div className={clsx(styles.piece, styles.side)}>
        <img src="/images/Disc/side.png" alt="" />
      </div>
      <div className={clsx(styles.piece, styles.lastSide)}>
        <DrawableLine anim={discDeployed && true}>
          <svg
            width="132"
            height="263"
            viewBox="0 0 132 263"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              style={{
                mixBlendMode: 'color-dodge',
              }}
            >
              <path
                d="M106.206 223.631L128.451 260.705C58.0961 259.286 1.5 201.81 1.5 131.116C1.5 60.4216 58.0961 2.94604 128.451 1.52686L106.206 38.6005C72.0393 95.5456 72.0393 166.686 106.206 223.631Z"
                stroke="white"
                stroke-width="3"
              />
            </g>
          </svg>
        </DrawableLine>

        <img src="/images/Disc/last-side.png" alt="" />
      </div>
      <div className={clsx(styles.piece, styles.lastSide)}>
        <DrawableLine anim={discDeployed && true}>
          <svg
            width="132"
            height="263"
            viewBox="0 0 132 263"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              style={{
                mixBlendMode: 'color-dodge',
              }}
            >
              <path
                d="M106.206 223.631L128.451 260.705C58.0961 259.286 1.5 201.81 1.5 131.116C1.5 60.4216 58.0961 2.94604 128.451 1.52686L106.206 38.6005C72.0393 95.5456 72.0393 166.686 106.206 223.631Z"
                stroke="white"
                stroke-width="3"
              />
            </g>
          </svg>
        </DrawableLine>
        <img src="/images/Disc/last-side.png" alt="" />
      </div>
    </div>
  )
}
