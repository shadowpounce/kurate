import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../app/providers/HomeContext'
import { HomeScreens } from '../../widgets/Screens/Home'
import { WithFullpage } from '../../app/providers/WithFullpage'
import { MainContext } from '../../app/providers/MainContext'
import { ThreeDCards } from '../../features/ThreeDCards/ThreeDCards'

export const Home = () => {
  const { setCurrentPage } = useContext(MainContext)

  useEffect(() => {
    setCurrentPage('home')
  }, [])

  const {
    setActiveScreen,
    setDirection,
    activeScreen,
    setPlayerActive,
    playerActive,
  } = useContext(MainContext)
  const [discDeployed, setDiscDeployed] = useState<boolean>(false)

  return (
    <HomeContext.Provider
      value={{
        discDeployed,
        setDiscDeployed,
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

            if (destination.index === 4) {
              setPlayerActive(true)
            } else {
              playerActive && setPlayerActive(false)
            }

            if (destination.index === 3 && !discDeployed) {
              window.fullpage_api.setScrollingSpeed(2000)
              setDiscDeployed(true)
            } else {
              window.fullpage_api.setScrollingSpeed(1000)
            }
          },
        }}
      >
        <>
          <ThreeDCards />
          {HomeScreens.map((screen) => screen)}
        </>
      </WithFullpage>
    </HomeContext.Provider>
  )
}
