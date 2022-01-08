import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IVideo } from '../../../types'
import SearchView from '../view/SearchView'

import * as Constants from '../../../lib/constants'
import { TSearchResultType } from '../../../modules/searchResult/types'

interface IProps {
  searchResult: TSearchResultType
}

function SearchContainer({ searchResult }: IProps) {
  const navigate = useNavigate()

  const onClickItem = (item: IVideo) => {
    navigate(Constants.NavPathItems.VIDEO_ADD, { state: item })
  }

  return <SearchView searchResultItems={searchResult.items} loading={searchResult.pending} onClickItem={onClickItem} />
}

export default SearchContainer
