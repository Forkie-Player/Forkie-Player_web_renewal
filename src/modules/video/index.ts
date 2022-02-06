import { createReducer } from 'typesafe-actions'
import sortPlaylistBySequence from '../../lib/utils/sortPlaylist'
import { IVideoInPlaylist } from '../../types'
import { videoActionTypes } from './actions'
import { TVideoStoreType, TVideo_Action } from './types'

const initialState: TVideoStoreType = {
  success: false,
  pending: false,
  error: null,
  playlistId: -1,
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
    /**
     * 비디오 삭제 완료 : 삭제한 영상이
     *  현재 재생중인 동영상이면, 다음 영상 재생(마지막 영상일 경우 첫번째 영상)
     *  현재 재생중인 동영상이 아니면, 현재 재생중인 동영상 유지
     */
    let currentVideo = state.currentVideo
    if (currentVideo.id === action.payload) {
      if (currentVideo.sequence >= state.items.length) {
        currentVideo = state.items[0]
      } else {
        currentVideo = state.items[currentVideo.sequence]
      }
    }

    return {
      ...state,
      currentVideo: currentVideo,
      success: true,
      pending: false,
      items: state.items.filter(item => item.id !== action.payload),
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
