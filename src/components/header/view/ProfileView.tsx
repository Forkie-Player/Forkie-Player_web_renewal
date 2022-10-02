import clsx from 'clsx'
import React from 'react'
import { MdLogin, MdLogout } from 'react-icons/md'
import { IUserInfo } from '../../../types'
import * as Strings from '../../../lib/strings'
import { CustomButtonWrapper } from '../../elements/CustomButton'
import PopperHoverWrapper from '../../elements/PopperHoverWrapper'

import ProfileImage from '../../elements/ProfileImage'

interface IProps {
  isSmScreen: boolean
  userInfo: IUserInfo
  playlistsLength: number
  onClickLogout: () => Promise<void>
  onClickLogin: () => void
  onClickProfile: () => void
}

function ProfileView({ isSmScreen, userInfo, playlistsLength, onClickLogin, onClickLogout, onClickProfile }: IProps) {
  const referenceElement = React.useRef<HTMLDivElement | null>(null)

  return (
    <div className="flex h-full justify-end gap-x-2 md:basis-7/12 md:gap-x-4">
      {false && userInfo.loginId !== '' && (
        <div className={clsx(userInfo.member && 'cursor-pointer', 'flex h-full gap-x-2')} onClick={onClickProfile}>
          <ProfileImage isMember={userInfo.member} imgSrc={userInfo.profileImg} />
          {!isSmScreen && (
            <div className="py-1 align-middle text-sm">
              <p>{userInfo.member === true ? userInfo.loginId : Strings.Profile.NOTMEMBER}</p>
              <p className="text-blackberry-lightest">has {playlistsLength} lists</p>
            </div>
          )}
        </div>
      )}
      <CustomButtonWrapper ref={referenceElement} className="my-auto text-2xl">
        {userInfo.member === false ? (
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
      {((false && userInfo.loginId !== '') || (false && isSmScreen)) && (
        <PopperHoverWrapper referenceElement={referenceElement.current}>
          <div className="rounded-lg bg-black p-1 text-xs text-white">
            {userInfo.member === false ? Strings.Login : Strings.Logout}
          </div>
        </PopperHoverWrapper>
      )}
    </div>
  )
}

export default ProfileView
