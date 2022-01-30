import React from 'react'
import ListComponent from '../components/list'
import { AppName } from '../lib/strings'

function List() {
  React.useEffect(() => {
    document.title = `${AppName} - playlits`
  }, [])
  return <ListComponent />
}

export default List
