import clsx from 'clsx'
import React from 'react'
import { MdLogin, MdLogout } from 'react-icons/md'
import { IUserInfo } from '../../../types'
import * as Strings from '../../../lib/strings'
import { CustomButtonWrapper } from '../../elements/CustomButton'

interface IProps {
  userInfo: IUserInfo
  playlistsLength: number
  onClickLogout: () => Promise<void>
  onClickLogin: () => void
}

function ProfileView({ userInfo, playlistsLength, onClickLogin, onClickLogout }: IProps) {
  return (
    <div className="flex gap-x-5 w-4/12 h-full justify-end">
      <img
        src={
          userInfo.profileImg !== null ? userInfo.profileImg : 'https://isumstore.co.kr/common/img/default_profile.png'
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
      <button className="text-2xl h-full align-bottom py-2">
        <CustomButtonWrapper>
          {userInfo.member === false ? <MdLogin onClick={onClickLogin} /> : <MdLogout onClick={onClickLogout} />}
        </CustomButtonWrapper>
      </button>
    </div>
  )
}

export default ProfileView
