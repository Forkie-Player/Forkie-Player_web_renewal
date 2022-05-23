import { loadingActions, loadingActionTypes } from './actions'

describe('setLoading test', () => {
  test('dispach action properly', () => {
    expect(loadingActions.setLoading()).toEqual({
      type: loadingActionTypes.SET_LOADING,
    })
  })
})
describe('setUnloading test', () => {
  test('dispatch action properly', () => {
    expect(loadingActions.setUnloading()).toEqual({
      type: loadingActionTypes.SET_UNLOADING,
    })
  })
})
