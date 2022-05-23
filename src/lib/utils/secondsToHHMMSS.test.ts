import secondsToHHMMSS from './secondsToHHMMSS'

it('seconds to hh:mm:ss', () => {
  expect(secondsToHHMMSS(0)).toBe('00:00')
  expect(secondsToHHMMSS(1)).toBe('00:01')
  expect(secondsToHHMMSS(60)).toBe('01:00')
  expect(secondsToHHMMSS(41261)).toBe('11:27:41')
})
