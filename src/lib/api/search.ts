import axios from 'axios'
import { SearchPlatformType } from '../../types'
import { cloudfunctionAddress } from './constants'
import { ISearchSuccess } from './types'

export const getSearchResultByPlatform = async ({
  search,
  platform = 'YOUTUBE',
}: {
  search: string
  platform: SearchPlatformType
}) => {
  const res = await axios.get<ISearchSuccess>(
    `${cloudfunctionAddress}/api/search/${platform}?search=${decodeURIComponent(search)}`,
  )
  return res
}

export const getVimeoAccessToken = async () => {
  const res = await axios.get<{ url: string; state: string }>(`${cloudfunctionAddress}/api/search/vimeo`)
  let state = res.data.state

  const localstorageEventCallback = (e: any) => {
    if (e.key === 'vimeoState') {
      window.removeEventListener('storage', localstorageEventCallback)
      if (e.newValue === state) {
        console.log('same state')
        if (localStorage.getItem('vimeoAccessToken')) {
          console.log('accepted')
        } else {
          console.log('unaccepted')
        }
      }
    }
  }
  window.addEventListener('storage', localstorageEventCallback)

  window.open(res.data.url, '_blank', 'popup noopener noreferrer')
  return res
}
