import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation'
import { setNavOpen } from './modules/navExpansion'
import Home from './routes/Home'

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
        <div className={'w-full h-full bg-background-light rounded-l-3xl p-6'}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
