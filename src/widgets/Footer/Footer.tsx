import clsx from 'clsx'
import styles from './Footer.module.scss'
import { Logo } from '../../shared/Logo/Logo'
import { Button } from '../../shared/Button/Button'
import { SendButton } from '../../entities/SendButton/SendButton'

const Footer = () => {
  return (
    <footer data-grid="false" className={clsx(styles.footer, 'section')}>
      <div className={styles.wrapper}>
        <div className={styles.wrap}>
          <div className={styles.col}>
            <div
              onClick={() => {
                window.fullpage_api.moveTo(1)
              }}
              className={styles.logo}
            >
              <Logo cover={true} />
            </div>
            <div className="reveal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="2"
                viewBox="0 0 29 2"
                fill="none"
              >
                <path
                  d="M1 1H27.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              <p>Dynamic record label</p>
            </div>
          </div>
        </div>
        <div className={styles.wrap}>
          <div className={styles.col}>
            <span className="reveal">Explore</span>
            <ul>
              <li className="reveal">Home</li>
              <li className="reveal">Artists</li>
              <li className="reveal">Careers</li>
            </ul>
          </div>
          <div className={styles.col}>
            <span className="reveal">Follow</span>
            <ul>
              <li className="reveal">Twitter</li>
              <li className="reveal">Instagram</li>
              <li className="reveal">Facebook</li>
            </ul>
          </div>
          <div className={styles.col}>
            <span className="reveal">Join us</span>
            <ul>
              <li className="reveal">
                <SendButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
