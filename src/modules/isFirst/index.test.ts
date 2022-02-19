import isFirstReducer from '.'
import { isFirstConstants } from '../../lib/constants'
import { clearIsFirst, getIsFirst } from './actions'
import { IIsFirst } from './types'
import * as cookie from '../../lib/utils/cookie'

const initialState: IIsFirst = {
  [isFirstConstants.P_FIRST]: isFirstConstants.NOTFIRST,
  [isFirstConstants.V_FIRST]: isFirstConstants.NOTFIRST,
  [isFirstConstants.ADD_FIRST]: isFirstConstants.NOTFIRST,
}

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
  setCookie: jest.fn(),
}))

describe('test isFirstReducer', () => {
  let state = initialState
  test('GET_ISFIRST', () => {
    state = isFirstReducer(state, getIsFirst())
    expect(state).toEqual({
      [isFirstConstants.P_FIRST]: isFirstConstants.FIRST,
      [isFirstConstants.V_FIRST]: isFirstConstants.FIRST,
      [isFirstConstants.ADD_FIRST]: isFirstConstants.NOTFIRST,
    })
  })
  test('CLEAR_ISFIRST', () => {
    state = isFirstReducer(state, clearIsFirst(isFirstConstants.P_FIRST))
    const mocked_setCookie = jest.spyOn(cookie, 'setCookie')

    expect(mocked_setCookie).toBeCalledTimes(1)
    expect(mocked_setCookie).toBeCalledWith(`@${isFirstString().P_FIRST}`, isFirstConstants.NOTFIRST)
    expect(state).toEqual({
      [isFirstConstants.P_FIRST]: isFirstConstants.NOTFIRST,
      [isFirstConstants.V_FIRST]: isFirstConstants.FIRST,
      [isFirstConstants.ADD_FIRST]: isFirstConstants.NOTFIRST,
    })
  })
})
