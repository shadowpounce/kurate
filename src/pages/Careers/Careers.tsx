import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../app/providers/HomeContext'
import { HomeScreens } from '../../widgets/Screens/Home'
import { WithFullpage } from '../../app/providers/WithFullpage'
import { MainContext } from '../../app/providers/MainContext'
import { ThreeDCards } from '../../features/ThreeDCards/ThreeDCards'
import { ArtistsContext } from '../../app/providers/ArtistsContext'
import { CareersScreens } from '../../widgets/Screens/Careers'
import { useLocation, useNavigate } from 'react-router-dom'
import { CareersContext } from '../../app/providers/CareersContext'

export const Careers = () => {
  const {
    setActiveScreen,
    setDirection,
    activeScreen,
    setPlayerActive,
    playerActive,
    setCurrentPage,
  } = useContext(MainContext)

  useEffect(() => {
    setCurrentPage('careers')
  }, [])

  return (
    <CareersContext.Provider value={{}}>
      <WithFullpage
        fullpageOptions={{
          credits: {
            enabled: false,
          },
          scrollingSpeed: 1000,
          onLeave: (origin, destination, direction, trigger) => {
            setActiveScreen(destination.index)
            setDirection(direction)
          },
        }}
      >
        <>{CareersScreens.map((screen) => screen)}</>
      </WithFullpage>
    </CareersContext.Provider>
  )
}
