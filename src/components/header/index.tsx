import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../lib/utils/auth'
import { RootModuleType } from '../../modules/moduleTypes'
import { setNavOpen } from '../../modules/navExpansion/actions'
import { NavAbsolutePathItems } from '../../lib/constants'
import HeaderView from './indexView'
import { getSearchResult } from '../../modules/searchResult/actions'
import { playlistActions } from '../../modules/playlist/actions'
import { userInfoActions } from '../../modules/userInfo/actions'
import { SearchPlatformType } from '../../types'

function Header() {
  const { userInfo, playlistsLength, isSmScreen, isOpenAuthModal } = useSelector(
    ({ userInfo, playlist, isSmScreen, authModal }: RootModuleType) => ({
      userInfo,
      playlistsLength: playlist.items.length,
      isSmScreen,
      isOpenAuthModal: authModal,
    }),
  )
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const onSearch = useCallback(
    (search: string, selectedPlatform: Array<SearchPlatformType>) => {
      navigate(NavAbsolutePathItems.SEARCH)
      dispatch(getSearchResult({ search: search, platforms: selectedPlatform }))
    },
    [dispatch, navigate],
  )

  const onClickProfile = useCallback(() => {
    if (userInfo.userInfo.member === true) {
      navigate(NavAbsolutePathItems.PROFILE)
    }
  }, [navigate, userInfo])

  const onClickLogout = async () => {
    await logout()
    dispatch(playlistActions.initPlaylist())
    dispatch(userInfoActions.initUserInfo())
    if (location.pathname === NavAbsolutePathItems.PLAY || location.pathname === NavAbsolutePathItems.VIDEO_EDIT)
      navigate(NavAbsolutePathItems.LIST)
  }

  const onClickNavOpen = useCallback(() => {
    dispatch(setNavOpen())
  }, [dispatch])

  return (
    <HeaderView
      isSmScreen={isSmScreen}
      userInfo={userInfo.userInfo}
      playlistsLength={playlistsLength}
      isOpenAuthModal={isOpenAuthModal}
      onSearch={onSearch}
      onClickLogout={onClickLogout}
      onClickNavOpen={onClickNavOpen}
      onClickProfile={onClickProfile}
    />
  )
}
export default React.memo(Header)
