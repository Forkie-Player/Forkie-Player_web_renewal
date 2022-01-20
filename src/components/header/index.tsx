import { useCallback, useState } from 'react'
import AuthFormModal from '../authFormModal'
import ProfileContainer from './container/ProfileContainer'
import SearchbarContainer from './container/SearchbarContainer'

function Header() {
  const [isOpenAuthForm, setIsOpenAuthForm] = useState(false)

  const onClickLogin = useCallback(() => setIsOpenAuthForm(true), [])
  const onClickCloseAuthForm = useCallback(() => setIsOpenAuthForm(false), [])

  return (
    <div className="flex justify-between pl-[5%] pr-[5%] h-12 ">
      <SearchbarContainer />
      <ProfileContainer onClickLogin={onClickLogin} />
      <AuthFormModal isOpen={isOpenAuthForm} onClose={onClickCloseAuthForm} />
    </div>
  )
}
export default Header
