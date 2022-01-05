import React from 'react'
import { ISearchResult } from '../../../types'
import SearchItem from '../elements/SearchItem'

interface IProps {
  searchResult: ISearchResult[]
}

function SearchView({ searchResult }: IProps) {
  return (
    <div className="h-full w-full">
      <div className="h-full overflow-y-auto space-y-4 pr-[5%] pb-16 ">
        <div className="w-full text-xl">검색결과</div>
        {searchResult.map((item, index) => (
          <SearchItem data={item} index={index} key={`searchResult_${index}`} />
        ))}
      </div>
    </div>
  )
}

export default SearchView
