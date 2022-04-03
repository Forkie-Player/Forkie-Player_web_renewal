import React from 'react'
import Lottie from 'react-lottie-player'

import SigninAnimation from '../../../assets/animations/signin.json'
import { CustomButton } from '../../elements/CustomButton'

import * as Strings from '../../../lib/strings'

interface IProps {
  onClickSignin: () => void
}

function AskSigninView({ onClickSignin }: IProps) {
  return (
    <div className="w-full h-full">
      <div className="absolute top-1/2 left-1/2 h-min text-xl -translate-x-1/2 -translate-y-1/2 space-y-8">
        <Lottie animationData={SigninAnimation} loop play style={{ width: 150, height: 150, margin: 'auto' }}></Lottie>
        <div className="text-center w-fit">{Strings.AskSignin}</div>
        <CustomButton text={'로그인'} size="small" className="w-full" onClick={onClickSignin}></CustomButton>
      </div>
    </div>
  )
}

export default AskSigninView
