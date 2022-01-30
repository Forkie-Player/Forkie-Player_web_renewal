/** @jsxImportSource @emotion/react */
import React from 'react'
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
      className={clsx('p-2 pb-4 aspect-square hover:aspect-[2/1] hover:cursor-pointer')}
      css={css`
        &:hover {
          transition: width 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          width: ${(2 / slidesPerView) * 100}% !important;
        }
        &:not(:hover) {
          transition: aspect-ratio 0s 0.15s, width 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          width: ${(1 / slidesPerView) * 100}% !important;
        }
      `}
      onClick={onClick}
    >
      <div className="popularCardContainer w-full h-full rounded-2xl bg-background-light drop-shadow-md overflow-hidden flex">
        <div className="w-full h-full flex flex-col popularCardContentShinked">
          <div className="relative h-full w-full ">
            <img src={item.thumbnail} alt="thumbnail" className="h-full w-full object-cover" />
            <div className="absolute right-2 bottom-2 text-white">{item.duration}</div>
          </div>
        </div>
        <div className="absolute w-full h-full bg-background-light popularCardContentExpanded">
          <div className="relative flex-1">
            <img src={item.thumbnail} alt="thumbnail" className="h-full w-full object-cover" />
            <div className="absolute right-2 bottom-2 text-white">{item.duration}</div>
          </div>
          <VideoInfo data={item} className="flex-1 p-2 " />
        </div>
      </div>
    </SwiperSlide>
  )
}

PopularVideoItem.displayName = 'SwiperSlide'
