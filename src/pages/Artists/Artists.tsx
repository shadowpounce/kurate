import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../app/providers/HomeContext'
import { HomeScreens } from '../../widgets/Screens/Home'
import { WithFullpage } from '../../app/providers/WithFullpage'
import { MainContext } from '../../app/providers/MainContext'
import { ThreeDCards } from '../../features/ThreeDCards/ThreeDCards'
import { ArtistsContext } from '../../app/providers/ArtistsContext'
import { ArtistsScreens } from '../../widgets/Screens/Artists'
import { useLocation, useNavigate } from 'react-router-dom'

export const Artists = () => {
  const {
    setActiveScreen,
    setDirection,
    activeScreen,
    setPlayerActive,
    playerActive,
    setCurrentPage,
  } = useContext(MainContext)
  const [selectedArtist, setSelectedArtist] = useState<any>()

  useEffect(() => {
    setCurrentPage('artists')
  }, [])

  return (
    <ArtistsContext.Provider
      value={{
        selectedArtist,
        setSelectedArtist,
      }}
    >
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
        <>{ArtistsScreens.map((screen) => screen)}</>
      </WithFullpage>
    </ArtistsContext.Provider>
  )
}
