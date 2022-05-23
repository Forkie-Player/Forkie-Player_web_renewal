/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import clsx from 'clsx'
import { useCallback } from 'react'
import { SwiperSlide } from 'swiper/react'
import { IVideo } from '../../../types'
import VideoInfo from '../../elements/videoInfo'
import VideoThumbnail from '../../elements/VideoThumbnail'

interface IProps {
  item: IVideo
  index: number
  slidesPerView: number
  onClick: (item: IVideo) => void
}

export const PopularVideoItem = ({ index, slidesPerView, item, onClick: onClickCallback }: IProps) => {
  const onClick = useCallback(() => {
    onClickCallback(item)
  }, [item, onClickCallback])

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
      <div className="popularCardContainer flex w-full h-full rounded-2xl bg-background-light drop-shadow-md overflow-hidden ">
        <div className="w-full h-full popularCardContentShinked">
          <VideoThumbnail thumbnail={item.thumbnail} duration={item.duration} />
        </div>
        <div className="absolute w-full h-full bg-background-light popularCardContentExpanded">
          <div className="w-full h-full flex">
            <VideoThumbnail thumbnail={item.thumbnail} duration={item.duration} className="w-1/2" />
            <VideoInfo data={item} className="w-1/2 p-2" />
          </div>
        </div>
      </div>
    </SwiperSlide>
  )
}

PopularVideoItem.displayName = 'SwiperSlide'
