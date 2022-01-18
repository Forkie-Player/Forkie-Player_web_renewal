import axios from 'axios'
import { CrawlAddress } from './constants'
import { ISearchSuccess } from './types'

export const getSearchResultApi = async (search: string) => {
  const res = await axios.get<ISearchSuccess>(`${CrawlAddress}${decodeURIComponent(search)}`)
  return res.data
}
