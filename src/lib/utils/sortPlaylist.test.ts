import sortPlaylistBySequence from './sortPlaylist'

it('sort playlist by sequence', () => {
  const playlist = [
    { sequence: 0 },
    { sequence: 4 },
    { sequence: 1 },
    { sequence: 2 },
    { sequence: 5 },
    { sequence: 6 },
    { sequence: 3 },
  ]
  expect(playlist.sort(sortPlaylistBySequence)).toEqual([
    { sequence: 0 },
    { sequence: 1 },
    { sequence: 2 },
    { sequence: 3 },
    { sequence: 4 },
    { sequence: 5 },
    { sequence: 6 },
  ])
})
