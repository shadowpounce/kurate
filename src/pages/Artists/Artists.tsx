import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../app/providers/HomeContext'
import { HomeScreens } from '../../widgets/Screens/Home'
import { WithFullpage } from '../../app/providers/WithFullpage'
import { MainContext } from '../../app/providers/MainContext'
import { ThreeDCards } from '../../features/ThreeDCards/ThreeDCards'
import { ArtistsContext } from '../../app/providers/ArtistsContext'
import { ArtistsScreens } from '../../widgets/Screens/Artists'
import { useLocation, useNavigate } from 'react-router-dom'
import { WithScrollSmoother } from '../../app/providers/WithScrollSmoother'

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
      <WithScrollSmoother>
        {ArtistsScreens.map((screen) => screen)}
      </WithScrollSmoother>
    </ArtistsContext.Provider>
  )
}
