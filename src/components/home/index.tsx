import CarouselContainer from './container/CarouselContainer'
import PopularContainer from './container/PopularContainer'

import 'swiper/css'

function HomeComponent() {
  return (
    <div className="w-full h-full grid grid-rows-[60%_40%] grid-cols-1">
      <CarouselContainer />
      <PopularContainer />
    </div>
  )
}

export default HomeComponent
