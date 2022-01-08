import { createAction } from 'typesafe-actions'
import { IIsFirst } from './types'

//액션 타입
const SET_ISFIRST = 'isFirst/SET_ISFIRST' as const
const CLEAR_ISFIRST = 'isFirst/CLEAR_ISFIRST' as const

export const isFirstActionTypes = {
  SET_ISFIRST,
  CLEAR_ISFIRST,
}

//액션 생성 함수
export const setIsFirst = createAction(SET_ISFIRST, (payload: IIsFirst) => payload)()
export const clearIsFirst = createAction(CLEAR_ISFIRST, (payload: string) => payload)()

export const isFirstActions = {
  setIsFirst,
  clearIsFirst,
}
