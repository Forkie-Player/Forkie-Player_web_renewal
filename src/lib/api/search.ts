import axios from 'axios'
import { CrawlAddress } from './constants'

export const getSearchResultApi = async (search: string) => {
  const res = await axios.get(`${CrawlAddress}${decodeURIComponent(search)}`)
  return res.data.data.items
}
