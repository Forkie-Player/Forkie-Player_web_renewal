import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../../modules/moduleTypes'
import PopularView from '../view/PopularView'
import * as Contants from '../../../lib/constants'

const calcSlidesPerView = (screenSize: string) => {
  switch (screenSize) {
    case Contants.screenSizeString.SM:
      return 12
    case Contants.screenSizeString.MD:
      return 14
    case Contants.screenSizeString.LG:
    case Contants.screenSizeString.XL:
      return 16
    case Contants.screenSizeString['2XL']:
      return 18
    case Contants.screenSizeString['3XL']:
      return 20
    default:
      return 25
  }
}

function PopularContainer() {
  const screenSize = useSelector(({ screenSize }: RootModuleType) => screenSize)
  const [slidesPerView, setSlidesPerView] = useState(3)
  const popuperViewRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (popuperViewRef.current !== null) {
      const width = popuperViewRef.current.clientWidth
      setSlidesPerView(
        Math.floor(
          width / (parseFloat(getComputedStyle(document.documentElement).fontSize) * calcSlidesPerView(screenSize)),
        ),
      )
    }
  }, [screenSize])

  return <PopularView ref={popuperViewRef} screenSize={screenSize} slidesPerView={slidesPerView} />
}

export default PopularContainer
