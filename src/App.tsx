import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation'
import { RootModuleType } from './modules/moduleTypes'
import { setNavOpen } from './modules/navExpansion'
import Home from './routes/Home'

function App() {
  const dispatch = useDispatch()
  const navExpanded = useSelector(({ navExpansion }: RootModuleType) => navExpansion)

  useEffect(() => {
    dispatch(setNavOpen())
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="flex w-screen h-screen">
        <div className="basis-1/7">
          <Navigation />
        </div>
        <div className="basis-6/7 bg-background-light rounded-l-3xl p-6">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
