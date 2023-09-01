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
  const { activeScreen, pageLoaded, hash } = useContext(MainContext)

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
    if (hash !== '') {
      if (document.querySelector(hash)) {
        window.fullpage_api.moveTo(
          Number(
            document.querySelector<HTMLDataElement>(hash)?.dataset.screen
          ) + 1
        )
      }
    }
  }, [hash])

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

    if (window.innerWidth > 768) {
      if (scrollableElements) {
        scrollableElements.forEach((element) => {
          element.addEventListener('wheel', (ev) => {
            const wheelEvent = ev as WheelEvent

            const deltaY = wheelEvent.deltaY

            window.fullpage_api.setAllowScrolling(false)

            if (deltaY < 0) {
              element.scrollTop = element.scrollTop - 25
            }

            if (deltaY > 0) {
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
    }

    if (window.innerWidth <= 768) {
      window.addEventListener('touchstart', (ev) => {
        const target = ev.target as HTMLDivElement

        if (
          target.closest('*[data-scrollable="true"]') ||
          target.dataset.scrollable === 'true'
        ) {
          window.fullpage_api.setAllowScrolling(false)
          console.log('blocked')
        } else {
          window.fullpage_api.setAllowScrolling(true)
        }
      })

      window.addEventListener('touchend', (ev) => {
        const target = ev.target as HTMLDivElement

        if (
          target.closest('*[data-scrollable="true"]') ||
          target.dataset.scrollable === 'true'
        ) {
          window.fullpage_api.setAllowScrolling(false)
          console.log('blocked')
        } else {
          window.fullpage_api.setAllowScrolling(true)
        }
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
