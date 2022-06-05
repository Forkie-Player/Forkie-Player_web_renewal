import React from 'react'
import { TSearchResultType } from '../../../modules/searchResult/types'
import { IVideo, SearchPlatformType } from '../../../types'
import SearchView from '../view/SearchView'

interface IProps {
  searchResultStore: TSearchResultType
  onClickItem: (item: IVideo) => void
}

interface ISearchResultView {
  platform: SearchPlatformType
  items: IVideo[]
  pending: boolean
  seeMore: boolean
}
export type TSearchResultViewType = ISearchResultView[]

function SearchContainer({ searchResultStore, onClickItem }: IProps) {
  const [searchResultItems, setSearchResultItems] = React.useState<TSearchResultViewType>([])

  React.useEffect(() => {
    const searchPlatforms = ['youtube', 'twitch', 'dailymotion'] as const
    const newSearchResultItems: ISearchResultView[] = []
    searchPlatforms.forEach(platform => {
      newSearchResultItems.push({
        platform,
        items: searchResultStore[platform].items,
        pending: searchResultStore[platform].pending,
        seeMore: false,
      })
    })
    setSearchResultItems(newSearchResultItems)
  }, [searchResultStore])

  const onClickSeeMore = React.useCallback(
    (platform: SearchPlatformType) => {
      const newSearchResultItems = [...searchResultItems]
      newSearchResultItems.forEach(item => {
        if (item.platform === platform) {
          item.seeMore = !item.seeMore
        }
      })
      setSearchResultItems(newSearchResultItems)
    },
    [searchResultItems],
  )

  return <SearchView searchResultItems={searchResultItems} onClickItem={onClickItem} onClickSeeMore={onClickSeeMore} />
}

export default SearchContainer
