import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './components/navigation'
import { setNavClose, setNavOpen } from './modules/navExpansion/actions'
import Header from './components/header'
import useScreenSize from './lib/hooks/useScreenSize'
import { setScreenSize } from './modules/screenSize/actions'
import { CustomToast } from './components/elements/CustomToast'
import MyRoutes from './routes'
import clsx from 'clsx'
import ReactModal from 'react-modal'

import * as Constants from './lib/constants'

import './App.css'

ReactModal.setAppElement('#root')

function App() {
  const dispatch = useDispatch()
  const screenSize = useScreenSize()
  const [isSmScreen, setIsSmScreen] = useState(false)

  useEffect(() => {
    dispatch(setScreenSize(screenSize))
    switch (screenSize) {
      case Constants.screenSizeString.XL:
      case Constants.screenSizeString.LG:
      case Constants.screenSizeString.MD:
        dispatch(setNavClose())
        setIsSmScreen(false)
        break
      case Constants.screenSizeString.SM:
      case Constants.screenSizeString.XSM:
        dispatch(setNavOpen())
        setIsSmScreen(true)
    }
  }, [screenSize, dispatch])

  return (
    <div className="app flex w-screen h-screen">
      <BrowserRouter>
        <div className={clsx('w-fit h-full')}>
          <Navigation isSmScreen={isSmScreen} />
        </div>
        <div
          className={clsx(
            'flex-1 grid grid-cols-1 grid-rows-[4rem_auto] h-full max-h-full overflow-hidden bg-background-light pl-1 lg:pl-6 pt-6 rounded-l-3xl',
          )}
        >
          <Header />
          <MyRoutes />
        </div>
      </BrowserRouter>
      <CustomToast />
    </div>
  )
}

export default App
