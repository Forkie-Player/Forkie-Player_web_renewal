import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { NoSearchString } from '../../../lib/strings'
import SearchbarView from '../view/SearchbarView'

interface IProps {
  onSearch: (search: string) => void
}

function SearchbarContainer({ onSearch: onSearchCallback }: IProps) {
  const [search, setSearch] = useState('')

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimedSearch = search.trim()
    if (trimedSearch.length !== 0) {
      onSearchCallback(trimedSearch)
    } else {
      toast.error(NoSearchString)
    }

    setSearch(trimedSearch)
  }

  return <SearchbarView search={search} onChangeSearchText={onChangeSearchText} onSearch={onSearch} />
}

export default React.memo(SearchbarContainer)
