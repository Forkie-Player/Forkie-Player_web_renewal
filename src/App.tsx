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
import useIsSmScreen from './lib/hooks/useIsSmScreen'
import { RootModuleType } from './modules/moduleTypes'

ReactModal.setAppElement('#root')

function App() {
  const isSmScreen = useIsSmScreen()
  const navExpansion = useSelector(({ navExpansion }: RootModuleType) => navExpansion)

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
