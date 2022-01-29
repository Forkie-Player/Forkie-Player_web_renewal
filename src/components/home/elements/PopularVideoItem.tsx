/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import clsx from 'clsx'
import { useCallback } from 'react'
import { SwiperSlide } from 'swiper/react'
import { IVideo } from '../../../types'
import VideoInfo from '../../elements/videoInfo'

interface IProps {
  item: IVideo
  index: number
  slidesPerView: number
  onClickPopularVideo: (item: IVideo) => void
}

export const PopularVideoItem = ({ index, slidesPerView, item, onClickPopularVideo }: IProps) => {
  const onClick = useCallback(() => {
    onClickPopularVideo(item)
  }, [item, onClickPopularVideo])

  return (
    <SwiperSlide
      key={index}
      className={clsx('populuarSlide p-2 pb-4  transition-[width] hover:aspect-[2/1] hover:cursor-pointer')}
      css={css`
        &:hover {
          width: ${(2 / slidesPerView) * 100}% !important;
        }
      `}
      onClick={onClick}
    >
      <div className="w-full h-full rounded-2xl bg-background-light drop-shadow-md overflow-hidden flex popularCardContainer">
        <div className="w-full h-full popularCardContentShinked">
          <div className="relative max-h-[70%] w-full ">
            <img src={item.thumbnail} alt="thumbnail" className="h-full w-full object-cover" />
            <div className="absolute right-2 bottom-2 text-white">{item.duration}</div>
          </div>
          <div className="line-clamp-2 p-1">{item.title}</div>
        </div>
        <div className="absolute w-full h-full bg-background-light text-blackberry popularCardContentExpanded">
          <div className="relative h-full min-w-1/2 max-w-[50%] ">
            <img src={item.thumbnail} alt="thumbnail" className="h-full w-full object-cover" />
            <div className="absolute right-2 bottom-2 text-white">{item.duration}</div>
          </div>
          <VideoInfo data={item} className="w-full p-2 " />
        </div>
      </div>
    </SwiperSlide>
  )
}

PopularVideoItem.displayName = 'SwiperSlide'
