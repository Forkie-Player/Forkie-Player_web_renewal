import { IToken, IUserInfo } from '../../types'

// 요청 실패
export interface IRequestFail {
  success: boolean
  response: null
  status: number
  message: string
}

// reissue 반환 타입
export interface IReissueSuccess {
  success: boolean
  error: string | null
  response: IToken
}

// getUserInfo  반환 타입
export interface IGetUserInfoSuccess {
  success: boolean
  error: string | null
  response: IUserInfo
}

// 회원 가입 반환 타입
export interface ISignUpSuccess {
  success: boolean
  error: null
  response: IUserInfo
}

// 비회원 -> 회원 전환 반환 타입
export interface IChangeToMemberSuccess {
  success: boolean
  error: null
  response: IUserInfo
}

//회원 삭제 반환타입
export interface IRemoveUserSuccess {
  success: boolean
  error: null
  response: string
}

// 비밀먼호 업데이터 반환 타입
export interface IUpdateUserSuccess {
  success: boolean
  error: null
  response: IUserInfo
}
