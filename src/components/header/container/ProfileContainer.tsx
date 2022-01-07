import React from 'react'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../../modules/moduleTypes'
import ProfileView from '../view/ProfileView'

function ProfileContainer() {
  const { userInfo, playlistsLength } = useSelector(({ userInfo, playlist }: RootModuleType) => ({
    userInfo,
    playlistsLength: playlist.length,
  }))

  return <ProfileView userInfo={userInfo} playlistsLength={playlistsLength} />
}

export default ProfileContainer
