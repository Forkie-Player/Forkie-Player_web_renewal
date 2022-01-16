import { createReducer } from 'typesafe-actions'
import { IVideoInPlaylist } from '../../types'
import { videoActionTypes } from './actions'
import { TVideoStoreType, TVideo_Action } from './types'

const initialState: TVideoStoreType = {
  success: false,
  pending: false,
  error: null,
  playlistId: null,
  currentVideo: {} as IVideoInPlaylist,
  items: [],
}

const videoReducer = createReducer<TVideoStoreType, TVideo_Action>(initialState, {
  [videoActionTypes.GET_VIDEO]: (state, action) => ({ ...state, error: null, success: false, pending: true }),
  [videoActionTypes.GET_VIDEO_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    playlistId: action.payload.playlistId,
    currentVideo: action.payload.items[0],
    items: action.payload.items,
  }),
  [videoActionTypes.GET_VIDEO_ERROR]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
  [videoActionTypes.DELETE_VIDEO]: (state, action) => ({ ...state, error: null, success: false, pending: true }),
  [videoActionTypes.DELETE_VIDEO_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    items: state.items.filter(item => item.id !== action.payload),
  }),
  [videoActionTypes.DELETE_VIDEO_ERROR]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
  [videoActionTypes.EDIT_TIMERANGE_VIDEO]: (state, action) => ({
    ...state,
    error: null,
    success: false,
    pending: true,
  }),
  [videoActionTypes.EDIT_TIMERANGE_VIDEO_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    items: state.items.map(item => {
      if (item.id === action.payload.id) {
        return { ...item, start: action.payload.start, end: action.payload.end }
      }
      return item
    }),
  }),
  [videoActionTypes.EDIT_TIMERANGE_VIDEO_ERROR]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
  [videoActionTypes.UPDATE_CURRENT_VIDEO]: (state, action) => ({
    ...state,
    currentVideo: action.payload,
  }),
})

export default videoReducer
