import { ActionType } from 'typesafe-actions'
import { IUserInfo } from '../../types'
import { IAsyncState } from '../moduleTypes'
import { userInfoActions } from './actions'

export type TUserInfo_Action = ActionType<typeof userInfoActions>

export type TUserInfoType = IAsyncState & { userInfo: IUserInfo & { signedin: boolean } }
