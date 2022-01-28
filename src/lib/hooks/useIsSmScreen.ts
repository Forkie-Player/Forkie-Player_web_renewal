import { useEffect, useState } from 'react'

import * as Constants from '../constants'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../modules/moduleTypes'

const useIsSmScreen = () => {
  const screenSize = useSelector(({ screenSize }: RootModuleType) => screenSize)
  const [isSmScreen, setIsSmScreen] = useState(false)
  useEffect(() => {
    switch (screenSize) {
      case Constants.screenSizeString.SM:
      case Constants.screenSizeString.XSM:
        setIsSmScreen(true)
        break
      default:
        setIsSmScreen(false)
    }
  }, [screenSize])

  return isSmScreen
}

export default useIsSmScreen
