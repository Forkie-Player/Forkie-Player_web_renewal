import { useCallback, useState } from 'react'
import { IUserInfo } from '../../types'
import AuthFormModal from '../authFormModal'
import SearchbarContainer from './container/SearchbarContainer'
import NavButtonView from './view/NavButtonView'
import ProfileView from './view/ProfileView'

interface IProps {
  isSmScreen: boolean
  userInfo: IUserInfo
  playlistsLength: number
  onSearch: (search: string) => void
  onClickLogout: () => Promise<void>
  onClickProfile: () => void
  onClickNavOpen: () => void
}

const HeaderView = ({
  isSmScreen,
  userInfo,
  playlistsLength,
  onSearch,
  onClickLogout,
  onClickProfile,
  onClickNavOpen,
}: IProps) => {
  const [isOpenAuthForm, setIsOpenAuthForm] = useState(false)

  const onClickOpenAuthForm = useCallback(() => {
    setIsOpenAuthForm(true)
  }, [])
  const onClickCloseAuthForm = useCallback(() => setIsOpenAuthForm(false), [])

  return (
    <header className="flex justify-between px-2 md:px-[5%] h-12 gap-x-4">
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
      <AuthFormModal isOpen={isOpenAuthForm} onClose={onClickCloseAuthForm} />
    </header>
  )
}

export default HeaderView
