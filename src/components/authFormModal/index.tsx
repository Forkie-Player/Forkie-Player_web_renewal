import { useCallback, useState } from 'react'
import { CustomButton } from '../elements/CustomButton'
import SignInFormContainer from './container/SignInFormContainer'
import FormWrapper from './view/FormWrapper'

import * as Strings from '../../lib/strings'
import { login as loginApi, loginWithGoogle, loginWithKakao } from '../../lib/api/auth'
import { handleAuthApiError } from '../../lib/utils/handleAuthErr'
import { SignUp as SignUpApi } from '../../lib/utils/auth'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '../../modules/userInfo/actions'
import { getPlaylistAsync } from '../../modules/playlist/actions'
import CustomModalWrapper from '../elements/CustomModalWrapper'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavAbsolutePathItems } from '../../lib/constants'
import { OAuth2Type } from '../../types'
import OAuthView from './view/OAuthView'
import axios from 'axios'

interface IProps {
  isOpen: boolean
  onClose?: () => void
}

const AuthFormModal = ({ isOpen, onClose }: IProps) => {
  const [onSignInOrSignUp, setOnSignInOrSignUp] = useState<'SignIn' | 'SignUp'>('SignIn')

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const onChangeFormMode = useCallback(() => {
    setOnSignInOrSignUp(prev => (prev === 'SignIn' ? 'SignUp' : 'SignIn'))
  }, [])

  const onSuccessAuth = () => {
    dispatch(getUserInfo.request())
    dispatch(getPlaylistAsync.request())
    if (onClose !== undefined) {
      onClose()
    }
    return 'SUCCESS'
  }

  const onLogin = async (id: string, password: string) => {
    try {
      await loginApi(id, password)
      if (location.pathname === NavAbsolutePathItems.PLAY || location.pathname === NavAbsolutePathItems.VIDEO_EDIT)
        navigate(NavAbsolutePathItems.LIST)

      return onSuccessAuth()
    } catch (err) {
      return handleAuthApiError(err)
    }
  }

  const onSignUp = async (id: string, password: string) => {
    try {
      await SignUpApi(id, password)
      return onSuccessAuth()
    } catch (err) {
      return handleAuthApiError(err)
    }
  }

  const onOAuth = async (type: OAuth2Type) => {
    try {
      switch (type) {
        case 'kakao':
          await loginWithKakao()
          break
        case 'google':
          await loginWithGoogle()
          break
      }
      onSuccessAuth()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data)
      }
    }
  }

  return (
    <CustomModalWrapper isOpen={isOpen} onRequestClose={onClose}>
      <FormWrapper mode={onSignInOrSignUp}>
        <SignInFormContainer isOnSignUp={onSignInOrSignUp === 'SignUp'} onLogin={onLogin} onSignUp={onSignUp} />
        <CustomButton
          text={onSignInOrSignUp === 'SignIn' ? Strings.auth.SIGNUP : Strings.auth.SIGNIN}
          type="secondary"
          onClick={onChangeFormMode}
          className="py-2"
        />
        <OAuthView onOAuth={onOAuth} />
      </FormWrapper>
    </CustomModalWrapper>
  )
}

export default AuthFormModal
