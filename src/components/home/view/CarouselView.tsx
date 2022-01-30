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
    <div className="w-full h-full px-1">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        slidesPerView={1}
        navigation={{}}
        pagination={{ clickable: true }}
        keyboard
        loop
        className="h-full w-full"
      >
        {imageList.map((image, index) => (
          <SwiperSlide key={index} className="h-full w-full">
            <ImageFallback src={image} className="h-full w-full rounded-3xl object-cover" alt="slide" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarouselView
