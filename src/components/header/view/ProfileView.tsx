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
    <div className="flex gap-x-2 md:gap-x-4 md:basis-7/12 h-full justify-end">
      <div className={clsx(userInfo.member && 'cursor-pointer', 'flex h-full gap-x-2')} onClick={onClickProfile}>
        <ProfileImage isMember={userInfo.member} imgSrc={userInfo.profileImg} />
        {!isSmScreen && (
          <div className="text-sm align-middle py-1">
            <p>{userInfo.member === true ? userInfo.loginId : Strings.Profile.NOTMEMBER}</p>
            <p className="text-blackberry-lightest">has {playlistsLength} lists</p>
          </div>
        )}
      </div>
      <CustomButtonWrapper ref={referenceElement} className="text-2xl my-auto">
        {userInfo.member === false ? <MdLogin onClick={onClickLogin} /> : <MdLogout onClick={onClickLogout} />}
      </CustomButtonWrapper>
      <PopperHoverWrapper referenceElement={referenceElement.current}>
        <div className="p-1 bg-black text-white text-xs rounded-lg">
          {userInfo.member === false ? Strings.Login : Strings.Logout}
        </div>
      </PopperHoverWrapper>
    </div>
  )
}

export default ProfileView
