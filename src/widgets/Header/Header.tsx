import { useContext, useEffect } from 'react'
import clsx from 'clsx'
import { SendButton } from '../../entities/SendButton/SendButton'
import { Button } from '../../shared/Button/Button'
import { Logo } from '../../shared/Logo/Logo'
import styles from './Header.module.scss'
import { MainContext } from '../../app/providers/MainContext'

const Header = () => {
  const { activeScreen, pageLoaded } = useContext(MainContext)

  return (
    <header
      className={clsx(
        styles.header,
        pageLoaded && `animated`,
        activeScreen <= 0 ? styles.hidden : styles.shown
      )}
    >
      <div
        onClick={() => window.fullpage_api.moveTo(1)}
        className={styles.logo}
      >
        <Logo />
      </div>
      <SendButton />
    </header>
  )
}

export default Header
