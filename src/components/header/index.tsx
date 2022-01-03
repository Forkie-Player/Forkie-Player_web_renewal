import SearchbarContainer from './container/SearchbarContainer'

function Header() {
  return (
    <div className="w-full">
      <SearchbarContainer />
      <div className="w-20 h-10 bg-redrose"></div>
    </div>
  )
}
export default Header
