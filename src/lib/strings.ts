import secondsToHHMMSS from './utils/secondsToHHMMSS'

export const AppName = 'YourList'

export const GoBack = '뒤로가기'

export const NavLabelItems = {
  HOME: 'Home',
  SEARCH: 'Search',
  LIST: 'List',
}

export const SearchStrings = {
  SEARCH_RESULT: '검색결과',
  NO_SEARCH_RESULT: '검색결과가 없습니다.',
}

export const VideoEdit = {}

export const Profile = {
  NOTMEMBER: '비회원',
  MEMBER: '회원',
}

export const SelectPlaylist = '추가하실 플레이리스트를 선택하세요'
export const TypeNewPlaylistName = '새 플레이리스트 이름을 입력하세요'
export const NonMemberCouldMakeOnlyFive = '비회원은 최대 5개까지만 만들 수 있어요'

export const UnknownError = '알수없는 에러가 발생했어요'
export const addPlaylistSuccess = '플레이리스트가 잘 추가되었어요'
export const addVideoSuccess = '영상이 잘 추가되었어요'

export const applyTimeLapseSuccess = (start: number, end: number) =>
  `제대로 적용되었어요\n${secondsToHHMMSS(start)} ~ ${secondsToHHMMSS(end)}`
