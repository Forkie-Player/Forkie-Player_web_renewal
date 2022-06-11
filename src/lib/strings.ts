export const AppName = 'Forkie'

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

export const Login = '로그인'
export const Logout = '로그아웃'
export const Playlists = '재생목록'

export const SelectPlaylist = '추가하실 플레이리스트를 선택하세요'
export const TypeNewPlaylistName = '새 플레이리스트 이름을 입력하세요'
export const SameTitleInPlaylist = '이미 존재하는 제목이에요'
export const SameTitleCurrent = '같은 제목이에요'
export const EnterName = '제목을 입력해주세요.'

export const addPlaylistSuccess = '플레이리스트가 잘 추가되었어요'
export const addVideoSuccess = '영상이 잘 추가되었어요'

export const applyTimeLapseSuccess = `적용되었어요`

export const CheckVideoEdit = '정말로 수정하시나요?'
export const CheckVideoDelete = '정말로 삭제하시나요?'

export const BlackInput = '내용을 입력해주세요'

export const ErrorMessageFromServer = {
  EXCEED_NONMEMBER_MAX_PLAYLIST: '비회원 playlist 제한을 초과하였습니다.',
  REMOVE_USER_FAIL: '회원 탈퇴 실패',
  NONMEMBER_LOGIN_FAIL: '비회원 로그인 실패',
  NOT_EXIST_PLAYLIST: '존재하지 않는 영상 목록',
  NOT_EXIST_VIDEO: '존재하지 않는 영상',
  NOT_YOUR_PLAYLIST: '요청 대상(Member)과 Target의 소유자(Member)가 다릅니다.',
  SHOULD_BE_POSITIVE: '음수일 수 없는 값입니다.',
  STARTTIME_GRATER_THAN_ENDTIME: '시작시간이 종료시간보다 큽니다.',
  WRONG_PLAYLIST: '같은 영상 목록 내 영상들이 아닙니다.',
  WRONG_SEQUENCE: '영상의 순서에 오류가 있습니다.',
  YOUTUBE_SEARCH_ERROR: 'youtube search error',
  TWITCH_SEARCH_ERROR: 'twitch search error',
  DATILYMOTION_SEARCH_ERROR: 'dailymotion search error',
}

export const ErrorMessageToUser = {
  EXCEED_NONMEMBER_MAX_PLAYLIST: '비회원은 최대 5개까지만 만들 수 있어요',
  UNKOWN_ERROR: '알수없는 에러가 발생했어요',
  REMOVE_USER_FAIL: '회원 탈퇴에 실패했어요.\n잠시후 다시 시도해주세요.',
  UPDATE_PROFILE_IMG_FAIL: '프로필 사진 업데이트에 실패했어요.\n 잠시후 다시 시도해주세요.',
  NOT_EXIST_PLAYLIST: '존재하지 않는 영상 목록이에요.',
  NOT_EXIST_VIDEO: '존재하지 않는 영상이에요.',
  NOT_YOUR_PLAYLIST: '다른 사람의 플레이리스트에요.',
  SHOULD_BE_POSITIVE: '영상 시간은 양수여야만 해요.',
  STARTTIME_GRATER_THAN_ENDTIME: '시작시간은 종료시간보다 작아야해요.',
  WRONG_PLAYLIST: '다른 플레이리스트의 영상이에요.',
  WRONG_SEQUENCE: '영상의 순서에 문제가 있어요.',
  YOUTUBE_SEARCH_ERROR: '유튜브 검색에 실패했어요.',
  TWITCH_SEARCH_ERROR: '트위치 검색에 실패했어요.',
  DATILYMOTION_SEARCH_ERROR: 'Dailymotion 검색에 실패했어요.',
}

export const auth = {
  SIGNIN: '로그인',
  SIGNUP: '회원가입',
  WITHDRAWL: '회원탈퇴',
  CHANGE_PASSWORD: '비밀번호 변경',
  BLANK_ID: '아이디를 입력해주세요',
  SHORT_ID: '아이디는 6자 이상이어야 해요',
  BLANK_PASSWORD: '비밀번호를 입력해주세요',
  BLANK_PASSWORD_CHECK: '비밀번호 확인을 입력해주세요',
  INPUT_PASSWORD_AGAIN: '비밀번호를 다시 입력해주세요.',
  INPUT_NEW_PASSWORD: '새 비밀번호를 입력해주세요.',
  PASSWORD_CHANGE_SUCCESS: '비밀번호 변경에 성공했어요!',
  LEAVING_REALY: '정말로 탈퇴하시나요?',
  WITHDRAWL_SUCCESS: '그동안 감사했어요',
  PASSWORD_CHECK_NOT_MATCH: '비밀번호가 일치하지 않아요',
  PASSWORD_NOT_FORMATTED: '알파벳, 숫자, 특수문자 조합으로 8~20자이어야 해요',
  SAME_PASSWORD: '기존 비밀번호와 같은 비밀번호에요',
  WRONG_PASSWORD: '비밀번호가 틀려요',
  USER_NOT_EXST: '존재하지 않는 유저에요',
  ID_ALREADY_EXST: '이미 존재하는 아이디에요',
  UNKNOWN_ERROR: '알수없는 에러가 발생했어요',
  WRONG_ID: '이메일 혹은 아이디를 입력해주세요.',
  WRONG_EMAIL: '이메일 형식이 아니에요',
}

export const THANKYOU = '감사합니다!!'

export const NoSearchString = '검색어를 입력해주세요.'

export const AskSignin = '서비스를 이용하기 위해서 로그인을 해주세요.'

export const ButtonStrings = {
  APPLY: '적용',
  ADD: '추가',
  DELETE: '삭제',
  EDIT_TITLE: '타이틀 수정',
  YES: '네',
  NO: '아니오',
  COMPLETE: '완료',
  CANCEL: '취소',
}

export const PlatformSelectOptionLebels = {
  youtube: '유튜브',
  twitch: '트위치',
  facebook: '페이스북',
  vimeo: 'Vimeo',
  dailymotion: 'Dailymotion',
}
