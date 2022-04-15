import playlistReducer from '.'
import { TPlaylistType } from './types'
import * as actions from './actions'
import { temp_playlist, temp_videoHasRange } from '../../lib/tempData'

describe('test playlistReducer', () => {
  let state: TPlaylistType = {
    success: false,
    pending: false,
    error: null,
    items: [],
  }
  test('ADD_PLAYLIST', () => {
    state = playlistReducer(
      state,
      actions.createPlaylistAsync.request({ title: 'test', isPublic: false, category: 'OTHER' }),
    )
    expect(state).toEqual({
      ...state,
      pending: true,
    })
  })
  test('ADD_PLAYLIST_SUCCESS', () => {
    state = playlistReducer(state, actions.createPlaylistAsync.success(null))
    expect(state).toEqual({
      ...state,
      success: true,
      pending: false,
      items: [temp_playlist[0]],
    })
  })
  test('ADD_PLAYLIST_FAILUER', () => {
    state = playlistReducer(state, actions.createPlaylistAsync.failure('test'))
    expect(state).toEqual({
      ...state,
      success: false,
      pending: false,
      error: 'test',
    })
  })
  test('GET_PLAYLIST', () => {
    state = playlistReducer(state, actions.getPlaylistAsync.request())
    expect(state).toEqual({
      ...state,
      pending: true,
    })
  })
  test('GET_PLAYLIST_SUCCESS', () => {
    state = playlistReducer(state, actions.getPlaylistAsync.success(temp_playlist))
    expect(state).toEqual({
      ...state,
      success: true,
      pending: false,
      items: temp_playlist,
    })
  })
  test('GET_PLAYLIST_FAILURE', () => {
    state = playlistReducer(state, actions.getPlaylistAsync.failure('test'))
    expect(state).toEqual({
      ...state,
      success: false,
      pending: false,
      error: 'test',
    })
  })
  test('DELETE_PLAYLIST', () => {
    state = playlistReducer(state, actions.deletePlaylistAsync.request(temp_playlist[0].id))
    expect(state).toEqual({
      ...state,
      pending: true,
    })
  })
  test('DELETE_PLAYLIST_SUCCESS', () => {
    state = playlistReducer(state, actions.deletePlaylistAsync.success(null))
    expect(state).toEqual({
      ...state,
      success: true,
      pending: false,
      items: temp_playlist.filter(item => item.id !== temp_playlist[0].id),
    })
  })
  test('DELETE_PLAYLIST_FAILURE', () => {
    state = playlistReducer(state, actions.deletePlaylistAsync.failure('test'))
    expect(state).toEqual({
      ...state,
      success: false,
      pending: false,
      error: 'test',
    })
  })
  test('CLEAR_THUMBNAIL', () => {
    state = playlistReducer(state, actions.clearThumbnail(temp_playlist[1].id))
    expect(state).toEqual({
      ...state,
      items: state.items.map(item => {
        if (item.id === temp_playlist[1].id) {
          return {
            ...item,
            thumbnail: null,
          }
        }
        return item
      }),
    })
  })
  test('SET_THUMBNAIL', () => {
    state = playlistReducer(state, actions.setThumbnail(temp_playlist[1].id, 'test_thumbnail'))
    expect(state).toEqual({
      ...state,
      items: state.items.map(item => {
        if (item.id === temp_playlist[1].id) {
          return {
            ...item,
            thumbnail: 'test_thumbnail',
          }
        }
        return item
      }),
    })
  })
  test('ADD_VIDEO', () => {
    state = playlistReducer(
      state,
      actions.addVideoAsync.request({ playlistId: temp_playlist[1].id, video: temp_videoHasRange }),
    )
    expect(state).toEqual({
      ...state,
      pending: true,
    })
  })
  test('ADD_VIDEO_SUCCESS', () => {
    state = playlistReducer(
      state,
      actions.addVideoAsync.success({ id: temp_playlist[1].id, thumbnail: temp_videoHasRange.thumbnail }),
    )
    expect(state).toEqual({
      ...state,
      success: true,
      pending: false,
      items: state.items.map(item => {
        if (item.id === temp_playlist[1].id && item.thumbnail === null) {
          return {
            ...item,
            thumbnail: temp_videoHasRange.thumbnail,
          }
        }
        return item
      }),
    })

    // 썸네일이 비어있을때는 새로 넣음
    state = playlistReducer(state, actions.clearThumbnail(temp_playlist[1].id))
    state = playlistReducer(
      state,
      actions.addVideoAsync.success({ id: temp_playlist[1].id, thumbnail: temp_videoHasRange.thumbnail }),
    )
    expect(state).toEqual({
      ...state,
      success: true,
      pending: false,
      items: state.items.map(item => {
        if (item.id === temp_playlist[1].id && item.thumbnail === null) {
          return {
            ...item,
            thumbnail: temp_videoHasRange.thumbnail,
          }
        }
        return item
      }),
    })
  })
  test('ADD_VIDEO_FAILURE', () => {
    state = playlistReducer(state, actions.addVideoAsync.failure('test'))
    expect(state).toEqual({
      ...state,
      success: false,
      pending: false,
      error: 'test',
    })
  })

  // EDIT
  test('EDIT_PLAYLIST_TITLE', () => {
    state = playlistReducer(
      state,
      actions.editPlaylistTitleAsync.request({ playlistId: temp_playlist[1].id, title: 'new_title' }),
    )
    expect(state).toEqual({
      ...state,
      pending: true,
    })
  })
  test('EDIT_PLAYLIST_TITLE_SUCCESS', () => {
    state = playlistReducer(
      state,
      actions.editPlaylistTitleAsync.success({ playlistId: temp_playlist[1].id, title: 'new_title' }),
    )
    expect(state).toEqual({
      ...state,
      success: true,
      pending: false,
      items: state.items.map(item => {
        if (item.id === temp_playlist[1].id) {
          return {
            ...item,
            title: 'new_title',
          }
        }
        return item
      }),
    })
  })
  test('EDIT_PLAYLIST_TITLE_FAILURE', () => {
    state = playlistReducer(state, actions.editPlaylistTitleAsync.failure('test'))
    expect(state).toEqual({
      ...state,
      success: false,
      pending: false,
      error: 'test',
    })
  })
})
