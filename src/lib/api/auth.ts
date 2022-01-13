import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { IToken } from '../../types'
import { getCookie, removeCookie, setCookie } from '../utils/cookie'
import { Address } from './constants'
import {
  IChangeToMemberSuccess,
  IGetUserInfoSuccess,
  IReissueSuccess,
  IRemoveUserSuccess,
  ISignUpSuccess,
  IUpdateUserSuccess,
} from './types'
import { isFirstConstants } from '../constants'

/*
   모든 api는 token으로 이루어짐.

   따라서 비회원이더라도 token을 받아야함.

   0. 회원 auth 토큰, 비회원 아이디가 둘 다 없으면 비회원 아이디 생성
   1. 회원 auth 토큰이 있으면, 회원 auth 토큰을 우선.
      1-1. 로그인 성공하면, 토큰과 함께 프로필 정보 받음.
   2. 만약 비회원 아이디만 있거나, 회원 토큰이 invalid 할 경우, 비회원ID를 보내고 토큰을 받음.
      2-1. 만약 비회원 아이디가 invalid 할 경우 새로 생성

*/

const setTokens = async (tokens: IToken) => {
  const tokensObj = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${tokensObj.accessToken}`
  setCookie('@tokens', JSON.stringify(tokensObj))
}

export const login = async (id: string, pw: string) => {
  try {
    const res = await axios.post<IReissueSuccess>(`${Address}/api/member/login`, {
      loginId: id,
      password: pw,
      isPC: true,
    })
    await setTokens(res.data.response)
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data
    } else {
      throw err
    }
  }
}

export const reissue = async (tokens: IToken) => {
  try {
    const res = await axios.post<IReissueSuccess>(`${Address}/api/member/reissue`, {
      ...tokens,
      isPC: true,
    })
    await setTokens(res.data.response)
    return res.data.response
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data
    }
  }
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
        setCookie('@nomMemberId', res.loginId)
        id = res.loginId
      }
    }
    //로그인
    return await login(id, '')
  } catch (err) {
    throw err
  }
}

export const appInit = async () => {
  try {
    const tokensJson = getCookie('@tokens')

    if (tokensJson !== undefined) {
      //reissue
      try {
        await reissue(tokensJson)
      } catch (err) {
        // 리프레시 토큰 만료시 비회원 재로그인
        // 회원은 기존에 비회원으로 있던 기록이 나오고, 로그인은 자신이 해야함
        await nonMemberLogin()
      }
    } else {
      await nonMemberLogin()
    }

    const p_first = getCookie(`@${isFirstConstants.P_FIRST}`)
    const v_first = getCookie(`@${isFirstConstants.V_FIRST}`)

    return {
      first: {
        [isFirstConstants.P_FIRST]: p_first === undefined ? isFirstConstants.FIRST : p_first,
        [isFirstConstants.V_FIRST]: v_first === undefined ? isFirstConstants.FIRST : v_first,
      },
    }
  } catch (err) {
    // 아예 초기화가 실패했을떄
    throw err
  }
}

export const getUserInfoApi = async () => {
  try {
    const res = await axios.get<IGetUserInfoSuccess>(`${Address}/api/member`)
    return res.data.response
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data
    }
  }
}

export const nonSignUp = async (newId: string) => {
  try {
    const res = await axios.post<ISignUpSuccess>(`${Address}/api/member/signup/non`, {
      deviceId: newId,
      isPC: true,
    })
    return res.data.response
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err
    }
  }
}

export const changeToMember = async (id: string, pw: string) => {
  try {
    await axios.put<IChangeToMemberSuccess>(`${Address}/api/member/change`, {
      loginId: id,
      password: pw,
    })
    removeCookie('@nomMemberId')
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data
    }
  }
}

export const SignUp = async (id: string, pw: string) => {
  try {
    await changeToMember(id, pw)
    return await login(id, pw)
  } catch (err) {
    // 중복 아이디 처리
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data
    }
  }
}

export const removeUser = async () => {
  try {
    await axios.delete<IRemoveUserSuccess>(`${Address}/api/member/delete`)
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data
    }
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

export const pwUpdate = async (pw: string, newPw: string) => {
  try {
    await axios.post<IUpdateUserSuccess>(`${Address}/api/member/changePassword`, {
      oldPassword: pw,
      newPassword: newPw,
    })
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data
    }
  }
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