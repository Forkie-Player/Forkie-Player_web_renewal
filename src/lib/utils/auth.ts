import { getCookie, removeCookie, setCookie } from './cookie'
import { v4 as uuidv4 } from 'uuid'
import { changeToMember, login, nonSignUp } from '../api/auth'
import { IToken } from '../../types'
import axios from 'axios'

export const setTokens = async (tokens: IToken) => {
  const tokensObj = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${tokensObj.accessToken}`
  setCookie('@tokens', JSON.stringify(tokensObj))
}

export const nonMemberLogin = async () => {
  try {
    // 비회원 아이디 받아오기
    let id = getCookie('@nomMemberId')
    if (!id) {
      // 가입 신청 후 받아오기
      let newId = uuidv4()
      const res = await nonSignUp(newId)
      if (res !== undefined) {
        setCookie('@nomMemberId', res.response.loginId)
        id = res.response.loginId
      }
    }
    //로그인
    await login(id, '')
  } catch (err) {
    throw err
  }
}

export const SignUp = async (id: string, pw: string) => {
  try {
    await changeToMember(id, pw)
    return await login(id, pw)
  } catch (err) {
    // 중복 아이디 처리
    throw err
  }
}

export const logout = async () => {
  try {
    removeCookie('@tokens')
    await nonMemberLogin()
  } catch (err) {
    throw err
  }
}
