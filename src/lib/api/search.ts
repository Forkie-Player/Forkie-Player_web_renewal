import axios from 'axios'
import { SearchPlatformType } from '../../types'
import { localStorageKey } from '../constants'
import { ErrorMessageFromServer } from '../strings'
import { oauth } from '../utils/auth'
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
  const prevToken = localStorage.getItem(localStorageKey.VIMEO_TOKEN)
  let token = prevToken
  if (token === null) {
    const searchReult = await searchVimeoWithOAuth(search)
    return searchReult
  } else {
    try {
      const searchReult = await getVimeoSearchResult({ token, search })
      return searchReult
    } catch (e) {
      const searchReult = await searchVimeoWithOAuth(search)
      return searchReult
    }
  }
}

export const searchVimeoWithOAuth = async (search: string) => {
  const res = await getVimeoCode()
  const token = await getVimeoAccessToken(res.code)
  localStorage.setItem(localStorageKey.VIMEO_TOKEN, token)
  const searchReult = await getVimeoSearchResult({ token, search })
  return searchReult
}

export const getVimeoCode = async (): Promise<{ code: string }> => {
  const res = await axios.get<{ url: string; state: string }>(`${cloudfunctionAddress}/api/search/vimeo/oauth`)

  return new Promise((resolve, reject) => {
    let state = res.data.state
    oauth({
      storageKey: localStorageKey.VIMEO_STATE,
      url: res.data.url,
      callbackOnStorageEvent: e => {
        if (e.newValue === state) {
          const vimeoCode = localStorage.getItem(localStorageKey.VIMEO_CODE)
          if (vimeoCode !== null) {
            resolve({ code: vimeoCode })
          } else {
            reject(ErrorMessageFromServer.VIMEO_OAUTH_ERROR)
          }
        }
      },
    })
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
