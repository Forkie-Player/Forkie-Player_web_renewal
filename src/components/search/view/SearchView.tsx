import React from 'react'
import { IVideo } from '../../../types'
import SearchItem from '../elements/SearchItem'
import no_search_result from '../../../assets/images/no_search_result.png'
import { SearchStrings } from '../../../lib/strings'
import LoadingElement from '../../elements/loading'

interface IProps {
  searchResultItems: IVideo[]
  pending: boolean
  onClickItem: (item: IVideo) => void
}

function SearchView({ searchResultItems, pending, onClickItem }: IProps) {
  return (
    <div className="relative w-full h-full space-y-4 px-[5%] pb-4 overflow-y-auto">
      <div className="w-full text-xl font-bold">{SearchStrings.SEARCH_RESULT}</div>
      {!pending ? (
        searchResultItems.length > 0 ? (
          searchResultItems.map(item => <SearchItem key={item.videoId} data={item} onClick={onClickItem} />)
        ) : (
          <div className="absolute-place-center space-y-4">
            <img src={no_search_result} alt="no_search_result" className="m-auto w-36 h-36" />
            <div className="w-full text-center text-blackberry-lightest">{SearchStrings.NO_SEARCH_RESULT}</div>
          </div>
        )
      ) : (
        <div className="absolute-place-center w-36 h-36">
          <LoadingElement />
        </div>
      )}
    </div>
  )
}

export default React.memo(SearchView)
