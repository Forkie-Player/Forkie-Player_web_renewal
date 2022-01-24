import { useEffect, useState } from 'react'
import * as Constants from '../constants'

function calcCurrentScreen(width: number) {
  if (width < Constants.screenSizeWidth.SM) {
    return Constants.screenSizeString.SM
  }
  if (width < Constants.screenSizeWidth.MD) {
    return Constants.screenSizeString.MD
  }
  if (width < Constants.screenSizeWidth.LG) {
    return Constants.screenSizeString.LG
  }
  if (width < Constants.screenSizeWidth.XL) {
    return Constants.screenSizeString.XL
  }
  if (width < Constants.screenSizeWidth['2XL']) {
    return Constants.screenSizeString['2XL']
  }
  if (width < Constants.screenSizeWidth['3XL']) {
    return Constants.screenSizeString['3XL']
  }
  return Constants.screenSizeString['3XL']
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
