import { createAction } from 'typesafe-actions'
import { isFirstConstants } from '../../lib/constants'
import { getCookie } from '../../lib/utils/cookie'
import { IIsFirst } from './types'

//액션 타입
const GET_ISFIRST = 'isFirst/GET_ISFIRST' as const
const CLEAR_ISFIRST = 'isFirst/CLEAR_ISFIRST' as const

export const isFirstActionTypes = {
  GET_ISFIRST,
  CLEAR_ISFIRST,
}

//액션 생성 함수
export const getIsFirst = createAction(GET_ISFIRST, (): IIsFirst => {
  const p_first = getCookie(`@${isFirstConstants.P_FIRST}`)
  const v_first = getCookie(`@${isFirstConstants.V_FIRST}`)

  return {
    [isFirstConstants.P_FIRST]: p_first === undefined ? isFirstConstants.FIRST : p_first,
    [isFirstConstants.V_FIRST]: v_first === undefined ? isFirstConstants.FIRST : v_first,
  }
})()
export const clearIsFirst = createAction(CLEAR_ISFIRST, (payload: string) => payload)()

export const isFirstActions = {
  getIsFirst,
  clearIsFirst,
}
