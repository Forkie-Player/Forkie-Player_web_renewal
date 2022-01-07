import { setCookie } from '../lib/utils/cookie'
import { IIsFirst, ISetIsFirstProps, TIsFirst_Action } from './moduleTypes'

export const FIRST = 'FIRST'
export const NOTFIRST = 'NOT_FIRST'
export const P_FIRST = 'p_first'
export const V_FIRST = 'v_first'

//액션 타입
const SET_ISFIRST = 'isFirst/SET_ISFIRST'
const CLEAR_ISFIRST = 'isFirst/CLEAR_ISFIRST'

//액션 생성 함수
export const setIsFirst = ({ first }: ISetIsFirstProps) => ({
  type: SET_ISFIRST,
  payload: first,
})
export const clearIsFirst = (type: string) => {
  setCookie(`@${type}`, NOTFIRST)

  return { type: CLEAR_ISFIRST, payload: type }
}

const initialState: IIsFirst = {
  [P_FIRST]: NOTFIRST,
  [V_FIRST]: NOTFIRST,
}

export default function isFirst(state = initialState, action: TIsFirst_Action) {
  switch (action.type) {
    case SET_ISFIRST:
      return action.payload
    case CLEAR_ISFIRST:
      if (typeof action.payload === 'string') {
        return { ...state, [action.payload]: NOTFIRST }
      }
      return state
    default:
      return state
  }
}
