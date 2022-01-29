import React from 'react'
import HomeComponent from '../components/home'
import { AppName } from '../lib/strings'

function Home() {
  React.useEffect(() => {
    document.title = `${AppName} - home`
  }, [])

  return <HomeComponent />
}

export default Home
