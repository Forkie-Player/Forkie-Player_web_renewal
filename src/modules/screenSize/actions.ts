import { createAction } from 'typesafe-actions'

// 액션 타입
const SET_SCREEN_SIZE = 'screenSize/SET_SCREEN_SIZE' as const

export const screenSizeActionTypes = {
  SET_SCREEN_SIZE,
}

// 액션 함수
export const setScreenSize = createAction(SET_SCREEN_SIZE, (screenSize: string) => screenSize)()

export const screenSizeActions = {
  setScreenSize,
}
