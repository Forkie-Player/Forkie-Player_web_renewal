import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper'

import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/keyboard'
import 'swiper/css/autoplay'

const imageList = [
  'https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg',
  'https://freemusicdownloads.world/wp-content/uploads/2020/03/pop-music-1.jpg',
  'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fd12b3eb0-10ec-11e8-aa39-e7299ff3a5e8.jpg?crop=3000%2C1687%2C0%2C156&resize=1200',
  'https://wallpaperaccess.com/full/2742175.jpg',
]

function CarouselView() {
  return (
    <div className="w-full h-full pr-8">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        slidesPerView={1}
        autoplay
        navigation={{}}
        pagination={{ clickable: true }}
        keyboard
        loop
        className="h-full w-full"
      >
        {imageList.map((image, index) => (
          <SwiperSlide key={index} className="h-full w-full px-[7%] lg:px-[5%]">
            <img src={image} className="h-full w-full rounded-3xl object-cover" alt="slide" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarouselView
