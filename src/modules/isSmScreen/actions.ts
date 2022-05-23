import { createAction } from 'typesafe-actions'

// 액션타입
const SET_IS_SMSCREEN = 'isSmScreen/SET_IS_SMSCREEN' as const
const SET_IS_NOT_SMSCREEN = 'isSmScreen/SET_IS_NOT_SMSCREEN' as const

export const isSmScreenActionTypes = {
  SET_IS_SMSCREEN,
  SET_IS_NOT_SMSCREEN,
}

// 액션 생성 함수
export const setIsSmScreen = createAction(SET_IS_SMSCREEN)()
export const setIsNotSmScreen = createAction(SET_IS_NOT_SMSCREEN)()

export const isSmScreenActions = {
  setIsSmScreen,
  setIsNotSmScreen,
}
