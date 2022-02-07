import { createReducer } from 'typesafe-actions'
import sortPlaylistBySequence from '../../lib/utils/sortPlaylist'
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
  [videoActionTypes.GET_VIDEO_SUCCESS]: (state, action) => {
    const sortedItems = action.payload.items.sort(sortPlaylistBySequence)
    return {
      ...state,
      success: true,
      pending: false,
      playlistId: action.payload.playlistId,
      currentVideo: sortedItems[0],
      items: sortedItems,
    }
  },
  [videoActionTypes.GET_VIDEO_ERROR]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
  [videoActionTypes.DELETE_VIDEO]: (state, action) => ({ ...state, error: null, success: false, pending: true }),
  [videoActionTypes.DELETE_VIDEO_SUCCESS]: (state, action) => {
    return {
      ...state,
      currentVideo: action.payload.currentVideo,
      success: true,
      pending: false,
      items: state.items.filter(item => item.id !== action.payload.id),
    }
  },
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
  [videoActionTypes.CHANGE_VIDEO_ORDER]: (state, action) => ({
    ...state,
    pending: true,
    success: false,
    error: null,
  }),
  [videoActionTypes.CHANGE_VIDEO_ORDER_SUCCESS]: (state, action) => ({
    ...state,
    pending: false,
    success: true,
    items: state.items
      .map(item => ({ ...item, sequence: action.payload.find(s => s.id === item.id)?.sequence || item.sequence }))
      .sort(sortPlaylistBySequence),
  }),
  [videoActionTypes.CHANGE_VIDEO_ORDER_ERROR]: (state, action) => ({
    ...state,
    pending: false,
    success: false,
    error: action.payload,
  }),
})

export default videoReducer
