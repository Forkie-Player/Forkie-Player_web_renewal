import { createReducer } from 'typesafe-actions'
import { userInfoActionTypes } from './actions'
import { TUserInfoType, TUserInfo_Action } from './types'

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
const userInfoReducer = createReducer<TUserInfoType, TUserInfo_Action>(initialState, {
  [userInfoActionTypes.GET_USERINFO]: state => ({ ...state, error: null, success: false, pending: true }),
  [userInfoActionTypes.GET_USERINFO_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    userInfo: { signedin: true, ...action.payload },
  }),
  [userInfoActionTypes.GET_USERINFO_FAILURE]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
  [userInfoActionTypes.UPDATE_PROFILE_IMG]: state => ({ ...state, error: null, success: false, pending: true }),
  [userInfoActionTypes.UPDATE_PROFILE_IMG_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    userInfo: { ...state.userInfo, profileImg: action.payload },
  }),
  [userInfoActionTypes.UPDATE_PROFILE_IMG_FAILURE]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
  [userInfoActionTypes.SET_USERINFO]: (state, action) => ({
    ...state,
    userInfo: { signedin: true, ...action.payload },
  }),
  [userInfoActionTypes.CLEAR_USER_INFO]: () => ({ ...initialState }),
})

export default userInfoReducer
