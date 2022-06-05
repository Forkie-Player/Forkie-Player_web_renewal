import axios from 'axios'
import { SearchPlatformType } from '../../types'
import { ISearchSuccess } from './types'

const localhost = 'http://localhost:3001'
export const getSearchResultByPlatform = async ({
  search,
  platform = 'youtube',
}: {
  search: string
  platform: SearchPlatformType
}) => {
  const res = await axios.get<ISearchSuccess>(
    `${localhost}/api/search/${platform}?search=${decodeURIComponent(search)}`,
  )
  return res
}
