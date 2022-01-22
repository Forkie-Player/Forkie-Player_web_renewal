import clsx from 'clsx'
import React from 'react'
import { MdLogin, MdLogout } from 'react-icons/md'
import { IUserInfo } from '../../../types'
import * as Strings from '../../../lib/strings'
import { CustomButtonWrapper } from '../../elements/CustomButton'
import PopperHoverWrapper from '../../elements/PopperHoverWrapper'

interface IProps {
  userInfo: IUserInfo
  playlistsLength: number
  onClickLogout: () => Promise<void>
  onClickLogin: () => void
  onClickProfile: () => void
}

function ProfileView({ userInfo, playlistsLength, onClickLogin, onClickLogout, onClickProfile }: IProps) {
  const referenceElement = React.useRef<HTMLDivElement | null>(null)

  return (
    <div className="flex gap-x-4 w-4/12 h-full justify-end">
      <div className={clsx(userInfo.member && 'cursor-pointer', 'flex h-full gap-x-2')} onClick={onClickProfile}>
        <img
          src={
            userInfo.profileImg !== null && userInfo.profileImg !== ''
              ? userInfo.profileImg
              : 'https://isumstore.co.kr/common/img/default_profile.png'
          }
          className={clsx(
            userInfo.member && 'outline outline-2 outline-redrose',
            'h-full w-auto object-cover rounded-full aspect-square',
          )}
          alt="profile"
        />
        <div className="text-sm align-middle py-1">
          <p>{userInfo.member !== false ? userInfo.loginId : Strings.Profile.NOTMEMBER}</p>
          <p className="text-blackberry-lightest">has {playlistsLength} lists</p>
        </div>
      </div>
      <button className="text-2xl h-full align-bottom py-2">
        <CustomButtonWrapper ref={referenceElement}>
          {userInfo.member === false ? <MdLogin onClick={onClickLogin} /> : <MdLogout onClick={onClickLogout} />}
        </CustomButtonWrapper>
      </button>
      <PopperHoverWrapper referenceElement={referenceElement.current}>
        <div className="p-1 bg-black text-white text-xs rounded-lg">
          {userInfo.member === false ? Strings.Login : Strings.Logout}
        </div>
      </PopperHoverWrapper>
    </div>
  )
}

export default ProfileView
