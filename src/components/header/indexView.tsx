import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { authModalActions } from '../../modules/authModal/actions'
import { IUserInfo, SearchPlatformType } from '../../types'
import AuthFormModal from '../authFormModal'
import SearchbarContainer from './container/SearchbarContainer'
import NavButtonView from './view/NavButtonView'
import ProfileView from './view/ProfileView'

interface IProps {
  isSmScreen: boolean
  userInfo: IUserInfo
  playlistsLength: number
  isOpenAuthModal: boolean
  onSearch: (search: string, selectedPlatform: Array<SearchPlatformType>) => void
  onClickLogout: () => Promise<void>
  onClickProfile: () => void
  onClickNavOpen: () => void
}

const HeaderView = ({
  isOpenAuthModal,
  isSmScreen,
  userInfo,
  playlistsLength,
  onSearch,
  onClickLogout,
  onClickProfile,
  onClickNavOpen,
}: IProps) => {
  const dispatch = useDispatch()
  const onClickOpenAuthForm = useCallback(() => {
    dispatch(authModalActions.openAuthModal())
  }, [dispatch])
  const onClickCloseAuthForm = useCallback(() => dispatch(authModalActions.closeAuthModal()), [dispatch])

  return (
    <header className="flex h-12 justify-between gap-x-4 px-2 md:px-[5%]">
      <NavButtonView isSmScreen={isSmScreen} onClickNavOpen={onClickNavOpen} />
      <SearchbarContainer onSearch={onSearch} />
      <ProfileView
        isSmScreen={isSmScreen}
        userInfo={userInfo}
        playlistsLength={playlistsLength}
        onClickLogin={onClickOpenAuthForm}
        onClickLogout={onClickLogout}
        onClickProfile={onClickProfile}
      />
      <AuthFormModal isOpen={isOpenAuthModal} onClose={onClickCloseAuthForm} />
    </header>
  )
}

export default HeaderView
