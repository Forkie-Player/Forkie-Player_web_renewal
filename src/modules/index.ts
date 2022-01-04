import { combineReducers } from 'redux'
import navExpansion from './navExpansion'
import screenSize from './screenSize'

const rootReducer = combineReducers({
  navExpansion,
  screenSize,
})

export default rootReducer
