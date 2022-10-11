import { IPlaylist, IToken, IUserInfo, IVideo, IVideoHasRange, IVideoInPlaylist } from '../../types'

// 요청 실패
export interface IRequestFail {
  success: boolean
  response: null
  status: number
  message: string
}

// reissue 반환 타입
export interface IReissueSuccess {
  success: boolean
  error: string | null
  data: IToken
}

// getUserInfo  반환 타입
export interface IGetUserInfoSuccess {
  success: boolean
  error: string | null
  response: IUserInfo
}

//회원 삭제 반환타입
export interface IRemoveUserSuccess {
  success: boolean
  error: null
  response: string
}

// 비밀먼호 업데이터 반환 타입
export interface IUpdateUserSuccess {
  success: boolean
  error: null
  response: IUserInfo
}

// 프로필사진 업데이트 타입
export interface IUpdateProfileImgSuccess {
  success: boolean
  error: null
  response: IUserInfo
}

// search 타입
export interface ISearchSuccess {
  data: IVideo[]
}

// 플레이리스트 get 반환 타입
export interface IGetPlaylistSuccess {
  status: number
  message: string
  data: IPlaylist[]
}

// 플레이리스트 create 타입
export interface ICreatePlaylistRequest {
  title: string
  isPublic: boolean
  category: string
}
export interface ICreatePlaylistSuccess {
  status: number
  message: string
  data: null
}

// 플레이리스트 제목 edit 요청 타입
export interface IEditPlaylistTitleRequest {
  playlistId: number
  title: string
}
export interface IEditPlaylistTitleSuccess {
  status: number
  message: string
  data: null
}

// 플레이리스트 삭제 타입
export type TDeletePlaylistRequest = number
export interface IDeletePlaylistRequest {
  playlistId: number
  playId: number
}
export interface IDeletePlaylistSuccess {
  status: number
  message: string
  data: null
}

// 플레이리스트 안의 비디오 순서 변경 api 타입
export interface ISeqListItem {
  playId: number
  sequence: number
}
export interface IChangeVideoOrderInPlaylistRequest {
  playlistId: number
  list: ISeqListItem[]
}
export interface IChangeVIdeoOrderInPlaylistSuccess {
  status: number
  message: string
  data: null
}

// 비디오를 플레이리스트에 추가하는 api 타입
export interface IAddVideoToPlaylistRequest {
  playlistId: number
  video: Omit<IVideoHasRange, 'start' & 'end' & 'channelImage'> & {
    startTime: number
    endTime: number
    channelImg?: string
  }
}
export interface IAddVideoToPlaylistSuccess {
  success: boolean
  error: null
  response: IVideoInPlaylist
}

// 비디오 조회 반환타입
export interface IGetVideoListSuccess {
  status: number
  message: string
  data: IVideoInPlaylist[]
}

// 비디오 삭제 성공 반환 타입
export interface IDeleteVideoSuccess {
  status: number
  message: string
  data: null
}

// 비디오 timelapse 변경 타입
export interface IEditVideoTimeRangeRequest {
  playlistId: number
  playId: number
  startTime: number
  endTime: number
}
export interface IEditVideoTimeRangeSuccess {
  status: number
  message: string
  data: null
}

// 인기 동영상 파이어베이스 반환 타입
export interface IFBPopularVideo {
  contentDetails: {
    duration: string
  }
  id: string
  snippet: {
    channelTitle: string
    thumbnails: {
      medium: {
        url: string
      }
    }
    title: string
    publishedAt: string
  }
  statistics: {
    viewCount: string
  }
  channelAvatar: string
}
export interface IGetPopularVideoSuccess {
  popular: IFBPopularVideo[]
}
