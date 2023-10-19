import { FC, ReactNode, useContext, useEffect } from 'react'
import gsap from 'gsap'
import { MainContext } from './MainContext'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

interface IProps {
  children: ReactNode
}

export const WithScrollSmoother: FC<IProps> = ({ children }) => {
  const { setActiveScreen, pageLoaded, hash } = useContext(MainContext)

  useEffect(() => {
    if (hash !== '' && pageLoaded) {
      if (document.querySelector(hash)) {
        const querySection = document.querySelector<HTMLDivElement>(hash)

        if (querySection) {
          window.scrollTo({
            left: 0,
            top: querySection.offsetTop,
            behavior: 'smooth',
          })
        }
      }
    }
  }, [hash, pageLoaded])

  useEffect(() => {
    if (ScrollSmoother) {
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,
      })
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (pageLoaded) {
        setTimeout(() => document.body.classList.add('page-loaded'), 0)

        const sections = Array.from(
          document.querySelectorAll<HTMLDivElement>('.section')
        )

        sections.map((section, idx) => {
          section.dataset.screen = `${idx}`

          ScrollTrigger.create({
            trigger: section,
            start: section.dataset.start ?? `top 25%`,
            end: section.dataset.end ?? 'bottom bottom',
            onEnter: () => {
              setActiveScreen(idx)
              !section.classList.contains('animated') &&
                section.classList.add('animated')
            },
            onEnterBack: () => {
              setActiveScreen(idx)
            },
          })
        })
      }

      if (!pageLoaded) {
        document.body.style.overflowY = `hidden`
      }
    })

    return () => ctx.revert()
  }, [pageLoaded])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
