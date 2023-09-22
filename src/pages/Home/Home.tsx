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
    </HomeContext.Provider>
  )
}
