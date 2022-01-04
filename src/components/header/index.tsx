import ProfileContainer from './container/ProfileContainer'
import SearchbarContainer from './container/SearchbarContainer'

function Header() {
  return (
    <div className="flex justify-between pl-[5%] pr-[5%] h-12 ">
      <SearchbarContainer />
      <ProfileContainer />
    </div>
  )
}
export default Header
