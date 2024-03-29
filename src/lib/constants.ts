import { SearchPlatformType } from '../types'

export const NavAbsolutePathItems = {
  HOME: '/',
  PROFILE: '/profile',
  SEARCH: '/search',
  LIST: '/list',
  VIDEO_ADD: '/search/add',
  PLAY: '/list/play',
  VIDEO_EDIT: '/list/play/edit',
  OAUTH: '/oauth',
  OAUTH_VIMEO: '/oauth/vimeo',
}

export const screenSizeString = {
  XSM: 'xsm',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl`',
  '3XL': '3xl',
}

export const screenSizeWidth = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1546,
  '3XL': 1920,
}

export const reactPlayerPrefixURL: {
  [key in SearchPlatformType]: string
} = {
  YOUTUBE: 'https://www.youtube.com/watch?v=',
  TWITCH: 'https://www.twitch.tv/videos/',
  DAILYMOTION: 'https://www.dailymotion.com/video/',
  VIMEO: 'https://vimeo.com/',
}

export const isFirstConstants = {
  FIRST: 'FIRST' as const,
  NOTFIRST: 'NOT_FIRST' as const,
  P_FIRST: 'p_first' as const,
  V_FIRST: 'v_first' as const,
  ADD_FIRST: 'ADD_FIRST' as const,
}

export const videoAspectRatio = 1.777777
export const infiniteEndTime = 1000000000000

export const searchPlatforms: SearchPlatformType[] = ['YOUTUBE', 'TWITCH', 'DAILYMOTION', 'VIMEO']

export const localStorageKey = {
  TOKENS: '@tokens',
  VIMEO_STATE: 'vimeoState',
  VIMEO_CODE: 'vimeoCode',
  VIMEO_TOKEN: 'vimeoToken',
  SELECTED_PLATFORM: 'selectedPlatform',
  ONCE_VIMEO_SEARCHED: 'onceVimeoSearched',
}
