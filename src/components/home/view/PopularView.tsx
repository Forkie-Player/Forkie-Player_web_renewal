import React, { useMemo } from 'react'
import { Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/scrollbar'

const popularList = [
  {
    id: 1,
    color: 'bg-redrose',
  },
  { id: 2, color: 'bg-redrose-light' },
  { id: 4, color: 'bg-blackberry-light' },
  { id: 5, color: 'bg-blackberry' },
  { id: 6, color: 'bg-blackberry-lightest' },
  { id: 7, color: 'bg-redrose-dark' },
  { id: 8, color: 'bg-background-dark' },
]

interface IProps {
  screenSize: string
  slidesPerView: number
}

function PopularView({ screenSize, slidesPerView }: IProps) {
  return (
    <div className="w-full h-3/6 px-[5%]">
      <div className="py-8">Popular</div>
      <Swiper
        // install Swiper modules
        modules={[Scrollbar]}
        slidesPerView={slidesPerView}
        scrollbar
        className="h-2/3 w-full"
      >
        {popularList.map((item, index) => (
          <SwiperSlide key={index} className="h-60 w-60 drop-shadow-md">
            <div className={`h-60 w-60 rounded-3xl drop-shadow-xl ${item.color}`}></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default PopularView
