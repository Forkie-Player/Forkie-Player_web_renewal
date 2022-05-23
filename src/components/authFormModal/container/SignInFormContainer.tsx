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
    const idCheck = id.trim()
    try {
      checkId(idCheck)
    } catch (err: any) {
      setIdError(err.message)
      return
    }
    try {
      checkPassword(password)
    } catch (err: any) {
      setPasswordError(err.message)
      return
    }
    if (isOnSignUp) {
      try {
        checkPasswordCheck(password, passwordCheck)
      } catch (err: any) {
        setPasswordCheckError(err.message)
        return
      }
    }

    if (isOnSignUp) {
      handleAuthApiRes(await onSignUp(idCheck, password))
    } else {
      handleAuthApiRes(await onLogin(idCheck, password))
    }

    setId(idCheck)
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
      id={id}
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
