import { ICrawlResultItem, IPlaylist, IToken, IUserInfo, IVideoHasRange, IVideoInPlaylist } from '../../types'

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
  response: IToken
}

// getUserInfo  반환 타입
export interface IGetUserInfoSuccess {
  success: boolean
  error: string | null
  response: IUserInfo
}

// 회원 가입 반환 타입
export interface ISignUpSuccess {
  success: boolean
  error: null
  response: IUserInfo
}

// 비회원 -> 회원 전환 반환 타입
export interface IChangeToMemberSuccess {
  success: boolean
  error: null
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
export interface IUpdateProfileSuccess {
  success: boolean
  error: null
  response: IUserInfo
}

// search 타입
export interface ISearchSuccess {
  data: {
    items: ICrawlResultItem[]
  }
}

// 플레이리스트 get 반환 타입
export interface IGetPlaylistSuccess {
  success: boolean
  error: null
  response: IPlaylist[]
}

// 플레이리스트 create 타입
export interface ICreatePlaylistRequest {
  title: string
  isPublic: boolean
  category: string
}
export interface ICreatePlaylistSuccess {
  success: boolean
  error: null
  response: IPlaylist
}

// 플레이리스트 제목 edit 요청 타입
export interface IEditPlaylistTitleRequest {
  id: number
  title: string
}
export interface IEditPlaylistTitleSuccess {
  success: boolean
  error: null
  id: number
  editted: boolean
}

// 플레이리스트 삭제 타입
export type TDeletePlaylistRequest = number
export interface IDeletePlaylistSuccess {
  success: boolean
  error: null
  id: number
  deleted: boolean
}

// 플레이리스트 안의 비디오 순서 변경 api 타입
export interface ISeqListItem {
  id: number
  sequence: number
}
export interface IChangeVideoOrderInPlaylistRequest {
  playlistId: number
  seqList: ISeqListItem[]
}
export interface IChangeVIdeoOrderInPlaylistSuccess {
  success: boolean
  error: null
  response: ISeqListItem[]
}

// 비디오를 플레이리스트에 추가하는 api 타입
export interface IAddVideoToPlaylistRequest {
  playlistId: number
  video: IVideoHasRange
}
export interface IAddVideoToPlaylistSuccess {
  success: boolean
  error: null
  response: IVideoInPlaylist
}

// 비디오 조회 반환타입
export interface IGetVideoListSuccess {
  success: boolean
  error: null
  response: IVideoInPlaylist[]
}

// 비디오 삭제 성공 반환 타입
export interface IDeleteVideoSuccess {
  success: boolean
  error: null
  id: number
  deleted: boolean
}

// 비디오 timelapse 변경 타입
export interface IEditVideoTimeRangeRequest {
  id: number
  start: number
  end: number
}
export interface IEditVideoTimeRangeSuccess {
  success: boolean
  error: null
  id: number
  edited: boolean
}
