import React from 'react'
import { ISearchResult } from '../../../types'
import SearchView from '../view/SearchView'

interface IProps {
  searchResult: ISearchResult[]
}

function SearchContainer({ searchResult }: IProps) {
  return <SearchView searchResult={searchResult} />
}

export default SearchContainer
