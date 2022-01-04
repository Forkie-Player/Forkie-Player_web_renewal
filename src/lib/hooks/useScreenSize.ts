import { useEffect, useState } from 'react'
import * as Constants from '../constants'

function calcCurrentScreen(width: number) {
  if (width < Constants.screenSizeWidth.XS) {
    return Constants.screenSizeString.XS
  }
  if (width < Constants.screenSizeWidth.SM) {
    return Constants.screenSizeString.SM
  }
  if (width < Constants.screenSizeWidth.LSM) {
    return Constants.screenSizeString.LSM
  }
  if (width < Constants.screenSizeWidth.SMD) {
    return Constants.screenSizeString.SMD
  }
  if (width < Constants.screenSizeWidth.MD) {
    return Constants.screenSizeString.MD
  }
  if (width < Constants.screenSizeWidth.LG) {
    return Constants.screenSizeString.LG
  }
  return Constants.screenSizeString.XL
}

function useScreenSize() {
  const [screenSize, setScreenSize] = useState(calcCurrentScreen(window.innerWidth))

  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      const w = e.target as Window
      setScreenSize(calcCurrentScreen(w.innerWidth))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenSize
}

export default useScreenSize
