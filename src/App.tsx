import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './components/navigation'
import Header from './components/header'
import { CustomToast } from './components/elements/CustomToast'
import MyRoutes from './routes'
import clsx from 'clsx'
import ReactModal from 'react-modal'

import './App.css'
import { RootModuleType } from './modules/moduleTypes'

ReactModal.setAppElement('#root')

function App() {
  const { navExpansion, isSmScreen } = useSelector(({ navExpansion, isSmScreen }: RootModuleType) => ({
    navExpansion,
    isSmScreen,
  }))
  return (
    <div
      className={clsx(
        'app flex h-screen max-h-screen transition-[translate]',
        isSmScreen ? (navExpansion ? 'w-fit translate-x-0' : 'w-fit -translate-x-16') : 'w-screen',
      )}
    >
      <BrowserRouter>
        <div className={clsx('h-full w-fit')}>
          <Navigation />
        </div>
        <div
          className={clsx(
            'app-content-container',
            isSmScreen ? 'app-content-container-sm' : 'app-content-container-md',
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
