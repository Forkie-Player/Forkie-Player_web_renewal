import React from 'react'
import { FaSearch } from 'react-icons/fa'

interface IProps {
  search: string
  onChangeSearchText: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

function SearchbarView({ search, onChangeSearchText, onSearch }: IProps) {
  return (
    <div className="h-full flex-1 md:basis-5/12 bg-white rounded-2xl shadow-outer p-1">
      <form className="relative flex w-full h-full bg-background-light rounded-2xl" onSubmit={onSearch}>
        <input
          id="search"
          type="search"
          value={search}
          placeholder="Search"
          className="w-full h-full pl-4 pr-12 placeholder:text-blackberry-lightest shadow-inner bg-background-light rounded-2xl focus:outline-none"
          onChange={onChangeSearchText}
        ></input>

        <button
          id="submit"
          type="submit"
          className="absolute right-1 w-8 h-full rounded-r-2xl text-blackberry-lightest"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  )
}

export default SearchbarView
