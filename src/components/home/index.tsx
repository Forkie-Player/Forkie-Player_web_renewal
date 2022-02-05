import PopularContainer from './container/PopularContainer'

import { useSelector } from 'react-redux'
import { RootModuleType } from '../../modules/moduleTypes'
import { useCallback } from 'react'
import { IVideo } from '../../types'
import { useNavigate } from 'react-router-dom'
import { NavAbsolutePathItems } from '../../lib/constants'

import 'swiper/css'
import './index.css'
import CarouselView from './view/CarouselView'

function HomeComponent() {
  const popularVideos = useSelector(({ popularVideos }: RootModuleType) => popularVideos.items)
  const navigate = useNavigate()

  // 인기동영상 클릭시 영상 추가 화면으로 이동
  const onClickPopularVideo = useCallback(
    (popularVideo: IVideo) => {
      navigate(NavAbsolutePathItems.VIDEO_ADD, { state: popularVideo })
    },
    [navigate],
  )

  return (
    <div className="w-full h-full grid grid-rows-[60%_40%] grid-cols-1">
      <CarouselView />
      <PopularContainer popularVideos={popularVideos} onClickPopularVideo={onClickPopularVideo} />
    </div>
  )
}

export default HomeComponent
