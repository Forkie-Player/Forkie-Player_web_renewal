import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../lib/utils/auth'
import { RootModuleType } from '../../modules/moduleTypes'
import { getPlaylistAsync } from '../../modules/playlist/actions'
import { getUserInfo } from '../../modules/userInfo/actions'
import { setNavOpen } from '../../modules/navExpansion/actions'
import { NavAbsolutePathItems } from '../../lib/constants'
import HeaderView from './indexView'
import { getSearchResult } from '../../modules/searchResult/actions'

function Header() {
  const { userInfo, playlistsLength, isSmScreen } = useSelector(
    ({ userInfo, playlist, isSmScreen }: RootModuleType) => ({
      userInfo,
      playlistsLength: playlist.items.length,
      isSmScreen,
    }),
  )
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const onSearch = useCallback(
    (search: string) => {
      navigate(NavAbsolutePathItems.SEARCH)
      dispatch(getSearchResult.request(search))
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
    dispatch(getUserInfo.request())
    dispatch(getPlaylistAsync.request())
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
      onSearch={onSearch}
      onClickLogout={onClickLogout}
      onClickNavOpen={onClickNavOpen}
      onClickProfile={onClickProfile}
    />
  )
}
export default React.memo(Header)
