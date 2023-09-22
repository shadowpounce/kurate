import clsx from 'clsx'
import styles from './Footer.module.scss'
import { Logo } from '../../shared/Logo/Logo'
import { Button } from '../../shared/Button/Button'
import { SendButton } from '../../entities/SendButton/SendButton'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer
      data-start="top 65%"
      data-grid="false"
      className={clsx(styles.footer, 'section')}
    >
      <div className={styles.wrapper}>
        <div className={styles.wrap}>
          <div className={styles.col}>
            <div
              onClick={() => {
                // window.fullpage_api.moveTo(1)
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                })
              }}
              className={styles.logo}
            >
              <Logo />
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
              <li className="reveal">
                <Link to="/">Home</Link>
              </li>
              <li className="reveal">
                <Link to="/artists">Artists</Link>
              </li>
              <li className="reveal">
                <Link to="/careers">Careers</Link>
              </li>
              <Link to="/licenses" className={clsx('reveal', styles.colLogo)}>
                <Logo />
              </Link>
            </ul>
          </div>
          <div className={styles.col}>
            <span className="reveal">Follow</span>
            <ul>
              <li className="reveal">
                <a href="">Twitter</a>
              </li>
              <li className="reveal">
                <a href="">Instagram</a>
              </li>
              <li className="reveal">
                <a
                  href="
                "
                >
                  Facebook
                </a>
              </li>
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
