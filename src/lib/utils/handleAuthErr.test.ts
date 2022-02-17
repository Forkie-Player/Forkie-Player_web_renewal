import handleErr, * as handleAuthErr from './handleAuthErr'
import { auth as authStrings } from '../strings'

test('handleError test', () => {
  expect(handleErr('blank_id')).toBe(authStrings.BLANK_ID)
  expect(handleErr('short_id')).toBe(authStrings.SHORT_ID)
  expect(handleErr('blank_password')).toBe(authStrings.BLANK_PASSWORD)
  expect(handleErr('auth/wrong-password')).toBe(authStrings.WRONG_PASSWORD)
  expect(handleErr('auth/user-not-found')).toBe(authStrings.USER_NOT_EXST)
  expect(handleErr('auth/id-already-in-use')).toBe(authStrings.ID_ALREADY_EXST)
  expect(handleErr('not_match_password_and_check')).toBe(authStrings.PASSWORD_CHECK_NOT_MATCH)
  expect(handleErr('password_not_formmatted')).toBe(authStrings.PASSWORD_NOT_FORMATTED)
  expect(handleErr('auth/same-password')).toBe(authStrings.SAME_PASSWORD)
  expect(handleErr('unknown_error')).toBe(authStrings.UNKNOWN_ERROR)
})

describe('test checkId', () => {
  test('when id is blank, throw BLANK_ID Message', () => {
    expect(() => handleAuthErr.checkId('')).toThrow(Error(authStrings.BLANK_ID))
  })
  test('when id is too short, throw SHORT_ID message', () => {
    expect(() => handleAuthErr.checkId('123')).toThrow(Error(authStrings.SHORT_ID))
  })
})

describe('test checkPassword', () => {
  test('when password is blank, throw BLANK_PASSWORD', () => {
    expect(() => handleAuthErr.checkPassword('')).toThrow(Error(authStrings.BLANK_PASSWORD))
  })
  test('when password is not formmatted, throw password_not_formatted', () => {
    expect(() => handleAuthErr.checkPassword('123')).toThrow(Error(authStrings.PASSWORD_NOT_FORMATTED))
  })
  test('when password and passwordChedk is not same, throw not_match_password_and_check', () => {
    expect(() => handleAuthErr.checkPassword('asdf1234!', 'asdf1234!@')).toThrow(
      Error(authStrings.PASSWORD_CHECK_NOT_MATCH),
    )
  })
})

test('passwordCheck test', () => {
  expect(() => handleAuthErr.checkPasswordCheck('123', '1234')).toThrow(Error(authStrings.PASSWORD_CHECK_NOT_MATCH))
})

test('classifyError test', () => {
  expect(handleAuthErr.classifyError(authStrings.WRONG_PASSWORD)).toBe('password')
  expect(handleAuthErr.classifyError(authStrings.BLANK_PASSWORD)).toBe('password')
  expect(handleAuthErr.classifyError(authStrings.USER_NOT_EXST)).toBe('id')
  expect(handleAuthErr.classifyError(authStrings.ID_ALREADY_EXST)).toBe('id')
  expect(handleAuthErr.classifyError(authStrings.PASSWORD_CHECK_NOT_MATCH)).toBe('passwordCheck')
  expect(handleAuthErr.classifyError(authStrings.PASSWORD_NOT_FORMATTED)).toBe('password')
  expect(handleAuthErr.classifyError(authStrings.SAME_PASSWORD)).toBe('password')
  expect(handleAuthErr.classifyError(authStrings.UNKNOWN_ERROR)).toBe('password')
})
