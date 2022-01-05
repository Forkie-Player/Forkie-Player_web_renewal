import { IPlaylistItem } from '../../types'
import ListContainer from './container/ListContainer'

const items: IPlaylistItem[] = [
  {
    id: 1,
    createdAt: new Date('2021-12-11'),
    title: 'pop music',
    thumbnail:
      'https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg',
    category: 'OTHER',
  },

  {
    id: 2,
    createdAt: new Date('2021-12-10'),
    title: 'k-pop',
    thumbnail: 'https://freemusicdownloads.world/wp-content/uploads/2020/03/pop-music-1.jpg',

    category: 'OTHER',
  },
  {
    id: 3,
    createdAt: new Date('2021-12-9'),
    title: 'default',
    thumbnail:
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fd12b3eb0-10ec-11e8-aa39-e7299ff3a5e8.jpg?crop=3000%2C1687%2C0%2C156&resize=1200',

    category: 'OTHER',
  },
  {
    id: 4,
    createdAt: new Date('2021-12-30'),
    title: '이건 한글',
    thumbnail: 'https://wallpaperaccess.com/full/2742175.jpg',

    category: 'OTHER',
  },
]

function ListComponent() {
  return (
    <div className="w-full h-full pl-[5%]">
      <ListContainer items={items} />
    </div>
  )
}
export default ListComponent
