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

interface WheelEvent<T = Element> extends MouseEvent<T, NativeWheelEvent> {
  deltaMode: number
  deltaX: number
  deltaY: number
  deltaZ: number
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

    const revealContainers = Array.from(
      document.querySelectorAll<HTMLDataElement>('.reveal-container')
    )

    sections.map((section, idx) => (section.dataset.screen = `${idx}`))

    revealContainers.map(
      (section, idx) => (section.dataset.revealContainer = `${idx}`)
    )
  }, [])

  useEffect(() => {
    if (pageLoaded) {
      const section = document.querySelector(`*[data-screen="${activeScreen}"]`)

      if (section && !section.classList.contains('animated')) {
        section.classList.add('animated')
      }
    }

    const revealContainer = document.querySelector(
      `*[data-reveal-container="0"]`
    )

    if (revealContainer && !revealContainer.classList.contains('animated')) {
      revealContainer.classList.add('animated')
    }
  }, [activeScreen, pageLoaded])

  useEffect(() => {
    const scrollableElements = Array.from(
      document.querySelectorAll('*[data-scrollable="true"]')
    )

    if (scrollableElements) {
      scrollableElements.forEach((element) => {
        element.addEventListener('wheel', (ev) => {
          window.fullpage_api.setAllowScrolling(false)

          if (ev.deltaY < 0) {
            element.scrollTop = element.scrollTop - 25
          }

          if (ev.deltaY > 0) {
            element.scrollTop = element.scrollTop + 25
          }
        })

        element.addEventListener('mouseenter', (ev) => {
          window.fullpage_api.setAllowScrolling(false)
        })

        element.addEventListener('mouseleave', (ev) => {
          window.fullpage_api.setAllowScrolling(true)
        })
      })
    }
  }, [])
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
