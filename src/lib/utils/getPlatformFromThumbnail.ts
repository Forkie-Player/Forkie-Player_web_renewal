import { SearchPlatformType } from '../../types'

const getPlatformFromThumbnail = (thumbnail: string): SearchPlatformType => {
  if (thumbnail.includes('ytimg')) {
    return 'youtube'
  } else if (thumbnail.includes('dmcdn')) {
    return 'dailymotion'
  } else if (thumbnail.includes('jtvnw')) {
    return 'twitch'
  } else {
    return 'youtube'
  }
}
export default getPlatformFromThumbnail
