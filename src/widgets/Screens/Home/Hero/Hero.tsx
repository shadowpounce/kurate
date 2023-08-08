import clsx from 'clsx'
import styles from './Hero.module.scss'
import { Logo } from '../../../../shared/Logo/Logo'
import { DrawableLine } from '../../../../shared/DrawableLine/DrawableLine'
import { useContext } from 'react'
import { MainContext } from '../../../../app/providers/MainContext'
import { CircleScrollLabel } from '../../../../shared/CircleScrollLabel/CircleScrollLabel'

export const Hero = () => {
  const { activeScreen, pageLoaded } = useContext(MainContext)

  return (
    <section className={clsx('section', styles.hero)} id="hero">
      <div className="container">
        <div className={clsx(styles.heroCard, styles.cardFirst)}>
          <div className={clsx(styles.content, 'reveal')}>
            <div className={styles.line}>
              <DrawableLine anim={activeScreen === 0 && pageLoaded && true}>
                <svg
                  width="89"
                  height="80"
                  viewBox="0 0 89 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M79.8252 10.0149C81.9781 10.0149 84.1768 9.88847 86.3269 10.0149C87.5136 10.0848 87.3996 11.288 86.8429 12.079C84.3382 15.6383 79.005 17.0768 75.0263 17.8583C57.2131 21.3573 35.8275 22.241 19.0392 14.4526C17.9109 13.9292 -0.146546 4.9881 2.01081 3.10041C4.86251 0.605172 15.6668 5.03694 18.4715 5.93847C26.5415 8.53238 34.2572 12.5322 41.692 16.5683C53.7631 23.1212 67.9457 34.0764 69.4018 48.8189C70.4067 58.9935 63.6029 68.5919 54.6439 73.0714C48.3069 76.2399 41.0103 76.1444 34.3131 77.8187"
                    stroke="#FAFAFA"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </DrawableLine>
            </div>
            <div className={styles.text}>
              <span className="reveal">Body text</span>
            </div>
            <img src="/images/Hero/card1.jpg" alt="" />
          </div>
        </div>
        <div className={clsx(styles.heroCard, styles.cardSecond)}>
          <div className={clsx(styles.content, 'reveal')}>
            <div className={styles.text}>
              <span className="reveal">Body text</span>
            </div>
            <img src="/images/Hero/card2.jpg" alt="" />
          </div>
        </div>
        <div className={clsx(styles.heroCard, styles.cardThird)}>
          <div className={styles.circleScrollLabel}>
            <div className="reveal">
              <CircleScrollLabel />
            </div>
          </div>
          <div className={clsx(styles.content, 'reveal')}>
            <div className={styles.text}>
              <span className="reveal">(Body text)</span>
            </div>
            <div className={styles.photos}>
              <img
                className={styles.img}
                src="/images/Hero/card3_1.jpg"
                alt=""
              />
              <img
                className={clsx(
                  styles.img,
                  activeScreen >= 0 && pageLoaded && styles.rotated
                )}
                src="/images/Hero/card3_2.jpg"
                alt=""
              />
              <img
                className={clsx(
                  styles.img,
                  activeScreen >= 0 && pageLoaded && styles.rotated
                )}
                src="/images/Hero/card3_3.jpg"
                alt=""
              />
            </div>
          </div>
          <div className={styles.line}>
            <DrawableLine anim={activeScreen === 1 && true}>
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
        </div>
        <div className={styles.heroLogo}>
          <Logo />
          <div className={clsx(styles.trademarkSymbol, 'reveal')}>
            <img src="/images/icons/trademark-symbol.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
