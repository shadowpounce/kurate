import { gsap } from 'gsap'
import MouseFollower from 'mouse-follower'
import { FC, ReactNode, useState } from 'react'
import Header from '../../widgets/Header/Header'
import Footer from '../../widgets/Footer/Footer'
import { BackgroundGrid } from '../../shared/BackgroundGrid/BackgroundGrid'
import { Cursor } from '../../shared/Cursor/Cursor'
import { MainContext } from './MainContext'
import { Preloader } from '../../widgets/Preloader/Preloader'
import { Menu } from '../../widgets/Menu/Menu'

MouseFollower.registerGSAP(gsap)

interface IProps {
  children: ReactNode
}

export const Layout: FC<IProps> = ({ children }) => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false)
  const [activeScreen, setActiveScreen] = useState<number>(0)
  const [direction, setDirection] = useState<string>('')
  const [menuActive, setMenuActive] = useState<boolean>(false)

  return (
    <MainContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        direction,
        setDirection,
        pageLoaded,
        setPageLoaded,
        menuActive,
        setMenuActive,
      }}
    >
      <Preloader />
      <Cursor />
      <Menu />
      <Header />
      {children}
      <BackgroundGrid />
    </MainContext.Provider>
  )
}
