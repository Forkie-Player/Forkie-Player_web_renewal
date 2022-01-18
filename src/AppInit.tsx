import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import LoadingElement from './components/elements/loading'
import { getCookie, removeCookie, setCookie } from './lib/utils/cookie'
import { getUserInfo } from './modules/userInfo/actions'
import { getIsFirst } from './modules/isFirst/actions'
import { getPlaylistAsync } from './modules/playlist/actions'
import { reissue } from './lib/api/auth'
import { nonMemberLogin } from './lib/utils/auth'

const authInit = async () => {
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
    // 첫 방문 시 or 쿠키 초기화 후 방문시
    await nonMemberLogin()
  }
}

export default function AppInit({ children }: { children: React.ReactNode }) {
  const [preLoading, setPreLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      res => res,
      async err => {
        const originalRequest = err.config
        if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          const tokensJson = getCookie('@tokens')
          const res = await reissue(JSON.parse(tokensJson))
          if (res !== undefined) {
            axios.defaults.headers.common.Authorization = `Bearer ${res.response.accessToken}`
            originalRequest.headers.Authorization = `Bearer ${res.response.accessToken}`
          }
          return axios(originalRequest)
        }
        return Promise.reject(err)
      },
    )
    return () => axios.interceptors.response.eject(interceptorId)
  }, [])

  useEffect(() => {
    const init = async () => {
      try {
        await authInit()
        dispatch(getIsFirst())
        dispatch(getUserInfo.request())
        dispatch(getPlaylistAsync.request())

        setCookie('@restart', 'false')
      } catch (err) {
        const res = getCookie('@restart')
        if (
          res !== 'resetNonId' &&
          axios.isAxiosError(err) &&
          err.response?.data.message === '존재하지 않는 회원입니다.'
        ) {
          setCookie('@remakeNonmemberId', 'true')
          removeCookie('@nomMemberId')
          setCookie('@restart', 'resetNonId')
          window.location.reload()
        } else if (!res || res === 'false') {
          setCookie('@restart', 'true')
          window.location.reload()
        } else if (res === 'resetNonId') {
          setCookie('@restart', 'false')
        } else if (res === 'true') {
          setCookie('@restart', 'false')
        }
      }
      setPreLoading(false)
    }
    init()
  }, [dispatch])

  if (preLoading) {
    return <LoadingElement />
  }

  return <>{children}</>
}
