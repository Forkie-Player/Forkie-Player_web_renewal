import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import LoadingElement from './components/elements/loading'
import { getCookie } from './lib/utils/cookie'
import { clearUserInfo, getUserInfo } from './modules/userInfo/actions'
import { getIsFirst } from './modules/isFirst/actions'
import { getPlaylistAsync, initPlaylist } from './modules/playlist/actions'
import { reissue } from './lib/api/auth'
import { authInit } from './lib/utils/auth'
import { setNavClose, setNavState } from './modules/navExpansion/actions'
import { getPopularVideoAsync } from './modules/popularVideos/actions'
import useScreenSize from './lib/hooks/useScreenSize'
import { setScreenSize } from './modules/screenSize/actions'

import * as Constants from './lib/constants'
import { setIsNotSmScreen, setIsSmScreen } from './modules/isSmScreen/actions'
import { clearVideo } from './modules/video/actions'

function AppInit({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const screenSize = useScreenSize()
  const dispatch = useDispatch()

  /**
   * axios interceptor 등록
   * 1. api 요청이 실패했을 경우에만 실행됨
   * 2. auth 문제인지 먼저 확인한다(401 에러)
   * 3. auth 문제일 경우 기존 토큰을 보내서 재발급을 요청함.
   * 4. 재발급이 성공하면, 새로운 토큰을 설정하고, 이전 요청을 다시 실행함.
   * 5. 재발급 요청에 retry 값을 붙여, 또다시 실패가 일어나면 재요청을 포기하고 실패를 보냄.
   */
  useEffect(() => {
    let refreshSubscriber: Function[] = []
    const onTokenRefreshed = (accessToken: string) => {
      refreshSubscriber.map(callback => callback(accessToken))
    }
    const addRefreshSubscriber = (callback: Function) => {
      refreshSubscriber.push(callback)
    }
    const interceptorId = axios.interceptors.response.use(
      res => res,
      async err => {
        const originalRequest = err.config
        const isRefreshing =
          !localStorage.getItem('isRefreshing') || localStorage.getItem('isRefreshing') === 'false' ? false : true

        if (
          !originalRequest._retry &&
          ((err.response?.data.status === 400 && err.response?.data.message.includes('만료된 JWT')) ||
            (err.response?.data.status === 401 && err.response?.data.message.includes('잘못된 JWT')))
        ) {
          originalRequest._retry = true
          const retryOriginalRequest = new Promise(resolve => {
            addRefreshSubscriber((accessToken: string) => {
              originalRequest.headers.Authorization = 'Bearer ' + accessToken
              resolve(axios(originalRequest))
            })
          })
          if (!isRefreshing) {
            localStorage.setItem('isRefreshing', 'true')
            const tokensJson = getCookie('@tokens')
            axios.defaults.headers.common['Authorization'] = ''
            try {
              const res = await reissue(tokensJson)
              onTokenRefreshed(res.data.accessToken)
            } catch (e) {
              refreshSubscriber = []
            }
            localStorage.setItem('isRefreshing', 'false')
          }
          return retryOriginalRequest
        }
        return Promise.reject(err)
      },
    )
    return () => axios.interceptors.response.eject(interceptorId)
  }, [])

  useEffect(() => {
    const authenticationInit = async (isRestart: boolean = false) => {
      // 유저 auth 상태 초기화
      const ans = await authInit()
      if (ans === true) {
        // auth 작업 완료 후, auth가 필요해야 가져올 수 있는 데이터 fetch
        dispatch(getUserInfo.request())
        dispatch(getPlaylistAsync.request())
      } else {
        dispatch(clearUserInfo())
        dispatch(initPlaylist())
        dispatch(clearVideo())
      }
      // auth 작업만 끝나면, 일단 필수적인 초기화 작업은 끝난 것이기에, 로딩을 품
      setIsLoading(false)
    }
    const screenInit = () => {
      // 각 화면 방문이 처음인지 초기화
      dispatch(getIsFirst())

      // nav open/close 상태 초기화
      const lastNavState = getCookie('@navExpansion')
      if (lastNavState !== undefined) {
        dispatch(setNavState(lastNavState))
      }
    }
    const popularVideoInit = () => {
      dispatch(getPopularVideoAsync.request())
    }
    screenInit()
    popularVideoInit()
    authenticationInit()
  }, [dispatch])

  /**
   * 1. screenSize가 변경될 때마다 리덕스에 저장된 screenSize를 업데이트함.
   * 2. screenSize가 작을시, 자동으로 nav를 닫는다.
   */
  useEffect(() => {
    dispatch(setScreenSize(screenSize))
    switch (screenSize) {
      case Constants.screenSizeString.MD:
        dispatch(setIsNotSmScreen())
        dispatch(setNavClose())
        break
      case Constants.screenSizeString.SM:
      case Constants.screenSizeString.XSM:
        dispatch(setNavClose())
        dispatch(setIsSmScreen())
        break
      default:
        dispatch(setIsNotSmScreen())
    }
  }, [screenSize, dispatch])

  if (isLoading) {
    return <LoadingElement className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
  }

  return <>{children}</>
}
export default AppInit
