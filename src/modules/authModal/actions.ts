import { createAction } from 'typesafe-actions'

const OPEN = 'authModal/OPEN' as const
const CLOSE = 'authModal/CLOSE' as const

export const authModalActionTypes = {
  OPEN,
  CLOSE,
}

export const openAuthModal = createAction(OPEN)()
export const closeAuthModal = createAction(CLOSE)()

export const authModalActions = {
  openAuthModal,
  closeAuthModal,
}
