import { isFirstConstants } from '../../lib/constants'
import * as actions from './actions'

const isFirstString = () => isFirstConstants

jest.mock('../../lib/utils/cookie', () => ({
  getCookie: (input: string) => {
    if (input === `@${isFirstString().P_FIRST}`) {
      return undefined
    }
    if (input === `@${isFirstString().V_FIRST}`) {
      return isFirstString().FIRST
    }
    if (input === `@${isFirstString().ADD_FIRST}`) {
      return isFirstString().NOTFIRST
    }
  },
}))

describe('test getIsFirst', () => {
  test('getIsFirst', () => {
    const result = {
      [isFirstConstants.P_FIRST]: isFirstConstants.FIRST,
      [isFirstConstants.V_FIRST]: isFirstConstants.FIRST,
      [isFirstConstants.ADD_FIRST]: isFirstConstants.NOTFIRST,
    }
    expect(actions.getIsFirst()).toEqual({
      type: actions.isFirstActionTypes.GET_ISFIRST,
      payload: result,
    })
  })
  test('clearIsFirst', () => {
    expect(actions.clearIsFirst(isFirstConstants.P_FIRST)).toEqual({
      type: actions.isFirstActionTypes.CLEAR_ISFIRST,
      payload: isFirstConstants.P_FIRST,
    })
    expect(actions.clearIsFirst(isFirstConstants.V_FIRST)).toEqual({
      type: actions.isFirstActionTypes.CLEAR_ISFIRST,
      payload: isFirstConstants.V_FIRST,
    })
    expect(actions.clearIsFirst(isFirstConstants.ADD_FIRST)).toEqual({
      type: actions.isFirstActionTypes.CLEAR_ISFIRST,
      payload: isFirstConstants.ADD_FIRST,
    })
  })
})
