import { createAction } from 'typesafe-actions'

// 액션 타입
const SET_NAV_CLOSE = 'navExpansion/SET_NAV_CLOSE' as const
const SET_NAV_OPEN = 'navExpansion/SET_NAV_OPEN' as const

export const navExpansionActionTypes = {
  SET_NAV_CLOSE,
  SET_NAV_OPEN,
}

// 액션 생성 함수
export const setNavClose = createAction(SET_NAV_CLOSE)()
export const setNavOpen = createAction(SET_NAV_OPEN)()

export const navExpansionActions = {
  setNavClose,
  setNavOpen,
}
