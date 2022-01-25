import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../../modules/moduleTypes'
import PopularView from '../view/PopularView'
import { screenSizeString } from '../../../lib/constants'

function PopularContainer() {
  const screenSize = useSelector(({ screenSize }: RootModuleType) => screenSize)
  const [slidesPerView, setSlidesPerView] = useState(3)
  const popuperViewRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    switch (screenSize) {
      case screenSizeString['3XL']:
      case screenSizeString['2XL']:
      case screenSizeString.XL:
      case screenSizeString.LG:
        setSlidesPerView(5)
        break
      case screenSizeString.MD:
        setSlidesPerView(4)
        break
      case screenSizeString.SM:
        setSlidesPerView(3)
    }
    if (window.innerHeight > window.innerWidth) {
      setSlidesPerView(2)
    }
  }, [screenSize])

  return <PopularView ref={popuperViewRef} screenSize={screenSize} slidesPerView={slidesPerView} />
}

export default PopularContainer
