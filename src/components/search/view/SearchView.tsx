import React from 'react'
import { IVideo, SearchPlatformType } from '../../../types'
import SearchItem from '../elements/SearchItem'
import no_search_result from '../../../assets/images/no_search_result.png'
import { PlatformSelectOptionLebels, SearchStrings } from '../../../lib/strings'
import LoadingElement from '../../elements/loading'
import { TSearchResultViewType } from '../container/SearchContainer'
import SeeMore from '../elements/SeeMore'

interface IProps {
  searchResultItems: TSearchResultViewType
  onClickItem: (item: IVideo) => void
  onClickSeeMore: (platform: SearchPlatformType) => void
}

function SearchView({ searchResultItems, onClickItem, onClickSeeMore }: IProps) {
  return (
    <div className="relative w-full h-full space-y-6 px-[5%] pb-4 overflow-y-auto">
      {searchResultItems.length !== 0 ? (
        searchResultItems.map(item => (
          <div key={`search-container-${item.platform}`} className="relative w-full space-y-4 pb-4">
            <div className="w-full text-xl font-bold">
              {PlatformSelectOptionLebels[item.platform] + ' ' + SearchStrings.SEARCH_RESULT}
            </div>
            {!item.pending ? (
              item.items?.length > 0 ? (
                item.seeMore ? (
                  <>
                    {item.items?.map(item => (
                      <SearchItem key={item.videoId} data={item} onClick={onClickItem} />
                    ))}
                    <SeeMore isSeeMore={false} onClick={() => onClickSeeMore(item.platform)} />
                  </>
                ) : (
                  <>
                    {item.items?.slice(0, 3).map(item => (
                      <SearchItem key={item.videoId} data={item} onClick={onClickItem} />
                    ))}
                    <SeeMore isSeeMore={true} onClick={() => onClickSeeMore(item.platform)} />
                  </>
                )
              ) : (
                <div className="relative w-full h-72">
                  <div className="absolute-place-center space-y-4">
                    <img src={no_search_result} alt="no_search_result" className="m-auto w-36 h-36" />
                    <div className="w-full text-center text-blackberry-lightest">{SearchStrings.NO_SEARCH_RESULT}</div>
                  </div>
                </div>
              )
            ) : (
              <div className="relative w-full h-72">
                <div className="absolute-place-center w-36 h-36">
                  <LoadingElement />
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="relative w-full h-72">
          <div className="absolute-place-center space-y-4">
            <img src={no_search_result} alt="no_search_result" className="m-auto w-36 h-36" />
            <div className="w-full text-center text-blackberry-lightest">{SearchStrings.NO_SEARCH_RESULT}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(SearchView)
