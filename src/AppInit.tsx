import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import LoadingElement from './components/elements/loading'
import { getCookie, removeCookie, setCookie } from './lib/utils/cookie'
import { getUserInfo } from './modules/userInfo/actions'
import { getIsFirst } from './modules/isFirst/actions'
import { getPlaylistAsync } from './modules/playlist/actions'
import { reissue } from './lib/api/auth'
import { authInit } from './lib/utils/auth'

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
          if (tokensJson !== undefined) {
            const res = await reissue(tokensJson)
            if (res !== undefined) {
              axios.defaults.headers.common.Authorization = `Bearer ${res.response.accessToken}`
              originalRequest.headers.Authorization = `Bearer ${res.response.accessToken}`
            }
            return axios(originalRequest)
          }
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
