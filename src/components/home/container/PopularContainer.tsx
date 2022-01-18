import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../../modules/moduleTypes'
import PopularView from '../view/PopularView'
import * as Contants from '../../../lib/constants'

const calcSlidesPerView = (screenSize: string) => {
  switch (screenSize) {
    case Contants.screenSizeString.XS:
      return 1
    case Contants.screenSizeString.SM:
      return 2
    case Contants.screenSizeString.LSM:
      return 2
    case Contants.screenSizeString.SMD:
      return 3
    case Contants.screenSizeString.MD:
      return 3
    case Contants.screenSizeString.LG:
      return 4
    case Contants.screenSizeString.XL:
      return 5
    default:
      return 6
  }
}

function PopularContainer() {
  const screenSize = useSelector(({ screenSize }: RootModuleType) => screenSize)
  const slidesPerView = useMemo(() => calcSlidesPerView(screenSize), [screenSize])

  return <PopularView screenSize={screenSize} slidesPerView={slidesPerView} />
}

export default PopularContainer
