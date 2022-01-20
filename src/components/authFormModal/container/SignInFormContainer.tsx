import React, { useState } from 'react'
import { checkId, checkPassword, checkPasswordCheck, classifyError } from '../../../lib/utils/handleAuthErr'
import SignInFormView from '../view/SignInFormView'

interface IProps {
  isOnSignUp: boolean
  onLogin: (id: string, password: string) => Promise<string>
  onSignUp: (id: string, password: string) => Promise<string>
}

function SignInFormContainer({ isOnSignUp, onLogin, onSignUp }: IProps) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [idError, setIdError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordCheckError, setPasswordCheckError] = useState('')

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdError('')
    setId(e.target.value)
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError('')
    setPassword(e.target.value)
  }
  const onChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheckError('')
    setPasswordCheck(e.target.value)
  }
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const checkIdMessage = checkId(id)
    if (checkIdMessage !== '') {
      setIdError(checkIdMessage)
      return
    }
    const checkPasswordMessage = checkPassword(password)
    if (checkPasswordMessage !== '') {
      setPasswordError(checkPasswordMessage)
      return
    }
    if (isOnSignUp) {
      const checkPasswordCheckMessage = checkPasswordCheck(password, passwordCheck)
      if (checkPasswordCheckMessage !== '') {
        setPasswordCheckError(checkPasswordCheckMessage)
        return
      }
    }

    if (isOnSignUp) {
      handleAuthApiRes(await onSignUp(id, password))
    } else {
      handleAuthApiRes(await onLogin(id, password))
    }
  }

  const handleAuthApiRes = (res: string) => {
    if (res !== 'SUCCESS') {
      const check = classifyError(res)
      switch (check) {
        case 'password':
          setPasswordError(res)
          break
        case 'id':
          setIdError(res)
          break
        default:
          setPasswordCheckError(res)
      }
    }
  }

  return (
    <SignInFormView
      idError={idError}
      passwordError={passwordError}
      passwordCheckError={passwordCheckError}
      isOnSignUp={isOnSignUp}
      onChangeId={onChangeId}
      onChangePassword={onChangePassword}
      onChangePasswordCheck={onChangePasswordCheck}
      onSubmitForm={onSubmitForm}
    />
  )
}

export default SignInFormContainer
