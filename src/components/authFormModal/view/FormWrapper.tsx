import React from 'react'
import logoImg from '../../../assets/images/logo.png'

interface IProps {
  children: React.ReactNode
  mode: 'SignIn' | 'SignUp'
}

const FormWrapper = ({ children, mode }: IProps) => {
  return (
    <div className="text-center p-4 px-8 lg:p-8 lg:px-16">
      <div className="w-full text-center space-y-2">
        <img src={logoImg} alt="logo" className="w-16 h-16 rounded-full mx-auto" />
        <div className="text-2xl font-semibold">{mode === 'SignIn' ? '로그인' : '회원가입'}</div>
      </div>
      <div className="w-full py-12">{children}</div>
    </div>
  )
}

export default React.memo(FormWrapper)
