import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../lib/utils/auth'
import { RootModuleType } from '../../modules/moduleTypes'
import { getPlaylistAsync } from '../../modules/playlist/actions'
import { getUserInfo } from '../../modules/userInfo/actions'
import AuthFormModal from '../authFormModal'
import ProfileContainer from './container/ProfileContainer'
import SearchbarContainer from './container/SearchbarContainer'

import useIsSmScreen from '../../lib/hooks/useIsSmScreen'
import NavButtonContainer from './container/NavButtonContainer'
import { setNavOpen } from '../../modules/navExpansion/actions'
import { NavAbsolutePathItems } from '../../lib/constants'

function Header() {
  const isSmScreen = useIsSmScreen()

  const [isOpenAuthForm, setIsOpenAuthForm] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const { userInfo, playlistsLength } = useSelector(({ userInfo, playlist }: RootModuleType) => ({
    userInfo,
    playlistsLength: playlist.items.length,
  }))
  const dispatch = useDispatch()

  const onClickLogin = useCallback(() => {
    setIsOpenAuthForm(true)
  }, [])
  const onClickCloseAuthForm = useCallback(() => setIsOpenAuthForm(false), [])

  const onClickProfile = useCallback(() => {
    if (userInfo.userInfo.member === true) {
      navigate('/profile')
    }
  }, [navigate, userInfo])

  const onClickLogout = async () => {
    await logout()
    dispatch(getUserInfo.request())
    dispatch(getPlaylistAsync.request())
    if (location.pathname === NavAbsolutePathItems.PLAY || location.pathname === NavAbsolutePathItems.VIDEO_EDIT)
      navigate(NavAbsolutePathItems.LIST)
  }

  const onClickNavOpen = async () => {
    dispatch(setNavOpen())
  }

  return (
    <header className="flex justify-between px-2 md:px-[5%] h-12 gap-4">
      <NavButtonContainer isSmScreen={isSmScreen} onClickNavOpen={onClickNavOpen} />
      <SearchbarContainer />
      <ProfileContainer
        isSmScreen={isSmScreen}
        userInfo={userInfo.userInfo}
        playlistsLength={playlistsLength}
        onClickLogin={onClickLogin}
        onClickLogout={onClickLogout}
        onClickProfile={onClickProfile}
      />
      <AuthFormModal isOpen={isOpenAuthForm} onClose={onClickCloseAuthForm} />
    </header>
  )
}
export default React.memo(Header)
