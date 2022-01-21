import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../lib/utils/auth'
import { RootModuleType } from '../../modules/moduleTypes'
import { getPlaylistAsync } from '../../modules/playlist/actions'
import { getUserInfo } from '../../modules/userInfo/actions'
import AuthFormModal from '../authFormModal'
import ProfileContainer from './container/ProfileContainer'
import SearchbarContainer from './container/SearchbarContainer'

function Header() {
  const [isOpenAuthForm, setIsOpenAuthForm] = useState(false)
  const navigate = useNavigate()

  const { userInfo, playlistsLength } = useSelector(({ userInfo, playlist }: RootModuleType) => ({
    userInfo,
    playlistsLength: playlist.items.length,
  }))
  const dispatch = useDispatch()

  const onClickLogin = useCallback(() => setIsOpenAuthForm(true), [])
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
  }

  return (
    <div className="flex justify-between pl-[5%] pr-[5%] h-12 ">
      <SearchbarContainer />
      <ProfileContainer
        userInfo={userInfo.userInfo}
        playlistsLength={playlistsLength}
        onClickLogin={onClickLogin}
        onClickLogout={onClickLogout}
        onClickProfile={onClickProfile}
      />
      <AuthFormModal isOpen={isOpenAuthForm} onClose={onClickCloseAuthForm} />
    </div>
  )
}
export default Header
