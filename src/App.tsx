import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation'
import { setNavOpen } from './modules/navExpansion/actions'
import Home from './routes/Home'
import Search from './routes/Search'
import List from './routes/List'

import * as Constants from './lib/constants'
import Header from './components/header'
import useScreenSize from './lib/hooks/useScreenSize'
import { setScreenSize } from './modules/screenSize/actions'
import VideoAdd from './routes/VideoAdd'
import { CustomToast } from './components/elements/CustomToast'
import Play from './routes/Play'
import VideoTimeChange from './routes/VideoTimeChange'

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
      <div className="app flex w-screen h-screen">
        <div className={'min-w-fit max-w-fit w-full h-full'}>
          <Navigation />
        </div>
        <div
          className={
            'grid grid-cols-1 grid-rows-[4rem_minmax(100px,_auto)] w-full h-full max-w-full max-h-full overflow-auto bg-background-light rounded-l-3xl pl-6 pt-6'
          }
        >
          <Header />
          <div className={'w-full pt-8'}>
            <Routes>
              <Route path={Constants.NavAbsolutePathItems.HOME} element={<Home />} />
              <Route path={Constants.NavAbsolutePathItems.SEARCH}>
                <Route path={''} element={<Search />} />
                <Route path={Constants.NavAbsolutePathItems.VIDEO_ADD} element={<VideoAdd />} />
              </Route>
              <Route path={Constants.NavAbsolutePathItems.LIST}>
                <Route path={''} element={<List />} />
                <Route path={Constants.NavAbsolutePathItems.PLAY}>
                  <Route path={''} element={<Play />} />
                  <Route path={Constants.NavAbsolutePathItems.VIDEO_EDIT} element={<VideoTimeChange />} />
                </Route>
              </Route>
            </Routes>
          </div>
          <CustomToast />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
