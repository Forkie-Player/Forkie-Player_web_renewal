import { createReducer } from 'typesafe-actions'
import { playlistActionTypes } from './actions'
import { TPlaylistType, TPlaylist_Action } from './types'

const initialState: TPlaylistType = {
  success: false,
  pending: false,
  error: null,
  items: [],
}

const playlistReducer = createReducer<TPlaylistType, TPlaylist_Action>(initialState, {
  [playlistActionTypes.ADD_PLAYLIST]: (state, action) => ({ ...state, error: null, success: false, pending: true }),
  [playlistActionTypes.ADD_PLAYLIST_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    items: [...state.items, action.payload],
  }),
  [playlistActionTypes.ADD_PLAYLIST_ERROR]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
  [playlistActionTypes.GET_PLAYLIST]: state => ({ ...state, error: null, success: false, pending: true }),
  [playlistActionTypes.GET_PLAYLIST_SUCESS]: (state, action) => ({
    success: true,
    pending: false,
    error: null,
    items: action.payload,
  }),
  [playlistActionTypes.GET_PLAYLIST_ERROR]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
  [playlistActionTypes.CLEAR_THUMBNAIL]: (state, action) => ({
    ...state,
    items: state.items.map(playlist => (playlist.id === action.payload ? { ...playlist, thumbnail: null } : playlist)),
  }),
  [playlistActionTypes.SET_THUMBNAIL]: (state, action) => ({
    ...state,
    items: state.items.map(playlist =>
      playlist.id === action.payload.id ? { ...playlist, thumbnail: action.payload.thumbnail } : playlist,
    ),
  }),
  [playlistActionTypes.ADD_VIDEO]: (state, action) => ({ ...state, success: false, error: null, pending: true }),
  [playlistActionTypes.ADD_VIDEO_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    items: state.items.map(playlist =>
      playlist.id === action.payload.id && playlist.thumbnail === null
        ? { ...playlist, thumbnail: action.payload.thumbnail }
        : playlist,
    ),
  }),
  [playlistActionTypes.ADD_VIDEO_ERROR]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
  [playlistActionTypes.DELETE_PLAYLIST]: (state, action) => ({ ...state, success: false, error: null, pending: true }),
  [playlistActionTypes.DELETE_PLAYLIST_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    items: state.items.filter(playlist => playlist.id !== action.payload),
  }),
  [playlistActionTypes.DELETE_PLAYLIST_ERROR]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
  [playlistActionTypes.EDIT_PLAYLIST_TITLE]: (state, action) => ({
    ...state,
    success: false,
    error: null,
    pending: true,
  }),
  [playlistActionTypes.EDIT_PLAYLIST_TITLE_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    items: state.items.map(playlist =>
      playlist.id === action.payload.id ? { ...playlist, title: action.payload.title } : playlist,
    ),
  }),
  [playlistActionTypes.EDIT_PLAYLIST_TITLE_ERROR]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
})

export default playlistReducer
