import React, { forwardRef } from 'react'
import { Scrollbar, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'

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

const PopularView = forwardRef<HTMLDivElement, IProps>(({ screenSize, slidesPerView }: IProps, ref) => {
  return (
    <div ref={ref} className="w-full h-full max-h-full px-[5%] flex flex-col">
      <div className="py-4 text-xl">Popular</div>
      <Swiper
        // install Swiper modules
        modules={[Scrollbar, Mousewheel]}
        slidesPerView={slidesPerView}
        scrollbar={{ dragClass: 'swiper-scrollbar-drag bg-blackberry-lightest' }}
        mousewheel
        className="w-full"
      >
        {popularList.map((item, index) => (
          <SwiperSlide key={index} className="p-4">
            <div
              className={`aspect-square max-w-full max-h-full rounded-3xl drop-shadow-xl ${item.color}
            hover:drop-shadow-2xl
            hover:ring-4
            hover:ring-redrose
            `}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
})

export default PopularView
