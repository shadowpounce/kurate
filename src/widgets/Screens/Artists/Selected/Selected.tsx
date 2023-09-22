import clsx from 'clsx'
import styles from './Selected.module.scss'
import { artistsData } from '../../../../data'
import { Button } from '../../../../shared/Button/Button'
import { useContext, useEffect, useRef, useState } from 'react'
import { ArtistsContext } from '../../../../app/providers/ArtistsContext'
import useSplit from '../../../../hooks/useSplit'
import { Swiper as ISwiper } from 'swiper/types'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, Autoplay } from 'swiper'

const MAX_DEGREE = 1
const MAX_OFFSET_X = 20
const MAX_OFFSET_Y = 20

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'
import { MainContext } from '../../../../app/providers/MainContext'

export const Selected = () => {
  const { pageLoaded, setPlayerActive, setAudioPlay, setTrackIndex } =
    useContext(MainContext)
  const { selectedArtist, setSelectedArtist } = useContext(ArtistsContext)

  const [started, setStarted] = useState<boolean>(false)
  const [swiper, setSwiper] = useState<ISwiper>()
  const [activeSlideId, setActiveSlideId] = useState<number>(0)

  const recordTitleRef = useRef<HTMLDivElement>(null)
  const [currentRecordTitle, setCurrentRecordTitle] = useState<string>('')

  const rootRef = useRef<HTMLDivElement>(null)

  const transformed = useRef(false)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedArtist) {
      setCurrentRecordTitle(selectedArtist.tracks[0].title)
    }
  }, [selectedArtist])

  useEffect(() => {
    artistsData && setTimeout(() => setSelectedArtist(artistsData[0]), 0)
  }, [artistsData])

  useEffect(() => {
    if (selectedArtist) {
      setCurrentRecordTitle(selectedArtist.tracks[activeSlideId].title)
    }
  }, [activeSlideId])

  useEffect(() => {
    if (pageLoaded && !started) {
      setTimeout(() => {
        swiper?.autoplay.start()
        setStarted(true)
      }, 1000)
    }
  }, [pageLoaded, started])

  const mouseMove = (ev: React.MouseEvent<HTMLElement>) => {
    const transform = (x: number, y: number, degrees: number) => {
      if (!cardsRef.current) {
        return
      }

      setTimeout(() => {
        if (cardsRef.current) {
          cardsRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${degrees}deg)`
        }
      }, 100)
    }

    const target = ev.currentTarget as HTMLDivElement

    const center = { x: target.offsetWidth / 2, y: target.offsetHeight / 2 }
    const point = { x: ev.clientX, y: ev.clientY }
    const xPoint = point.x - center.x
    const yPoint = point.y - center.y
    const x = (xPoint / center.x) * MAX_OFFSET_X
    const y = (yPoint / center.y) * MAX_OFFSET_Y
    const angle = ((-xPoint + yPoint * 2) / (center.x + center.y)) * MAX_DEGREE

    transform(x, y, angle)
    transformed.current = true
  }

  function selectArtist(id: number) {
    if (rootRef.current) {
      if (!rootRef.current.classList.contains(styles.selecting)) {
        rootRef.current?.classList.add(styles.selecting)

        setTimeout(
          () =>
            setSelectedArtist(artistsData.find((artist) => artist.id === id)),
          400
        )

        setTimeout(
          () => rootRef.current?.classList.remove(styles.selecting),
          1250
        )
      }
    }
  }

  return (
    <section
      onMouseMove={(ev) => window.innerWidth > 768 && mouseMove(ev)}
      id="selected"
      className={clsx('section', styles.selected)}
    >
      <div className="container">
        <div ref={rootRef} className={clsx(styles.wrapper)}>
          <div className={styles.top}>
            <div className={clsx(styles.icon, 'reveal')}>
              <img src="/images/icons/soundwaves.svg" alt="" />
            </div>
            <h5>{useSplit('Our Artists')}</h5>
          </div>
          <div className={clsx(styles.tabs, 'reveal')}>
            {artistsData.slice(0, 3).map((artist) => (
              <div
                onClick={() => selectArtist(artist.id)}
                className={clsx(
                  styles.tab,
                  selectedArtist &&
                    artist.id === selectedArtist.id &&
                    styles.active
                )}
              >
                <span>{artist.title}</span>
              </div>
            ))}
          </div>
          <div className={styles.info}>
            <div className={styles.covers}>
              <div className={clsx(styles.wrap, 'reveal')}>
                <div ref={cardsRef} className={styles.sliderWrapper}>
                  <Swiper
                    onSwiper={(swiper) => {
                      setSwiper(swiper)
                      swiper.autoplay.stop()
                    }}
                    onSlideChange={() => {
                      if (swiper) {
                        setActiveSlideId(swiper.activeIndex)
                      }
                    }}
                    speed={1000}
                    autoplay={
                      pageLoaded && {
                        delay: 2500,
                        disableOnInteraction: false,
                      }
                    }
                    allowTouchMove={false}
                    effect={'cards'}
                    modules={[EffectCards, Autoplay]}
                    className={styles.slider}
                  >
                    {selectedArtist &&
                      selectedArtist.tracks.map((track: any) => (
                        <SwiperSlide
                          onClick={() => {
                            setTrackIndex(track.id)
                            setAudioPlay(true)
                            setPlayerActive(true)
                          }}
                          className={clsx(styles.slide, 'record-cover')}
                        >
                          <img src={track.cover} alt="" />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className={clsx(styles.block, styles.right)}>
              <div className={styles.content}>
                {window.innerWidth > 768 && <div></div>}
                <div ref={recordTitleRef} className={styles.title}>
                  {useSplit(currentRecordTitle ?? '', {
                    duration: 1,
                    delay: 0.075,
                    startDelay: 0.25,
                    ease: 'ease',
                  })}
                </div>
                <p className={clsx(styles.author, 'reveal')}>
                  by <span>{selectedArtist && selectedArtist.title}</span>
                </p>
                <Button>Listen</Button>
              </div>
            </div>
            <div className={clsx(styles.block, styles.bottomLeft)}>
              <div className={styles.content}>
                <div className={styles.title}>
                  {selectedArtist &&
                    selectedArtist.title
                      .split(' ')
                      .map((item: string, idx: number) => (
                        <h2>
                          {idx === 0 && (
                            <div className={styles.circlePhoto}>
                              <div className="reveal">
                                <div className={styles.circle}>
                                  <img
                                    src={
                                      selectedArtist &&
                                      Array.isArray(selectedArtist.media)
                                        ? selectedArtist.media[0]
                                        : selectedArtist.media
                                    }
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="reveal">
                                <div className={styles.circle}></div>
                              </div>
                            </div>
                          )}
                          {useSplit(item, {
                            duration: 0.5,
                            delay: 0.075,
                            startDelay: 0.5 * (idx + 0.25),
                            ease: 'ease',
                          })}
                        </h2>
                      ))}
                </div>
                <p className={clsx('reveal', styles.theme)}>
                  Theme: <span className="hidden-letter"></span>
                  <span>{selectedArtist && selectedArtist.theme}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
