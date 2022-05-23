import React from 'react'
import { useDispatch } from 'react-redux'
import { authModalActions } from '../../../modules/authModal/actions'
import AskSigninView from '../view/AskSigninView'

function AskSigninContainer() {
  const dispatch = useDispatch()
  const onClickSignin = () => {
    dispatch(authModalActions.openAuthModal())
  }

  return <AskSigninView onClickSignin={onClickSignin} />
}

export default AskSigninContainer
