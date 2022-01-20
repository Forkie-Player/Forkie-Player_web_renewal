import React from 'react'
import { CustomButton } from '../../elements/CustomButton'
import CustomInput from '../../elements/CustomInput'

interface IProps {
  idError: string
  passwordError: string
  passwordCheckError: string
  isOnSignUp: boolean
  onChangeId: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangePasswordCheck: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
}

function SignInFormView({
  idError,
  passwordError,
  passwordCheckError,
  isOnSignUp,
  onChangeId,
  onChangePassword,
  onChangePasswordCheck,
  onSubmitForm,
}: IProps) {
  return (
    <div className="w-64">
      <form className="space-y-8 pb-4" onSubmit={onSubmitForm}>
        <CustomInput id="id" type="id" placeholder="아이디" onChange={onChangeId} error={idError} />
        <CustomInput
          id="password"
          type="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
          error={passwordError}
        />
        {isOnSignUp && (
          <CustomInput
            id="password check"
            type="password"
            placeholder="비밀번호 확인"
            onChange={onChangePasswordCheck}
            error={passwordCheckError}
          />
        )}
        <button type="submit" className="w-full">
          <CustomButton text={isOnSignUp ? '회원가입' : '로그인'} style={{ padding: '0.5rem' }} />
        </button>
      </form>
    </div>
  )
}

export default SignInFormView
