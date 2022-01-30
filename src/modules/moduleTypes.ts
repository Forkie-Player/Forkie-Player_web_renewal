import rootReducer from '.'

export type RootModuleType = ReturnType<typeof rootReducer>

export interface IAsyncState {
  success: boolean
  pending: boolean
  error: string | null
}
