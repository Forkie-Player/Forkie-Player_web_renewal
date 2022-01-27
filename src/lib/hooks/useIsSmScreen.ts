import { useEffect, useState } from 'react'
import useScreenSize from './useScreenSize'

import * as Constants from '../constants'

const useIsSmScreen = () => {
  const screenSize = useScreenSize()
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
