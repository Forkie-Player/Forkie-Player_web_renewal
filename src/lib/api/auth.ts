import axios from 'axios'
import { IToken } from '../../types'
import { setTokens } from '../utils/auth'
import { removeCookie } from '../utils/cookie'
import { Address } from './constants'
import {
  IChangeToMemberSuccess,
  IGetUserInfoSuccess,
  IReissueSuccess,
  IRemoveUserSuccess,
  ISignUpSuccess,
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
  const res = await axios.post<IReissueSuccess>(`${Address}/api/member/login`, {
    loginId: id,
    password: pw,
    isPC: true,
  })
  await setTokens(res.data.response)
}

export const reissue = async (tokens: IToken) => {
  const res = await axios.post<IReissueSuccess>(`${Address}/api/member/reissue`, {
    ...tokens,
    isPC: true,
  })
  await setTokens(res.data.response)
  return res.data
}

export const getUserInfoApi = async () => {
  const res = await axios.get<IGetUserInfoSuccess>(`${Address}/api/member`)
  return res.data
}

export const nonSignUp = async (newId: string) => {
  const res = await axios.post<ISignUpSuccess>(`${Address}/api/member/signup/non`, {
    deviceId: newId,
    isPC: true,
  })
  return res.data
}

export const changeToMember = async (id: string, pw: string) => {
  await axios.put<IChangeToMemberSuccess>(`${Address}/api/member/change`, {
    loginId: id,
    password: pw,
  })
  removeCookie('@nomMemberId')
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

/*
export const updateProfileAvatar = async (uri: string, loginId: string) => {
  try {
    const formData = new FormData()
    let file = {
      uri: uri,
      name: `${loginId}.png`,
      type: `image/png`,
    }
    const respond = await fetch(uri)
    const blob = await respond.blob()
    file = new File([blob], `${loginId}.png`)

    formData.append('img', file)

    const res = await axios.post(`${Address}/api/member/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data;' },
    })
    return res.data.response
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data
    }
  }
}
*/
