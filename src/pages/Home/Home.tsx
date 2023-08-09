import { useContext, useState } from 'react'
import { HomeContext } from '../../app/providers/HomeContext'
import { HomeScreens } from '../../widgets/Screens/Home'
import { WithFullpage } from '../../app/providers/WithFullpage'
import { MainContext } from '../../app/providers/MainContext'
import { ThreeDCards } from '../../features/ThreeDCards/ThreeDCards'
import { Disc } from '../../entities/Disc/Disc'

export const Home = () => {
  const { setActiveScreen, setDirection } = useContext(MainContext)

  return (
    <HomeContext.Provider value={{}}>
      <WithFullpage
        fullpageOptions={{
          credits: {
            enabled: false,
          },
          onLeave: (origin, destination, direction, trigger) => {
            setActiveScreen(destination.index)
            setDirection(direction)
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
