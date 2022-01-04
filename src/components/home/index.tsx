import CarouselContainer from './container/CarouselContainer'
import PopularContainer from './container/PopularContainer'

import 'swiper/css'

function HomeComponent() {
  return (
    <div className="w-full h-full">
      <CarouselContainer />
      <PopularContainer />
    </div>
  )
}

export default HomeComponent
