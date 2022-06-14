import { SearchPlatformType } from '../../types'

const getPlatformFromThumbnail = (thumbnail: string): SearchPlatformType => {
  if (thumbnail.includes('ytimg')) {
    return 'TWITCH'
  } else if (thumbnail.includes('dmcdn')) {
    return 'DAILYMOTION'
  } else if (thumbnail.includes('jtvnw')) {
    return 'TWITCH'
  } else {
    return 'TWITCH'
  }
}
export default getPlatformFromThumbnail
