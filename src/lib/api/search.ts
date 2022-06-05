import axios from 'axios'
import { SearchPlatformType } from '../../types'
import { cloudfunctionAddress } from './constants'
import { ISearchSuccess } from './types'

export const getSearchResultByPlatform = async ({
  search,
  platform = 'youtube',
}: {
  search: string
  platform: SearchPlatformType
}) => {
  const res = await axios.get<ISearchSuccess>(
    `${cloudfunctionAddress}/api/search/${platform}?search=${decodeURIComponent(search)}`,
  )
  return res
}
