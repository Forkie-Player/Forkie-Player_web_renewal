import React, { forwardRef } from 'react'
import { Scrollbar, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IVideo } from '../../../types'

import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import { PopularVideoItem } from '../elements/PopularVideoItem'

interface IProps {
  screenSize: string
  slidesPerView: number
  popularVideos: IVideo[]
  onClickPopularVideo: (item: IVideo) => void
}

const PopularView = forwardRef<HTMLDivElement, IProps>(
  ({ popularVideos, slidesPerView, onClickPopularVideo }: IProps, ref) => {
    return (
      <div ref={ref} className="w-full h-full px-[5%] flex flex-col">
        <div className="py-4 text-xl font-bold">Popular</div>
        <Swiper
          modules={[Scrollbar, Mousewheel]}
          slidesPerView={slidesPerView}
          scrollbar={{ dragClass: 'swiper-scrollbar-drag bg-blackberry-lightest' }}
          mousewheel
          className="w-full flex-1"
        >
          {popularVideos.map((item, index) => (
            <PopularVideoItem
              key={index}
              item={item}
              index={index}
              slidesPerView={slidesPerView}
              onClick={onClickPopularVideo}
            />
          ))}
          <SwiperSlide />
        </Swiper>
      </div>
    )
  },
)

export default PopularView
