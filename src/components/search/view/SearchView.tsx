import React from 'react'
import { ISearchResult } from '../../../types'
import SearchItem from '../elements/SearchItem'
import Lottie from 'react-lottie-player'

import LoadingAnimation from '../../../assets/animations/loading.json'
import no_search_result from '../../../assets/images/no_search_result.png'

interface IProps {
  searchResult: ISearchResult[]
  loading: boolean
}

function SearchView({ searchResult, loading }: IProps) {
  return (
    <div className="h-full w-full">
      <div className="h-full overflow-y-auto space-y-4 pr-[5%] pb-16 ">
        <div className="w-full text-xl">검색결과</div>
        {!loading ? (
          searchResult.length > 0 ? (
            searchResult.map((item, index) => <SearchItem data={item} index={index} key={`searchResult_${index}`} />)
          ) : (
            <div className="w-full h-96 max-h-full py-32 space-y-4">
              <img src={no_search_result} alt={'no_search_result'} className="m-auto w-36 h-36" />
              <div className="w-full  text-center text-blackberry-lightest">검색결과가 없습니다</div>
            </div>
          )
        ) : (
          <div className="w-full h-96 max-h-full py-32">
            <Lottie animationData={LoadingAnimation} loop play style={{ width: 100, height: 100, margin: 'auto' }} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchView
