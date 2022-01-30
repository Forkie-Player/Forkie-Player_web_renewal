import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoading, setUnloading } from '../../../modules/loading/actions'
import { getSearchResult } from '../../../modules/searchResult/actions'
import SearchbarView from '../view/SearchbarView'

function SearchbarContainer() {
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimedSearch = search.trim()
    if (trimedSearch.length !== 0) {
      try {
        dispatch(setLoading())
        navigate('/search')
        dispatch(getSearchResult.request(trimedSearch))
        dispatch(setUnloading())
      } catch (err) {
        console.log(err)
      }
    } else {
      toast.error('검색어를 입력해주세요.')
    }

    setSearch(trimedSearch)
  }

  return <SearchbarView search={search} onChangeSearchText={onChangeSearchText} onSearch={onSearch} />
}

export default SearchbarContainer
