import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper'
import landingFirst from '../../../assets/images/landing_first.png'

import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/keyboard'
import 'swiper/css/autoplay'
import ImageFallback from '../../elements/ImageFallback'

const imageList = [landingFirst]

function CarouselView() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Keyboard, Autoplay]}
      slidesPerView={1}
      navigation={{}}
      pagination={{ clickable: true }}
      keyboard
      loop
      className="h-full w-full px-1"
    >
      {imageList.map(image => (
        <SwiperSlide key={image.slice(-10)} className="h-full w-full">
          <ImageFallback src={image} className="h-full w-full rounded-3xl object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default React.memo(CarouselView)
