import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Scrollbar, Mousewheel } from 'swiper'
import './ArtistsSlider.scss'
import { artistsData } from '../../data'
import { ArtistsSliderCard } from '../../entities/ArtistsSliderCard/ArtistsSliderCard'

export const ArtistsSlider = () => {
  return (
    <div className="artists-slider">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        allowTouchMove={true}
        slidesPerView={window.innerWidth > 768 ? 3 : 'auto'}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Mousewheel, Scrollbar]}
        className="mySwiper"
      >
        {artistsData.map((artist, idx) => (
          <SwiperSlide className="artists-slider__slide">
            <ArtistsSliderCard
              id={idx + 1}
              title={artist.title}
              text={artist.text}
              media={artist.media}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
