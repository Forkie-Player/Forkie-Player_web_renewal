import axios from 'axios'
import { logEvent } from 'firebase/analytics'
import { analytics } from '../../firebaseInit'
import { IToken } from '../../types'
import { setTokens } from '../utils/auth'
import { Address } from './constants'
import {
  IGetUserInfoSuccess,
  IReissueSuccess,
  IRemoveUserSuccess,
  IUpdateProfileImgSuccess,
  IUpdateUserSuccess,
} from './types'
/*
   모든 api는 token으로 이루어짐.

   따라서 비회원이더라도 token을 받아야함.

   0. 회원 auth 토큰, 비회원 아이디가 둘 다 없으면 비회원 아이디 생성
   1. 회원 auth 토큰이 있으면, 회원 auth 토큰을 우선.
      1-1. 로그인 성공하면, 토큰과 함께 프로필 정보 받음.
   2. 만약 비회원 아이디만 있거나, 회원 토큰이 invalid 할 경우, 비회원ID를 보내고 토큰을 받음.
      2-1. 만약 비회원 아이디가 invalid 할 경우 새로 생성

*/

export const login = async (id: string, pw: string) => {
  const res = await axios.post<IReissueSuccess>(`${Address}/api/user/auth/login/member`, {
    loginId: id,
    password: pw,
    isPC: true,
  })
  logEvent(analytics, '로그인', { name: pw ? '회원 로그인' : '비회원 로그인', value: id })
  await setTokens(res.data.data)
}

export const reissue = async (tokens: IToken) => {
  const res = await axios.post<IReissueSuccess>(`${Address}/api/user/auth/reissue`, {
    ...tokens,
    isPC: true,
  })
  await setTokens(res.data.data)
  logEvent(analytics, '리이슈')
  return res.data
}

export const getUserInfoApi = async () => {
  const res = await axios.get<IGetUserInfoSuccess>(`${Address}/api/user`)
  return res.data
}

export const removeUser = async () => {
  await axios.delete<IRemoveUserSuccess>(`${Address}/api/member/delete`)
}

export const pwUpdate = async (pw: string, newPw: string) => {
  await axios.post<IUpdateUserSuccess>(`${Address}/api/member/changePassword`, {
    oldPassword: pw,
    newPassword: newPw,
  })
}

export const userSignUp = async (id: string, pw: string) => {
  await axios.post(`${Address}/api/user/auth/signup/member`, {
    loginId: id,
    password: pw,
    isPC: true,
  })
  logEvent(analytics, '회원가입')
}

export const updateProfileImag = async (form: FormData) => {
  const res = await axios.post<IUpdateProfileImgSuccess>(`${Address}/api/member/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data;' },
  })
  return res.data
}

export const updateNickname = async (newNickname: string) => {
  await axios.patch(`${Address}/api/user?nickname=${newNickname}`)
}

export const loginWithGoogle = async () => {
  const res = await axios.get(`${Address}/v1/oauth2/authorization/google`)
  await setTokens(res.data.data)
}
export const loginWithKakao = async () => {
  const res = await axios.get(`${Address}/v1/oauth2/authorization/kakao`)
  await setTokens(res.data.data)
}
