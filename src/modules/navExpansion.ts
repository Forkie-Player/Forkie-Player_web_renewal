import { TNavExpansion, TNavExpansion_ACTION } from './moduleTypes'

// 액션 타입
const SET_NAV_CLOSE = 'navExpansion/SET_NAV_CLOSE'
const SET_NAV_OPEN = 'navExpansion/SET_NAV_OPEN'

// 액션 생성 함수
export const setNavClose = () => ({ type: SET_NAV_CLOSE })
export const setNavOpen = () => ({ type: SET_NAV_OPEN })

const initialState: TNavExpansion = true

export default function navExpansion(state = initialState, action: TNavExpansion_ACTION) {
  switch (action.type) {
    case SET_NAV_CLOSE:
      return false
    case SET_NAV_OPEN:
      return true
    default:
      return state
  }
}
