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

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setNavOpen())
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="flex w-screen h-screen">
        <div className={'min-w-fit max-w-fit w-full h-full'}>
          <Navigation />
        </div>
        <div className={'w-full h-full bg-background-light rounded-l-3xl px-6 pt-5'}>
          <Header />
          <Routes>
            <Route path={Constants.NavPathItems.HOME} element={<Home />} />
            <Route path={Constants.NavPathItems.SEARCH} element={<Search />} />
            <Route path={Constants.NavPathItems.LIST} element={<List />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
