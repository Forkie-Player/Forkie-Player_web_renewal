import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../lib/utils/auth'
import { RootModuleType } from '../../../modules/moduleTypes'
import { getPlaylistAsync } from '../../../modules/playlist/actions'
import { getUserInfo } from '../../../modules/userInfo/actions'
import ProfileView from '../view/ProfileView'

function ProfileContainer() {
  const { userInfo, playlistsLength } = useSelector(({ userInfo, playlist }: RootModuleType) => ({
    userInfo,
    playlistsLength: playlist.items.length,
  }))

  const dispatch = useDispatch()

  const onClickLogout = async () => {
    await logout()
    dispatch(getUserInfo.request())
    dispatch(getPlaylistAsync.request())
  }

  return <ProfileView userInfo={userInfo.userInfo} playlistsLength={playlistsLength} onClickLogout={onClickLogout} />
}

export default ProfileContainer
