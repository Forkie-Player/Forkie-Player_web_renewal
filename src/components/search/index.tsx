import React from 'react'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../modules/moduleTypes'
import SearchContainer from './container/SearchContainer'

function SearchComponent() {
  const searchResult = useSelector(({ searchResult }: RootModuleType) => searchResult)

  return (
    <div className="w-full h-full pl-[5%]">
      <SearchContainer searchResult={searchResult} />
    </div>
  )
}

export default SearchComponent
