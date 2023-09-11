import clsx from 'clsx'
import styles from './Hero.module.scss'
import { Logo } from '../../../../shared/Logo/Logo'
import { DrawableLine } from '../../../../shared/DrawableLine/DrawableLine'
import { useContext, useState, useEffect, useRef } from 'react'
import { MainContext } from '../../../../app/providers/MainContext'

export const Hero = () => {
  const { activeScreen, pageLoaded } = useContext(MainContext)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<any>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      setCtx(ctx)
    }
  }, [])

  useEffect(() => {
    if (ctx) {
      const img = new Image()
      img.src = '/images/water-logo.png'
      img.onload = () => {
        ctx.drawImage(
          img,
          0,
          0,
          canvasRef.current?.width,
          canvasRef.current?.height
        )
      }
    }
  }, [ctx])

  return (
    <section className={clsx('section', styles.hero)} id="hero">
      <div className="container">
        {window.innerWidth > 768 && (
          <div id="water-mouse-field" className={styles.waterMouseField}></div>
        )}
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
            <div className={styles.img}>
              <img src="/images/Hero/card1.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className={clsx(styles.heroCard, styles.cardSecond)}>
          <div className={clsx(styles.content, 'reveal')}>
            <div className={styles.text}>
              <span className="reveal">Body text</span>
            </div>
            <div className={styles.img}>
              <img src="/images/Hero/card2.jpg" alt="" />
            </div>
          </div>
        </div>

        {window.innerWidth <= 768 && (
          <div className={styles.heroLogo}>
            <Logo />
            <div className={clsx(styles.trademarkSymbol, 'reveal')}>
              <img src="/images/icons/trademark-symbol.svg" alt="" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
