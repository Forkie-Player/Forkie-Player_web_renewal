import { TLoading, TLoading_ACTION } from './moduleTypes'

// 액션 타입
const SET_LOADING = 'loading/SET_LOADING'
const SET_UNLOADING = 'loading/SET_UNLOADING'

// 액션 생성 함수
export const setLoading = () => ({ type: SET_LOADING })
export const setUnloading = () => ({ type: SET_UNLOADING })

const initialState: TLoading = false

export default function loading(state = initialState, action: TLoading_ACTION) {
  switch (action.type) {
    case SET_LOADING:
      return true
    case SET_UNLOADING:
      return false
    default:
      return state
  }
}
