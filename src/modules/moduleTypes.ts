import rootReducer from '.'
import { P_FIRST, V_FIRST, FIRST, NOTFIRST } from './isFirst'
import { clearIsFirst, setIsFirst } from './isFirst'
import { setLoading, setUnloading } from './loading'
import { setNavClose, setNavOpen } from './navExpansion'
import { setScreenSize } from './screenSize'
import { clearSearchResult, setSearchResult } from './searchResult'
import { signin, signout } from './userInfo'
import { ActionType } from 'typesafe-actions'

export type RootModuleType = ReturnType<typeof rootReducer>

// NavExpansion
export type TNavExpansion = boolean
export type TNavExpansion_ACTION = ReturnType<typeof setNavClose> | ReturnType<typeof setNavOpen>

//screenSize
export type TScreenSize = string
export type TScreenSize_ACTION = ReturnType<typeof setScreenSize>

// loading
export type TLoading = boolean
export type TLoading_ACTION = ReturnType<typeof setLoading> | ReturnType<typeof setUnloading>

// searchResult
export type TSearchResult_Action = ReturnType<typeof setSearchResult> | ReturnType<typeof clearSearchResult>

// isFirst
export interface IIsFirst {
  [P_FIRST]: typeof FIRST | typeof NOTFIRST
  [V_FIRST]: typeof FIRST | typeof NOTFIRST
}
export interface ISetIsFirstProps {
  first: IIsFirst
}
export type TIsFirst_Action = ReturnType<typeof setIsFirst> | ReturnType<typeof clearIsFirst>

// userInfo
export type TUserInfo_Action = ActionType<typeof signin> | ActionType<typeof signout>
