import * as test from './test'

/*
jest.mock('./test', () => ({
  ...jest.requireActual('./test'),
  bar: jest.fn().mockReturnValue('foo'),
}))
*/
it('test', () => {
  const mocked_bar = jest.spyOn(test, 'bar')
  mocked_bar.mockImplementationOnce(jest.fn(() => 'foo'))

  /**
   *    Expected: "foo"
        Received: "bar"
   */

  expect(test.foo()).toBe('foo')
  expect(mocked_bar).toBeCalledTimes(1)
})
