import loadingReducer from '.'
import { loadingActions } from './actions'

describe('loadingReducer test', () => {
  let initialState = false
  test('should setLoading properly', () => {
    expect(loadingReducer(initialState, loadingActions.setLoading())).toBe(true)
  })
  test('should setUnloading properly', () => {
    expect(loadingReducer(initialState, loadingActions.setUnloading())).toBe(false)
  })
})
