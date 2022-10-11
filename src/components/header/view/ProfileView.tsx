import clsx from 'clsx'
import React from 'react'
import { MdLogin, MdLogout } from 'react-icons/md'
import * as Strings from '../../../lib/strings'
import { CustomButtonWrapper } from '../../elements/CustomButton'
import PopperHoverWrapper from '../../elements/PopperHoverWrapper'

import ProfileImage from '../../elements/ProfileImage'
import { TUserInfoType } from '../../../modules/userInfo/types'

interface IProps {
  isSmScreen: boolean
  userInfo: TUserInfoType
  playlistsLength: number
  onClickLogout: () => Promise<void>
  onClickLogin: () => void
  onClickProfile: () => void
}

function ProfileView({ isSmScreen, userInfo, playlistsLength, onClickLogin, onClickLogout, onClickProfile }: IProps) {
  const referenceElement = React.useRef<HTMLDivElement | null>(null)

  return (
    <div className="flex h-full justify-end gap-x-2 md:basis-7/12 md:gap-x-4">
      {userInfo.userInfo.loginId !== '' && (
        <div className={clsx('flex h-full cursor-pointer gap-x-2')} onClick={onClickProfile}>
          <ProfileImage imgSrc={null} />
          {!isSmScreen && (
            <div className="py-1 align-middle text-sm">
              <p>{userInfo.userInfo.nickname}</p>
              <p className="text-blackberry-lightest">has {playlistsLength} lists</p>
            </div>
          )}
        </div>
      )}
      <CustomButtonWrapper ref={referenceElement} className="my-auto text-2xl">
        {userInfo.userInfo.signedin === false ? (
          <div className="flex gap-x-2 p-1" onClick={onClickLogin}>
            <div className="align-middle text-base">{!isSmScreen ? Strings.Login + '/' + Strings.auth.SIGNUP : ''}</div>
            <MdLogin />
          </div>
        ) : (
          <div className="flex gap-x-2 p-1" onClick={onClickLogout}>
            <div className="align-middle text-base">{!isSmScreen ? Strings.Logout : ''}</div>
            <MdLogout />
          </div>
        )}
      </CustomButtonWrapper>
      {(userInfo.userInfo.signedin === true || isSmScreen) && (
        <PopperHoverWrapper referenceElement={referenceElement.current}>
          <div className="rounded-lg bg-black p-1 text-xs text-white">
            {userInfo.userInfo.signedin === false ? Strings.Login : Strings.Logout}
          </div>
        </PopperHoverWrapper>
      )}
    </div>
  )
}

export default ProfileView
