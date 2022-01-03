import rootReducer from '.'
import { setNavClose, setNavOpen } from './navExpansion'

export type RootModuleType = ReturnType<typeof rootReducer>

// NavExpansion
export type TNavExpansion = boolean
export type TNavExpansion_ACTION = ReturnType<typeof setNavClose> | ReturnType<typeof setNavOpen>
