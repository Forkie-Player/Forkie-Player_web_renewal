import CarouselContainer from './container/CarouselContainer'
import PopularContainer from './container/PopularContainer'

import { useSelector } from 'react-redux'
import { RootModuleType } from '../../modules/moduleTypes'
import { useCallback } from 'react'
import { IVideo } from '../../types'
import { useNavigate } from 'react-router-dom'
import { NavAbsolutePathItems } from '../../lib/constants'

import 'swiper/css'
import './index.css'

function HomeComponent() {
  const popularVideos = useSelector(({ popularVideos }: RootModuleType) => popularVideos.items)
  const navigate = useNavigate()
  const onClickPopularVideo = useCallback(
    (popularVideo: IVideo) => {
      navigate(NavAbsolutePathItems.VIDEO_ADD, { state: popularVideo })
    },
    [navigate],
  )

  return (
    <div className="w-full h-full grid grid-rows-[60%_40%] grid-cols-1">
      <CarouselContainer />
      <PopularContainer popularVideos={popularVideos} onClickPopularVideo={onClickPopularVideo} />
    </div>
  )
}

export default HomeComponent
