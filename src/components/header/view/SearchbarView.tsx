import React from 'react'
import { FaSearch } from 'react-icons/fa'
import Select, { StylesConfig } from 'react-select'
import palette from '../../../lib/style/palette'
import { SearchPlatformType } from '../../../types'

interface IProps {
  search: string
  platformOptions: Array<{ value: SearchPlatformType; label: React.ReactNode }>
  onChangeSearchText: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  onMenuOpen: () => void
  onSelectPlatform: (platform: SearchPlatformType) => void
}
const selectStyles: StylesConfig = {
  control: e => {
    return {
      ...e,
      borderWidth: 0,
      boxShadow: '0 0 0 0px',
      '&:hover': {
        borderColor: palette['primary-yellow'],
      },
    }
  },
  option: (styles, options) => {
    return {
      ...styles,
      backgroundColor: options.isFocused ? palette['primary-yellow-lightest'] : styles.backgroundColor,
      ':active': {
        backgroundColor: palette['primary-yellow-light'],
      },
    }
  },
}

const SearchbarView = React.forwardRef<HTMLDivElement, IProps>(
  ({ search, platformOptions, onChangeSearchText, onSearch, onMenuOpen, onSelectPlatform }: IProps, ref) => {
    return (
      <div ref={ref} className="h-full flex-1 md:basis-5/12 bg-white rounded-2xl shadow-outer p-1 flex">
        <form className="relative flex w-full h-full bg-background-light rounded-2xl flex-1" onSubmit={onSearch}>
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

        <Select
          value={{ value: 'default', label: '검색옵션' }}
          onChange={(e: any) => {
            onSelectPlatform(e.value as SearchPlatformType)
          }}
          onMenuOpen={onMenuOpen}
          options={platformOptions}
          closeMenuOnSelect={false}
          isSearchable={false}
          autoFocus={false}
          className="w-32 z-50 border-0 select-none"
          styles={selectStyles}
        />
      </div>
    )
  },
)

export default SearchbarView
