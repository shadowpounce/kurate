import clsx from 'clsx'
import styles from './Menu.module.scss'
import { navLinks } from '../../data'
import { useContext, useEffect } from 'react'
import { MainContext } from '../../app/providers/MainContext'
import { pages } from '../../pages'
import { SendButton } from '../../entities/SendButton/SendButton'
import { MusicPlayer } from '../../features/MusicPlayer/MusicPlayer'
import { Cubes } from '../../shared/Cubes/Cubes'

export const Menu = () => {
  const {
    menuActive,
    setMenuActive,
    pageLoaded,
    playerActive,
    setPlayerActive,
    currentPage,
    activeScreen,
  } = useContext(MainContext)

  useEffect(() => {
    if (activeScreen === 4) {
      setPlayerActive(true)
    } else {
      setPlayerActive(false)
    }
  }, [pageLoaded, activeScreen])

  const toggleMenu = () => {
    menuActive ? setMenuActive(false) : setMenuActive(true)
  }

  const toScreen = (id: string) => {
    const screen = document.querySelector<HTMLDataElement>(id)

    const toSection = document.querySelector<HTMLDivElement>(
      `*[data-screen="${screen?.dataset.screen}"]`
    )

    if (toSection) {
      window.scrollTo({
        left: 0,
        top: toSection.offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <menu
      className={clsx(
        styles.menu,
        pageLoaded && styles.loaded,
        playerActive && styles.toPlayer,
        window.innerWidth <= 768 && menuActive && styles.mobileOpened
      )}
    >
      <div className={styles.content}>
        <div className={clsx(styles.dropdownMenu, menuActive && styles.opened)}>
          <div className={styles.body}>
            <div className={styles.col}>
              <span>Explore</span>
              <ul>
                {pages.map((page) => (
                  <li>
                    <a href={page.path}>{page.title}</a>
                    {page.title.toLowerCase() === currentPage && (
                      <ul className={styles.mobileList}>
                        {currentPage &&
                          navLinks[currentPage.toLowerCase()].map(
                            (link: any) => (
                              <li
                                onClick={(ev) => {
                                  ev.preventDefault()
                                  toggleMenu()
                                  toScreen(link.href)
                                }}
                                className={styles.navItem}
                              >
                                <a href={link.href}>{link.title}</a>
                              </li>
                            )
                          )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {window.innerWidth > 768 ? (
              <>
                <div className={styles.col}>
                  <span>Follow</span>
                  <ul>
                    <li>
                      <a href="">Twitter</a>
                    </li>
                    <li>
                      <a href="">Instagram</a>
                    </li>
                    <li>
                      <a href="">Facebook</a>
                    </li>
                  </ul>
                </div>
                <div className={styles.col}>
                  <span>Join us</span>
                  <ul>
                    <SendButton withAnim={false} />
                  </ul>
                </div>
              </>
            ) : (
              <div className={styles.mobileCol}>
                <div className={styles.col}>
                  <span>Join us</span>
                  <ul>
                    <SendButton withAnim={false} />
                  </ul>
                </div>
                <div className={styles.col}>
                  <span>Follow</span>
                  <ul>
                    <li>
                      <a href="">Twitter</a>
                    </li>
                    <li>
                      <a href="">Instagram</a>
                    </li>
                    <li>
                      <a href="">Facebook</a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={clsx(styles.panels, menuActive && styles.menuOpened)}>
          <div className={clsx(styles.panel, styles.nav)}>
            <nav>
              <li
                onClick={() => toggleMenu()}
                className={clsx(styles.navItem, styles.menuButton)}
              >
                <div className={styles.burger}>
                  <img src="/images/icons/burger.svg" alt="" />
                </div>
                <span>
                  {menuActive
                    ? 'Menu'
                    : `${
                        currentPage.slice(0, 1).toUpperCase() +
                        currentPage.slice(1)
                      }`}
                </span>
              </li>
              {currentPage &&
                navLinks[currentPage.toLowerCase()].map((link: any) => (
                  <li
                    onClick={(ev) => {
                      ev.preventDefault()

                      toScreen(link.href)
                    }}
                    className={styles.navItem}
                  >
                    <a href={link.href}>{link.title}</a>
                  </li>
                ))}
              <li
                onClick={() => {
                  setPlayerActive(true)
                }}
                className={clsx(styles.navItem, styles.playerSwitch)}
              >
                <div className={styles.line}></div>
                <Cubes />
              </li>
            </nav>
            <div
              onClick={() => toggleMenu()}
              className={clsx(styles.closeButton, menuActive && styles.shown)}
            >
              <img src="/images/icons/menu-close.svg" alt="" />
            </div>
          </div>
          <div className={styles.panel}>
            <MusicPlayer />
          </div>
        </div>
      </div>
    </menu>
  )
}
