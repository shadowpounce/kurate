import { useContext, useState } from 'react'
import { HomeContext } from '../../app/providers/HomeContext'
import { HomeScreens } from '../../widgets/Screens/Home'
import { WithFullpage } from '../../app/providers/WithFullpage'
import { MainContext } from '../../app/providers/MainContext'
import { ThreeDCards } from '../../features/ThreeDCards/ThreeDCards'

export const Home = () => {
  const { setActiveScreen, setDirection, activeScreen } =
    useContext(MainContext)
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
          {/* <Disc /> */}
          <ThreeDCards />
          {HomeScreens.map((screen) => screen)}
        </>
      </WithFullpage>
    </HomeContext.Provider>
  )
}
