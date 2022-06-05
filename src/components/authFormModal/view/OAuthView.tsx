import React from 'react'
import { OAuth2Type } from '../../../types'
import { CustomButtonWrapper } from '../../elements/CustomButton'

interface IProps {
  onOAuth: (type: OAuth2Type) => Promise<void>
}

function OAuthView({ onOAuth }: IProps) {
  return (
    <div className="w-full mt-6">
      <div className="relative w-full h-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 px-2 text-blackberry-lightest h-6 z-10 bg-white">
          소셜 로그인
        </div>
        <div className="absolute top-3 border-b-[1px] w-full border-blackberry-lightest z-0" />
      </div>
      <div className="w-full h-16 mt-2 flex justify-around ">
        <CustomButtonWrapper className="h-16 w-16 rounded-full p-0" onClick={() => onOAuth('google')}>
          <img
            src="https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg"
            alt="구글 로그인"
            className="rounded-full"
          />
        </CustomButtonWrapper>

        <CustomButtonWrapper className="h-16 w-16 rounded-full p-0" onClick={() => onOAuth('kakao')}>
          <a href="https://forkie-api.com/v1/oauth2/authorization/kakao" target="_blank" rel="noreferrer">
            <img
              src="https://pbs.twimg.com/profile_images/738200195578494976/CuZ9yUAT_400x400.jpg"
              alt="카카오 로그인"
              className="rounded-full"
            />
          </a>
        </CustomButtonWrapper>
      </div>
    </div>
  )
}

export default OAuthView
