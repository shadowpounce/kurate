import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../app/providers/HomeContext'
import { HomeScreens } from '../../widgets/Screens/Home'
import { WithFullpage } from '../../app/providers/WithFullpage'
import { MainContext } from '../../app/providers/MainContext'
import { ThreeDCards } from '../../features/ThreeDCards/ThreeDCards'
import { WithScrollSmoother } from '../../app/providers/WithScrollSmoother'
import { BackgroundGrid } from '../../shared/BackgroundGrid/BackgroundGrid'

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
    pageLoaded,
  } = useContext(MainContext)
  const [discDeployed, setDiscDeployed] = useState<boolean>(false)

  // useEffect(() => {
  //   const waterLogo =
  //     document.querySelector<HTMLCanvasElement>('#root > canvas')

  //   if (pageLoaded && waterLogo) {
  //     waterLogo.className = `in`
  //   }
  // }, [pageLoaded])

  return (
    <HomeContext.Provider
      value={{
        discDeployed,
        setDiscDeployed,
      }}
    >
      <WithScrollSmoother>
        <ThreeDCards />
        {HomeScreens.map((screen) => screen)}
      </WithScrollSmoother>

      {/* <WithFullpage
        fullpageOptions={{
          credits: {
            enabled: false,
          },
          scrollingSpeed: 1000,
          onLeave: (origin, destination, direction, trigger) => {
            setActiveScreen(destination.index)
            setDirection(direction)

            const waterLogo =
              document.querySelector<HTMLCanvasElement>('#root > canvas')

            if (destination.index === 0) {
              if (waterLogo) {
                waterLogo.className = `in`
              }
            } else if (destination.index !== 0) {
              if (waterLogo) {
                waterLogo.className = `out`
              }
            }

            if (destination.index === 1) {
              window.fullpage_api.setScrollingSpeed(5000)
            } else {
              window.fullpage_api.setScrollingSpeed(1000)
            }

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
    
      </WithFullpage> */}
    </HomeContext.Provider>
  )
}
