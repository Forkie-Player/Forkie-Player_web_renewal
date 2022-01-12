import { createReducer } from 'typesafe-actions'
import { videoActionTypes } from './actions'
import { TVideoStoreType, TVideo_Action } from './types'

const initialState: TVideoStoreType = {
  success: false,
  pending: false,
  error: null,
  items: [],
}

const videoReducer = createReducer<TVideoStoreType, TVideo_Action>(initialState, {
  [videoActionTypes.GET_VIDEO]: (state, action) => ({ ...state, error: null, success: false, pending: true }),
  [videoActionTypes.GET_VIDEO_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    items: action.payload,
  }),
  [videoActionTypes.GET_VIDEO_ERROR]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
})

export default videoReducer
