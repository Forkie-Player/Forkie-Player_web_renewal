import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import LoadingElement from './components/elements/loading'
import { appInit, reissue } from './lib/api/auth'
import { getCookie, removeCookie, setCookie } from './lib/utils/cookie'
import { signin } from './modules/userInfo'
import { setIsFirst } from './modules/isFirst'
import { getPlaylist } from './modules/playlist'

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
            axios.defaults.headers.common.Authorization = `Bearer ${res.accessToken}`
            originalRequest.headers.Authorization = `Bearer ${res.accessToken}`
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
        const res = await appInit()
        dispatch(setIsFirst({ first: res.first }))
        if (res.userInfo !== undefined) {
          dispatch(signin(res.userInfo))
        }
        dispatch(getPlaylist())

        setCookie('@restart', 'false')
      } catch (err) {
        const res = getCookie('@restart')
        if (res !== 'resetNonId' && axios.isAxiosError(err) && err.message === '존재하지 않는 회원입니다.') {
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
