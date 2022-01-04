import React from 'react'
import SearchbarView from '../view/SearchbarView'

function SearchbarContainer() {
  const [search, setSearch] = React.useState('')

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.target)
  }

  return <SearchbarView search={search} onChangeSearchText={onChangeSearchText} onSubmitSearch={onSubmitSearch} />
}

export default SearchbarContainer
