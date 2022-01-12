import { IPlaylist, IToken, IUserInfo, IVideoHasRange } from '../../types'

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

// 플레이리스트 get 반환 타입
export interface IGetPlaylistSuccess {
  success: boolean
  error: null
  response: IPlaylist[]
}

// 플레이리스트 create 요청 타입
export interface ICreatePlaylistRequest {
  title: string
  isPublic: boolean
  category: string
}

// 플레이리스트 제목 update 요청 타입
export interface IUpdatePlaylistTitleRequest {
  id: number
  title: string
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

// 비디오를 플레이리스트에 추가하는 api 타입
export interface IAddVideoToPlaylistRequest {
  playlistId: number
  video: IVideoHasRange
}

// 비디오 조회 반환타입
export interface IGetVideoListSuccess {
  success: boolean
  error: null
  response: IVideoHasRange[]
}
