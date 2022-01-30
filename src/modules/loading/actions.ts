import { createAction } from 'typesafe-actions'

// 액션 타입
const SET_LOADING = 'loading/SET_LOADING' as const
const SET_UNLOADING = 'loading/SET_UNLOADING' as const

export const loadingActionTypes = {
  SET_LOADING,
  SET_UNLOADING,
}

// 액션 생성 함수
export const setLoading = createAction(SET_LOADING)()
export const setUnloading = createAction(SET_UNLOADING)()

export const loadingActions = {
  setLoading,
  setUnloading,
}
