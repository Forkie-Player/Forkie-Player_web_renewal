import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootModuleType } from '../../../modules/moduleTypes'
import { IVideo } from '../../../types'
import SearchView from '../view/SearchView'

import * as Constants from '../../../lib/constants'

interface IProps {
  searchResult: IVideo[]
}

function SearchContainer({ searchResult }: IProps) {
  const loading = useSelector(({ loading }: RootModuleType) => loading)
  const navigate = useNavigate()

  const onClickItem = (item: IVideo) => {
    navigate(Constants.NavPathItems.VIDEO_ADD, { state: item })
  }

  return <SearchView searchResult={searchResult} loading={loading} onClickItem={onClickItem} />
}

export default SearchContainer
