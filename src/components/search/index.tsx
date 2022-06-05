import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootModuleType } from '../../modules/moduleTypes'
import { IVideo } from '../../types'
import * as Constants from '../../lib/constants'
import SearchContainer from './container/SearchContainer'

function SearchComponent() {
  const searchResult = useSelector(({ searchResult }: RootModuleType) => searchResult)

  const navigate = useNavigate()

  const onClickItem = useCallback(
    (item: IVideo) => {
      navigate(Constants.NavAbsolutePathItems.VIDEO_ADD, { state: item })
    },
    [navigate],
  )

  return <SearchContainer searchResultStore={searchResult} onClickItem={onClickItem} />
}

export default SearchComponent
