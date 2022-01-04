import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation'
import { setNavOpen } from './modules/navExpansion'
import Home from './routes/Home'
import Search from './routes/Search'
import List from './routes/List'

import * as Constants from './lib/constants'
import Header from './components/header'
import useScreenSize from './lib/hooks/useScreenSize'
import { setScreenSize } from './modules/screenSize'

function App() {
  const dispatch = useDispatch()
  const screenSize = useScreenSize()

  useEffect(() => {
    dispatch(setNavOpen())
  }, [dispatch])

  useEffect(() => {
    dispatch(setScreenSize(screenSize))
  }, [screenSize, dispatch])

  return (
    <BrowserRouter>
      <div className="flex w-screen h-screen">
        <div className={'min-w-fit max-w-fit w-full h-full'}>
          <Navigation />
        </div>
        <div
          className={'w-full h-full max-w-full max-h-full overflow-hidden bg-background-light rounded-l-3xl px-6 pt-6'}
        >
          <Header />
          <div className={'w-full h-full pt-8'}>
            <Routes>
              <Route path={Constants.NavPathItems.HOME} element={<Home />} />
              <Route path={Constants.NavPathItems.SEARCH} element={<Search />} />
              <Route path={Constants.NavPathItems.LIST} element={<List />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
