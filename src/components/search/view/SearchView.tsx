import React from 'react'
import { IVideo } from '../../../types'
import SearchItem from '../elements/SearchItem'
import no_search_result from '../../../assets/images/no_search_result.png'
import { SearchStrings } from '../../../lib/strings'
import LoadingElement from '../../elements/loading'

interface IProps {
  searchResultItems: IVideo[]
  loading: boolean
  onClickItem: (item: IVideo) => void
}

function SearchView({ searchResultItems, loading, onClickItem }: IProps) {
  return (
    <div className="h-full space-y-4 pr-[5%] pb-16 ">
      <div className="w-full text-xl">{SearchStrings.SEARCH_RESULT}</div>
      {!loading ? (
        searchResultItems.length > 0 ? (
          searchResultItems.map((item, index) => (
            <SearchItem data={item} index={index} key={`searchResult_${index}`} onClickItem={onClickItem} />
          ))
        ) : (
          <div className="w-full h-96 max-h-full py-32 space-y-4">
            <img src={no_search_result} alt={'no_search_result'} className="m-auto w-36 h-36" />
            <div className="w-full  text-center text-blackberry-lightest">{SearchStrings.NO_SEARCH_RESULT}</div>
          </div>
        )
      ) : (
        <div className="w-full h-96 max-h-full py-32">
          <LoadingElement />
        </div>
      )}
    </div>
  )
}

export default SearchView
