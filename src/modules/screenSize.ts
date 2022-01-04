import { TScreenSize, TScreenSize_ACTION } from './moduleTypes'

// 액션 타입
const SET_SCREEN_SIZE = 'screenSize/SET_SCREEN_SIZE'

// 액션 함수
export const setScreenSize = (screenSize: string) => ({ type: SET_SCREEN_SIZE, screenSize })

const initialState: TScreenSize = 'lg'

export default function screenSize(state = initialState, action: TScreenSize_ACTION) {
  switch (action.type) {
    case SET_SCREEN_SIZE:
      return action.screenSize
    default:
      return state
  }
}
