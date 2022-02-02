import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './components/navigation'
import { setNavClose } from './modules/navExpansion/actions'
import Header from './components/header'
import useScreenSize from './lib/hooks/useScreenSize'
import { setScreenSize } from './modules/screenSize/actions'
import { CustomToast } from './components/elements/CustomToast'
import MyRoutes from './routes'
import clsx from 'clsx'
import ReactModal from 'react-modal'

import * as Constants from './lib/constants'

import './App.css'
import useIsSmScreen from './lib/hooks/useIsSmScreen'
import { RootModuleType } from './modules/moduleTypes'
import { getPopularVideoAsync } from './modules/popularVideos/actions'

ReactModal.setAppElement('#root')

function App() {
  const dispatch = useDispatch()
  const screenSize = useScreenSize()
  const isSmScreen = useIsSmScreen()
  const navExpansion = useSelector(({ navExpansion }: RootModuleType) => navExpansion)

  useEffect(() => {
    dispatch(setScreenSize(screenSize))
    switch (screenSize) {
      case Constants.screenSizeString.MD:
      case Constants.screenSizeString.SM:
      case Constants.screenSizeString.XSM:
        dispatch(setNavClose())
        break
    }
    dispatch(getPopularVideoAsync.request())
  }, [screenSize, dispatch])

  const containerClassNameMemo = useMemo(
    () =>
      clsx(
        'app flex h-screen transition-[translate]',
        isSmScreen ? (navExpansion ? 'translate-x-0 w-fit' : '-translate-x-16 w-fit') : 'w-screen',
      ),
    [isSmScreen, navExpansion],
  )
  const contentClassNameMemo = useMemo(
    () => clsx(isSmScreen ? 'app-content-container-sm' : 'app-content-container-md'),
    [isSmScreen],
  )
  const navClassNameMemo = useMemo(() => clsx('w-fit h-full'), [])

  return (
    <div className={containerClassNameMemo}>
      <BrowserRouter>
        <div className={navClassNameMemo}>
          <Navigation />
        </div>
        <div className={contentClassNameMemo}>
          <Header />
          <MyRoutes />
        </div>
      </BrowserRouter>
      <CustomToast />
    </div>
  )
}

export default App
