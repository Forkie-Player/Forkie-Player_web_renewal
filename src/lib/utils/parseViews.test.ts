import parseViews from './parseViews'

describe('parse viewCount', () => {
  it('below 10000', () => {
    expect(parseViews(3200)).toBe('3,200')
  })
  it('above 10000, below 100000000', () => {
    expect(parseViews(320000)).toBe('32만')
  })
  it('above 100000000', () => {
    expect(parseViews(3200003120)).toBe('32억')
  })
})
