import clsx from 'clsx'
import styles from './Menu.module.scss'
import { navLinks } from '../../data'
import { useContext, useEffect, useRef } from 'react'
import { MainContext } from '../../app/providers/MainContext'
import { pages } from '../../pages'
import { SendButton } from '../../entities/SendButton/SendButton'
import { MusicPlayer } from '../../features/MusicPlayer/MusicPlayer'
import { Cubes } from '../../shared/Cubes/Cubes'
import { Link } from 'react-router-dom'

export const Menu = () => {
  const {
    menuActive,
    setMenuActive,
    pageLoaded,
    playerActive,
    setPlayerActive,
    currentPage,
    activeScreen,
    audioPlay,
  } = useContext(MainContext)

  const navPanelRef = useRef<HTMLDivElement>(null)
  const dropdownMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeScreen === 4) {
      setMenuActive(false)
      setPlayerActive(true)
    } else {
      setPlayerActive(false)
    }
  }, [pageLoaded, activeScreen])

  useEffect(() => {
    if (window.innerWidth > 768) {
      const dropdownMenuHeight = dropdownMenuRef.current?.offsetHeight
      const navPanelHeight = navPanelRef.current?.offsetHeight

      if (navPanelRef.current && navPanelHeight && dropdownMenuHeight) {
        if (menuActive) {
          navPanelRef.current.style.height = `${
            navPanelHeight + dropdownMenuHeight
          }px`
        }

        if (!menuActive) {
          if (navPanelRef.current) {
            // navPanelRef.current.removeAttribute('style')
            navPanelRef.current.style.height = `${'7.5vh'}`
          }
        }
      }
    }
  }, [menuActive])

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
        window.innerWidth <= 768 && menuActive && styles.mobileOpened,
        window.innerWidth > 768 && menuActive && styles.menuOpened
      )}
    >
      <div className={styles.content}>
        {window.innerWidth <= 768 && (
          <div
            ref={dropdownMenuRef}
            className={clsx(styles.dropdownMenu, menuActive && styles.opened)}
          >
            <div className={styles.body}>
              <div className={clsx(styles.col, styles.pages)}>
                <span>Explore</span>
                <ul>
                  {pages.map((page) => (
                    <li>
                      <Link to={page.path}>{page.title}</Link>
                      {page.title.toLowerCase() === currentPage && (
                        <ul className={styles.mobileList}>
                          {currentPage &&
                            navLinks[currentPage.toLowerCase()].map(
                              (link: any) => (
                                <li
                                  onClick={() => {
                                    toggleMenu()
                                    toScreen(link.href)
                                  }}
                                  className={styles.navItem}
                                >
                                  <Link to={link.href}>{link.title}</Link>
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
        )}
        <div className={clsx(styles.panels, menuActive && styles.menuOpened)}>
          <div ref={navPanelRef} className={clsx(styles.panel, styles.nav)}>
            {window.innerWidth > 768 && (
              <div
                ref={dropdownMenuRef}
                className={clsx(
                  styles.dropdownMenu,
                  menuActive && styles.opened
                )}
              >
                <div className={styles.body}>
                  <div className={clsx(styles.col, styles.pages)}>
                    <span>Explore</span>
                    <ul>
                      {pages.map((page) => (
                        <li>
                          <Link
                            onClick={(ev) => {
                              setMenuActive(false)
                              if (page.title.toLowerCase() === currentPage) {
                                window.scrollTo({
                                  left: 0,
                                  top: 0,
                                  behavior: 'smooth',
                                })
                              } else {
                                if (page.title.toLowerCase() === 'home') {
                                  window.initWaterLogo()
                                }
                              }
                            }}
                            to={page.path}
                          >
                            {page.title}
                          </Link>
                          {page.title.toLowerCase() === currentPage && (
                            <ul className={styles.mobileList}>
                              {currentPage &&
                                navLinks[currentPage.toLowerCase()].map(
                                  (link: any) => (
                                    <li
                                      onClick={(ev) => {
                                        setMenuActive(false)
                                        ev.preventDefault()
                                        toggleMenu()
                                        toScreen(link.href)
                                      }}
                                      className={styles.navItem}
                                    >
                                      <Link to={link.href}>{link.title}</Link>
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
            )}
            <nav>
              <div
                onClick={() => toggleMenu()}
                className={clsx(styles.closeButton, menuActive && styles.shown)}
              >
                <img src="/images/icons/menu-close.svg" alt="" />
              </div>
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
                    onClick={() => {
                      toScreen(link.href)
                    }}
                    className={styles.navItem}
                  >
                    <Link to={link.href}>{link.title}</Link>
                  </li>
                ))}
              <li
                onClick={(ev) => {
                  const target = ev.target as HTMLDivElement

                  if (
                    target.classList.contains('player-switch-action-button')
                  ) {
                    if (!audioPlay) {
                      setPlayerActive(true)
                    }
                  } else {
                    setPlayerActive(true)
                  }
                }}
                className={clsx(styles.navItem, styles.playerSwitch)}
              >
                <div className={styles.line}></div>
                <Cubes />
              </li>
            </nav>
          </div>
          <div className={styles.panel}>
            <MusicPlayer />
          </div>
        </div>
      </div>
    </menu>
  )
}
