import { testPassword } from './testRegs'

describe('test password format', () => {
  it('only numbers should be false', () => {
    expect(testPassword('12345678')).toBeFalsy()
  })
  it('less than 8 should be false', () => {
    expect(testPassword('a1!')).toBeFalsy()
  })
  it('have digits, alphabet, special symbol and length should be between 8 and 20', () => {
    expect(testPassword('1!abcasw')).toBeTruthy()
  })
  it('longer than 20 should be false', () => {
    expect(testPassword('1!abcasw11!abcasw1!@@')).toBeFalsy()
  })
})
