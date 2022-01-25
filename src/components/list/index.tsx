import AddPlaylistButton from '../elements/AddPlaylistButton'
import ListContainer from './container/ListContainer'

function ListComponent() {
  return (
    <div className="w-full h-full px-[5%] space-y-4">
      <div className="w-full flex justify-between leading-4">
        <div className="select-none text-xl">재생목록</div>
        <AddPlaylistButton />
      </div>
      <ListContainer />
    </div>
  )
}
export default ListComponent
