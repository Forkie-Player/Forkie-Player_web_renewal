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
      className={clsx('p-2 pb-4 aspect-square transition-all hover:aspect-[2/1] hover:cursor-pointer')}
      css={css`
        &:hover {
          width: ${(2 / slidesPerView) * 100}% !important;
        }
      `}
      onClick={onClick}
    >
      <div className="w-full h-full rounded-2xl bg-background-light drop-shadow-md overflow-hidden flex popularCardContainer">
        <div className="w-full h-full popularCardContentShinked">
          <img src={item.thumbnail} alt="thumbnail" className="w-full max-h-[70%] object-cover" />
          <div className="line-clamp-2 p-1">{item.title}</div>
        </div>
        <div className="absolute w-full h-full bg-background-light text-blackberry popularCardContentExpanded">
          <img src={item.thumbnail} alt="thumbnail" className="h-full w-1/2 object-cover" />
          <VideoInfo data={item} className="w-full p-2 " />
        </div>
      </div>
    </SwiperSlide>
  )
}

PopularVideoItem.displayName = 'SwiperSlide'
