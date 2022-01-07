// 프로필 데이터로 교체?

import { createAction, createReducer } from 'typesafe-actions'
import { IUserInfo } from '../types'
import { TUserInfo_Action } from './moduleTypes'

//액션 타입
const SIGNIN = 'userInfo/SIGNIN'
const SIGNOUT = 'userInfo/SIGNOUT'

//액션 생성 함수
export const signin = createAction(SIGNIN, (userInfo: IUserInfo) => userInfo)()
export const signout = createAction(SIGNOUT)()

const initialState: IUserInfo & { signedin: boolean } = {
  signedin: false,
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  loginId: '',
  profileImg: '',
  authority: '',
  pc: true,
  member: false,
}

const userInfoReducer = createReducer<IUserInfo, TUserInfo_Action>(initialState, {
  [SIGNIN]: (state, action) => action.payload,
  [SIGNOUT]: () => initialState,
})

export default userInfoReducer
