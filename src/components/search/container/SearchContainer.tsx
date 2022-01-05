import React from 'react'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../../modules/moduleTypes'
import { ISearchResult } from '../../../types'
import SearchView from '../view/SearchView'

interface IProps {
  searchResult: ISearchResult[]
}

function SearchContainer({ searchResult }: IProps) {
  const loading = useSelector(({ loading }: RootModuleType) => loading)
  return <SearchView searchResult={searchResult} loading={loading} />
}

export default SearchContainer
