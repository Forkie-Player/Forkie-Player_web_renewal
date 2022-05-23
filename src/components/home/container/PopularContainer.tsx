import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../../modules/moduleTypes'
import PopularView from '../view/PopularView'
import { screenSizeString } from '../../../lib/constants'
import { IVideo } from '../../../types'

interface IProps {
  popularVideos: IVideo[]
  onClickPopularVideo: (item: IVideo) => void
}

// 한번에 보여줄 슬라이드 개수 계산하기.
// 세로가 긴 화면에서는 적은 수를 보여줌.
const getSlidesPerView = (screenSize: string) => {
  if (window.innerHeight > 2 * window.innerWidth) {
    return 1
  } else if (window.innerHeight > window.innerWidth) {
    return 2
  }
  switch (screenSize) {
    case screenSizeString['3XL']:
    case screenSizeString['2XL']:
    case screenSizeString.XL:
      return 5
    case screenSizeString.LG:
    case screenSizeString.MD:
      return 4
    case screenSizeString.SM:
      return 3
  }
  return 3
}

function PopularContainer({ popularVideos, onClickPopularVideo }: IProps) {
  const screenSize = useSelector(({ screenSize }: RootModuleType) => screenSize)
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView(screenSize))
  const popuperViewRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setSlidesPerView(getSlidesPerView(screenSize))
  }, [screenSize])

  return (
    <PopularView
      ref={popuperViewRef}
      screenSize={screenSize}
      slidesPerView={slidesPerView}
      popularVideos={popularVideos}
      onClickPopularVideo={onClickPopularVideo}
    />
  )
}

export default React.memo(PopularContainer)
