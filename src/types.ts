// 크롤러 타입
export interface ICrawlAuthor {
  name: string
  bestAvatar: {
    url: string
  }
}
export interface ICrawlThumbnail {
  url: string
}
export interface ICrawlResultItem {
  id: string
  title: string
  thumbnails?: ICrawlThumbnail[]
  bestThumbnail: ICrawlThumbnail
  author: ICrawlAuthor
  duration: string
  views: number
  uploadedAt: string
}

// 비디오 아이템
export interface IVideo {
  videoId: string
  title: string
  thumbnail: string
  channelTitle: string
  channelAvatar: string
  duration: string
  views: number
  uploadedAt: string
}

// 시작과 끝이 정해진 비디오 타입
export interface IVideoHasRange extends IVideo {
  start: number
  end: number
}

export interface IVideoInPlaylist extends IVideoHasRange {
  id: number
  sequence: number
}

// JWT 토큰 타입
export interface IToken {
  accessToken: string
  refreshToken: string
}

// 유저 정보 타입
export interface IUserInfo {
  id: number
  loginId: string
  profileImg: string
  authority: string
  pc: boolean
  member: boolean
}

// 플레이 리스트
export interface IPlaylist {
  id: number
  title: string
  thumbnail: string
}
