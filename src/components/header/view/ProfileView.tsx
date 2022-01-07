import clsx from 'clsx'
import React from 'react'
import { MdLogin, MdLogout } from 'react-icons/md'
import { IUserInfo } from '../../../types'

interface IProps {
  userInfo: IUserInfo
  playlistsLength: number
}

function ProfileView({ userInfo, playlistsLength }: IProps) {
  console.log(userInfo)
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
        <p>{userInfo.member !== false ? userInfo.loginId : '비회원'}</p>
        <p className="text-blackberry-lightest">has {playlistsLength} lists</p>
      </div>
      <button className="text-2xl h-full align-bottom py-2">
        {userInfo.member === false ? <MdLogin /> : <MdLogout />}
      </button>
    </div>
  )
}

export default ProfileView
