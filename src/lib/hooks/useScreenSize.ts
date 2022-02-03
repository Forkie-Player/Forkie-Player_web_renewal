/**
 * window 사이즈 너비의 변화를 트래킹하고,
 * 어느 범위에 속한 screenSize인지 확인 후 사이즈를 업데이트함.
 *
 * 주의점 :
 *  resize 이벤트를 트래킹하는 hook이기에, 앱의 최상단인 appInit에서 딱 한번 사용하고,
 *  screenSize 정보는 리덕스에 저장하는 식으로하여, 이벤트를 여러개 등록하지 않도록 한다.
 */

import { useEffect, useState } from 'react'
import * as Constants from '../constants'

function calcCurrentScreen(width: number) {
  if (width < Constants.screenSizeWidth.SM) {
    return Constants.screenSizeString.XSM
  }
  if (width < Constants.screenSizeWidth.MD) {
    return Constants.screenSizeString.SM
  }
  if (width < Constants.screenSizeWidth.LG) {
    return Constants.screenSizeString.MD
  }
  if (width < Constants.screenSizeWidth.XL) {
    return Constants.screenSizeString.LG
  }
  if (width < Constants.screenSizeWidth['2XL']) {
    return Constants.screenSizeString.XL
  }
  if (width < Constants.screenSizeWidth['3XL']) {
    return Constants.screenSizeString['2XL']
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
