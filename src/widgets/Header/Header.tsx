import { useContext, useEffect } from 'react'
import clsx from 'clsx'
import { SendButton } from '../../entities/SendButton/SendButton'
import { Button } from '../../shared/Button/Button'
import { Logo } from '../../shared/Logo/Logo'
import styles from './Header.module.scss'
import { MainContext } from '../../app/providers/MainContext'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'

const Header = () => {
  const { activeScreen, pageLoaded, currentPage } = useContext(MainContext)

  return (
    <header
      className={clsx(
        styles.header,
        pageLoaded && `animated`,
        activeScreen <= 0 && currentPage === 'home' && styles.hidden,
        pageLoaded && currentPage !== 'home' ? styles.shown : styles.hidden,
        activeScreen >= 1 && currentPage === 'home' && styles.shown
      )}
    >
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
