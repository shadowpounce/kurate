import { useContext, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { SendButton } from '../../entities/SendButton/SendButton'
import { Button } from '../../shared/Button/Button'
import { Logo } from '../../shared/Logo/Logo'
import styles from './Header.module.scss'
import { MainContext } from '../../app/providers/MainContext'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'

const Header = () => {
  const { activeScreen, pageLoaded, currentPage } = useContext(MainContext)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = ref.current

    if (header) {
      if (pageLoaded) {
        if (currentPage === 'home') {
          if (activeScreen > 0) {
            header.classList.add(styles.shown)
          }

          if (activeScreen === 0) {
            header.classList.remove(styles.shown)
          }
        }

        if (currentPage !== 'home') {
          header.classList.add(styles.shown)
        }
      }
    }
  }, [activeScreen, pageLoaded, currentPage])

  return (
    <header ref={ref} className={clsx(styles.header, pageLoaded && `animated`)}>
      <div
        onClick={() => {
          currentPage === 'home'
            ? window.fullpage_api.moveTo(1)
            : (location.href = '/')
        }}
        className={styles.logo}
      >
        <Logo />
      </div>
      <SendButton />
    </header>
  )
}

export default Header
