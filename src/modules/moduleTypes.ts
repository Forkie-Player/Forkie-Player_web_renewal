import rootReducer from '.'
import { setNavClose, setNavOpen } from './navExpansion'
import { setScreenSize } from './screenSize'

export type RootModuleType = ReturnType<typeof rootReducer>

// NavExpansion
export type TNavExpansion = boolean
export type TNavExpansion_ACTION = ReturnType<typeof setNavClose> | ReturnType<typeof setNavOpen>

//screenSize
export type TScreenSize = string
export type TScreenSize_ACTION = ReturnType<typeof setScreenSize>
