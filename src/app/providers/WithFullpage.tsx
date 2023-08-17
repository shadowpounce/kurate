import React, { useContext, useEffect } from 'react'
import { gsap } from 'gsap'
import ReactFullpage from '@fullpage/react-fullpage'
import { IFullpageOptions } from '../../interfaces/IFullpageOptions.interface'
import { MainContext } from './MainContext'
import Footer from '../../widgets/Footer/Footer'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

interface IProps {
  children: React.ReactNode
  fullpageOptions?: IFullpageOptions
}

export const WithFullpage: React.FC<IProps> = ({
  children,
  fullpageOptions,
}) => {
  const { activeScreen, pageLoaded, setPageLoaded } = useContext(MainContext)

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLDataElement>('.section')
    )

    sections.map((section, idx) => (section.dataset.screen = `${idx}`))
  }, [])

  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 500)
  }, [])

  useEffect(() => {
    if (pageLoaded) {
      const section = document.querySelector(`*[data-screen="${activeScreen}"]`)

      if (section && !section.classList.contains('animated')) {
        section.classList.add('animated')
      }
    }
  }, [activeScreen, pageLoaded])

  return (
    <ReactFullpage
      credits={{
        enabled: false,
      }}
      {...fullpageOptions}
      licenseKey={'YOUR_KEY_HERE'}
      scrollingSpeed={1000} /* Options here */
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <>
              {children}
              <Footer />
            </>
          </ReactFullpage.Wrapper>
        )
      }}
    />
  )
}
