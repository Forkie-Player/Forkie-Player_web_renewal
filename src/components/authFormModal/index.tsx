import { useCallback, useState } from 'react'
import ReactModal from 'react-modal'
import { CustomButton } from '../elements/CustomButton'
import SignInFormContainer from './container/SignInFormContainer'
import FormWrapper from './view/FormWrapper'

import * as Strings from '../../lib/strings'
import { login as loginApi } from '../../lib/api/auth'
import { handleAuthApiError } from '../../lib/utils/handleAuthErr'
import { SignUp as SignUpApi } from '../../lib/utils/auth'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '../../modules/userInfo/actions'
import { getPlaylistAsync } from '../../modules/playlist/actions'

interface IProps {
  isOpen: boolean
  onClose: () => void
}

const AuthFormModal = ({ isOpen, onClose }: IProps) => {
  const [onSignInOrSignUp, setOnSignInOrSignUp] = useState<'SignIn' | 'SignUp'>('SignIn')

  const dispatch = useDispatch()

  const onChangeFormMode = useCallback(() => {
    setOnSignInOrSignUp(prev => (prev === 'SignIn' ? 'SignUp' : 'SignIn'))
  }, [])

  const onSuccessAuth = () => {
    dispatch(getUserInfo.request())
    dispatch(getPlaylistAsync.request())
    onClose()
    return 'SUCCESS'
  }

  const onLogin = async (id: string, password: string) => {
    try {
      await loginApi(id, password)
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

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { zIndex: 50 },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          padding: 0,
          maxWidth: 'fit-content',
          maxHeight: 'fit-content',
          borderRadius: '0.5rem',
        },
      }}
    >
      <FormWrapper mode={onSignInOrSignUp}>
        <SignInFormContainer isOnSignUp={onSignInOrSignUp === 'SignUp'} onLogin={onLogin} onSignUp={onSignUp} />
        <CustomButton
          text={onSignInOrSignUp === 'SignIn' ? Strings.auth.SIGNUP : Strings.auth.SIGNIN}
          type="secondary"
          onClick={onChangeFormMode}
          className="p-2"
        />
      </FormWrapper>
    </ReactModal>
  )
}

export default AuthFormModal
