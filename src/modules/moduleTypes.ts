import rootReducer from '.'

export type RootModuleType = ReturnType<typeof rootReducer>

export interface IAsyncState {
  pending: boolean
  error: string | null
}
