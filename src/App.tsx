import React, { useEffect } from 'react'
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

ReactModal.setAppElement('#root')

function App() {
  const dispatch = useDispatch()
  const screenSize = useScreenSize()
  const isSmScreen = useIsSmScreen()
  const navExpansion = useSelector(({ navExpansion }: RootModuleType) => navExpansion)

  useEffect(() => {
    dispatch(setScreenSize(screenSize))
    switch (screenSize) {
      case Constants.screenSizeString.XL:
      case Constants.screenSizeString.LG:
      case Constants.screenSizeString.MD:
      case Constants.screenSizeString.SM:
      case Constants.screenSizeString.XSM:
        dispatch(setNavClose())
        break
    }
  }, [screenSize, dispatch])

  return (
    <div
      className={clsx(
        'app flex h-screen transition-[translate]',
        isSmScreen ? (navExpansion ? 'translate-x-0 w-fit' : '-translate-x-16 w-fit') : 'w-screen',
      )}
    >
      <BrowserRouter>
        <div className={clsx('w-fit h-full')}>
          <Navigation />
        </div>
        <div className={clsx(isSmScreen ? 'app-content-container-sm' : 'app-content-container-md')}>
          <Header />
          <MyRoutes />
        </div>
      </BrowserRouter>
      <CustomToast />
    </div>
  )
}

export default App
