import { useContext, useEffect, useState } from 'react'
import { DrawableLine } from '../../shared/DrawableLine/DrawableLine'
import styles from './ThreeDCards.module.scss'
import { MainContext } from '../../app/providers/MainContext'
import { CircleScrollLabel } from '../../shared/CircleScrollLabel/CircleScrollLabel'
import AnimatedCard from '@sl-codeblaster/react-3d-animated-card'
import clsx from 'clsx'

export const ThreeDCards = () => {
  const [init, setInit] = useState<boolean>(false)

  const { activeScreen, pageLoaded } = useContext(MainContext)

  useEffect(() => {
    if (pageLoaded && !init) {
      setInit(true)
    }
  }, [pageLoaded])

  return (
    <div
      className={clsx(
        styles.threeDCards,
        activeScreen >= 0 && pageLoaded && 'animated'
      )}
    >
      <div className={styles.cardsWrapper}>
        <div className={clsx(styles.cardImages, 'reveal')}>
          <img
            className={clsx(
              styles.cardImage,
              init && 'rotate-[-6.15deg] z-[2]'
            )}
            src="/images/Hero/card3_2.jpg"
            alt=""
          />
          <img
            className={clsx(styles.cardImage, init && 'rotate-[6.15deg] z-[1]')}
            src="/images/Hero/card3_3.jpg"
            alt=""
          />
        </div>
      </div>
      <AnimatedCard
        config={{
          rotation: 30,
          transition: {
            duration: 0.5,
            timingMode: 'ease',
          },
          transform: {
            figureIcon: {
              rotation: 20,
              translateZ: 160,
            },
            titleTranslateZ: 140,
            bodyTextTranslateZ: 100,
            buttonTranslateZ: 80,
          },
        }}
        className={clsx(styles.movementField, 'reveal')}
      >
        <img
          // className={styles.cardImage}
          className="mx-auto"
          src="/images/Hero/card3_1.jpg"
          alt=""
        />
      </AnimatedCard>

      <div className={styles.content}>
        <p className={styles.text}>
          <div className="reveal">(Body text)</div>
        </p>

        <div className={styles.line}>
          <DrawableLine anim={activeScreen >= 1 && true}>
            <svg
              width="300"
              height="244"
              viewBox="0 0 300 244"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.69582 130.546C1.36584 130.546 2.20758 130.45 3.02641 129.888C10.4343 124.797 17.5774 119.412 25.1761 114.569C75.9755 82.1899 133.571 57.3954 189.398 35.0939C219.856 22.9265 249.706 12.0494 281.468 4.53914C290.818 2.32826 303.397 -2.26048 295.518 11.5396C274.87 47.7026 235.577 77.0991 203.035 101.968C176.929 121.919 148.922 139.556 122.04 158.466C111.922 165.582 101.857 172.503 92.121 180.126C90.5713 181.339 87.3987 183.914 91.2119 183.914C96.6337 183.914 104.189 178.602 108.981 176.173C115.874 172.678 124.291 168.525 129.974 163.16C134.036 159.325 125.448 164.972 124.684 165.631C114.42 174.482 106.339 187.914 101.212 200.221C96.4585 211.633 86.7715 238.553 105.345 241.4C111.04 242.273 117.447 242.016 123.197 241.729C125.2 241.63 128.88 240.247 124.684 240.247"
                stroke="#FAFAFA"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </DrawableLine>
        </div>
        <div className={styles.circleScrollLabel}>
          <div className="reveal">
            <CircleScrollLabel />
          </div>
        </div>
      </div>
    </div>
  )
}
