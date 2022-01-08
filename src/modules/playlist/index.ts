import { createReducer } from 'typesafe-actions'
import { playlistActionTypes } from './actions'
import { TPlaylistType, TPlaylist_Action } from './types'

const initialState: TPlaylistType = {
  pending: false,
  error: null,
  items: [],
}

const playlistReducer = createReducer<TPlaylistType, TPlaylist_Action>(initialState, {
  [playlistActionTypes.ADD_PLAYLIST]: (state, action) => ({
    pending: false,
    error: null,
    items: [...state.items, { id: action.payload.id, title: action.payload.title, thumbnail: '' }],
  }),
  [playlistActionTypes.GET_PLAYLIST]: state => ({ ...state, pending: true }),
  [playlistActionTypes.GET_PLAYLIST_SUCESS]: (state, action) => ({
    pending: false,
    error: null,
    items: action.payload,
  }),
  [playlistActionTypes.GET_PLAYLIST_ERROR]: state => ({ ...state, pending: false, error: 'error' }),
  [playlistActionTypes.CLEAR_THUMBNAIL]: (state, action) => ({
    ...state,
    items: state.items.map(playlist => (playlist.id === action.payload ? { ...playlist, thumbnail: '' } : playlist)),
  }),
  [playlistActionTypes.SET_THUMBNAIL]: (state, action) => ({
    ...state,
    items: state.items.map(playlist =>
      playlist.id === action.payload.id ? { ...playlist, thumbnail: action.payload.thumbnail } : playlist,
    ),
  }),
})

export default playlistReducer
