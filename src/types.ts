// 재생목록 타입
export interface IPlaylistItem {
  id: number
  title: string
  thumbnail: string
  createdAt: Date
  category: string
}

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

// 검색 결과 아이템
export interface ISearchResult {
  videoId: string
  title: string
  thumbnail: string
  channelTitle: string
  channelAvatar: string
  duration: string
  views: number
  uploadedAt: string
}
