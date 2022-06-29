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
  let res
  switch (platform) {
    case 'VIMEO':
      res = await searchVimeo(search)
      return res

    default:
      res = await axios.get<ISearchSuccess>(
        `${cloudfunctionAddress}/api/search/${platform}?search=${decodeURIComponent(search)}`,
      )
      return res
  }
}

export const searchVimeo = async (search: string) => {
  try {
    const prevToken = localStorage.getItem('vimeoToken')
    let token = prevToken
    if (token === null) {
      const res = await getVimeoCode()
      token = await getVimeoAccessToken(res.code)
      localStorage.setItem('vimeoToken', token)
    }
    const searchReult = await getVimeoSearchResult({ token, search })
    return searchReult
  } catch (e) {
    throw e
  }
}

export const getVimeoCode = async (): Promise<{ code: string }> => {
  const res = await axios.get<{ url: string; state: string }>(`${cloudfunctionAddress}/api/search/vimeo/oauth`)

  return new Promise((resolve, reject) => {
    let state = res.data.state

    const localstorageEventCallback = (e: any) => {
      if (e.key === 'vimeoState') {
        window.removeEventListener('storage', localstorageEventCallback)
        if (e.newValue === state) {
          const vimeoCode = localStorage.getItem('vimeoCode')
          if (vimeoCode !== null) {
            resolve({ code: vimeoCode })
          } else {
            reject('vimeo oauth fail')
          }
        }
      }
    }
    window.addEventListener('storage', localstorageEventCallback)

    window.open(res.data.url, '_blank', 'popup noopener noreferrer')
  })
}

export const getVimeoAccessToken = async (code: string) => {
  const res = await axios.post<{ access_token: string }>(`${cloudfunctionAddress}/api/search/vimeo/token`, {
    code,
  })
  return res.data.access_token
}

export const getVimeoSearchResult = async ({ token, search }: { token: string; search: string }) => {
  const res = await axios.get<ISearchSuccess>(
    `${cloudfunctionAddress}/api/search/vimeo?search=${decodeURIComponent(search)}&token=${token}`,
  )
  return res
}
