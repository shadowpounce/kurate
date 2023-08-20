import { gsap } from 'gsap'
import MouseFollower from 'mouse-follower'
import { FC, ReactNode, useEffect, useState } from 'react'
import Header from '../../widgets/Header/Header'
import Footer from '../../widgets/Footer/Footer'
import { BackgroundGrid } from '../../shared/BackgroundGrid/BackgroundGrid'
import { Cursor } from '../../shared/Cursor/Cursor'
import { MainContext } from './MainContext'
import { Preloader } from '../../widgets/Preloader/Preloader'
import { Menu } from '../../widgets/Menu/Menu'
import { useLocation } from 'react-router-dom'

MouseFollower.registerGSAP(gsap)

interface IProps {
  children: ReactNode
}

export const Layout: FC<IProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>('')
  const [pageLoaded, setPageLoaded] = useState<boolean>(false)
  const [activeScreen, setActiveScreen] = useState<number>(0)
  const [direction, setDirection] = useState<string>('')
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const [currentTrack, setCurrentTrack] = useState<string>('')
  const [trackIndex, setTrackIndex] = useState<number>(0)
  const [audioPlay, setAudioPlay] = useState<boolean>(false)
  const [shuffleMode, setShuffleMode] = useState<boolean>(false)
  const [repeatMode, setRepeatMode] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>()
  const [currentDuration, setCurrentDuration] = useState<number>()
  const [playerActive, setPlayerActive] = useState<boolean>(false)
  const [hash, setHash] = useState<string>('')

  const location = useLocation()

  if (location.hash && hash === '') {
    setHash(location.hash)
  }

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
        currentTrack,
        setCurrentTrack,
        trackIndex,
        setTrackIndex,
        audioPlay,
        setAudioPlay,
        shuffleMode,
        setShuffleMode,
        repeatMode,
        setRepeatMode,
        currentTime,
        setCurrentTime,
        currentDuration,
        setCurrentDuration,
        playerActive,
        setPlayerActive,
        currentPage,
        setCurrentPage,
        hash,
        setHash,
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
