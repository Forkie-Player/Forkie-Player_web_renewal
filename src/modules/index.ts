import { combineReducers } from 'redux'
import navExpansion from './navExpansion'
import screenSize from './screenSize'
import loading from './loading'
import searchResult from './searchResult'

const rootReducer = combineReducers({
  navExpansion,
  screenSize,
  loading,
  searchResult,
})

export default rootReducer
