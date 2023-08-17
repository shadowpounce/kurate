import { gsap } from 'gsap'
import MouseFollower from 'mouse-follower'
import { FC, ReactNode, useState } from 'react'
import Header from '../../widgets/Header/Header'
import Footer from '../../widgets/Footer/Footer'
import { BackgroundGrid } from '../../shared/BackgroundGrid/BackgroundGrid'
import { Cursor } from '../../shared/Cursor/Cursor'
import { MainContext } from './MainContext'

MouseFollower.registerGSAP(gsap)

interface IProps {
  children: ReactNode
}

export const Layout: FC<IProps> = ({ children }) => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false)
  const [activeScreen, setActiveScreen] = useState<number>(0)
  const [direction, setDirection] = useState<string>('')

  return (
    <MainContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        direction,
        setDirection,
        pageLoaded,
        setPageLoaded,
      }}
    >
      <Cursor />
      <Header />
      {children}
      <BackgroundGrid />
    </MainContext.Provider>
  )
}
