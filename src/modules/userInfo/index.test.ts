import userInfoReducer from '.'
import { TUserInfoType } from './types'
import * as actions from './actions'
import { temp_userInfo } from '../../lib/tempData'

const initialState: TUserInfoType = {
  success: false,
  pending: false,
  error: null,
  userInfo: {
    signedin: false,
    id: 0,
    loginId: '',
    profileImg: '',
    authority: '',
    pc: true,
    member: false,
    createdAt: new Date(),
  },
}

describe('test userInfoReducer', () => {
  let state = initialState
  test('handle GET_USERINFO', () => {
    state = userInfoReducer(state, actions.getUserInfo.request())
    expect(state).toEqual({
      ...state,
      pending: true,
    })
  })
  test('handle GET_USERINFO_SUCCESS', () => {
    state = userInfoReducer(state, actions.getUserInfo.success(temp_userInfo))
    expect(state).toEqual({
      success: true,
      pending: false,
      error: null,
      userInfo: { signedin: true, ...temp_userInfo },
    })
  })
  test('handle GET_USERINFO_FAILURE', () => {
    state = userInfoReducer(state, actions.getUserInfo.failure('test'))
    expect(state).toEqual({
      ...state,
      success: false,
      pending: false,
      error: 'test',
    })
  })

  test('handle UPDATE_PROFILE_IMG', () => {
    state = userInfoReducer(
      state,
      actions.updateProfileImgAsync.request(
        new File(['foo'], 'foo.txt', {
          type: 'text/plain',
        }),
      ),
    )
    expect(state).toEqual({
      ...state,
      pending: true,
    })
  })

  test('handle UPDATE_PROFILE_IMG_SUCCESS', () => {
    state = userInfoReducer(state, actions.updateProfileImgAsync.success('profileImg url'))
    expect(state).toEqual({
      ...state,
      success: true,
      pending: false,
      error: null,
      userInfo: { ...state.userInfo, profileImg: 'profileImg url' },
    })
  })

  test('handle UPDATE_PROFILE_IMG_FAILURE', () => {
    state = userInfoReducer(state, actions.updateProfileImgAsync.failure('test'))
    expect(state).toEqual({
      ...state,
      success: false,
      pending: false,
      error: 'test',
    })
  })

  test('handle SET_USERINFO', () => {
    const match_state = { ...state, userInfo: { signedin: true, ...temp_userInfo } }
    state = userInfoReducer(state, actions.setUserInfo(temp_userInfo))
    expect(state).toEqual(match_state)
  })

  test('handle CLEAR_USERINFO', () => {
    state = userInfoReducer(state, actions.clearUserInfo())
    expect({ ...state, userInfo: { ...state.userInfo, createdAt: null } }).toEqual({
      ...initialState,
      userInfo: { ...initialState.userInfo, createdAt: null },
    })
  })
})
