import React from 'react'
import SearchComponent from '../components/search'
import { AppName } from '../lib/strings'

function Search() {
  React.useEffect(() => {
    document.title = `${AppName} - search`
  }, [])
  return <SearchComponent />
}

export default Search
