import rootReducer from '.'
import { setLoading, setUnloading } from './loading'
import { setNavClose, setNavOpen } from './navExpansion'
import { setScreenSize } from './screenSize'
import { clearSearchResult, setSearchResult } from './searchResult'

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
