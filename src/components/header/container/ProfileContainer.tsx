import React from 'react'
import { IUserInfo } from '../../../types'
import ProfileView from '../view/ProfileView'

interface IProps {
  userInfo: IUserInfo
  playlistsLength: number
  isSmScreen: boolean
  onClickLogin: () => void
  onClickLogout: () => Promise<void>
  onClickProfile: () => void
}

function ProfileContainer({
  isSmScreen,
  userInfo,
  playlistsLength,
  onClickLogout,
  onClickLogin,
  onClickProfile,
}: IProps) {
  return (
    <ProfileView
      isSmScreen={isSmScreen}
      userInfo={userInfo}
      playlistsLength={playlistsLength}
      onClickLogout={onClickLogout}
      onClickLogin={onClickLogin}
      onClickProfile={onClickProfile}
    />
  )
}

export default ProfileContainer
