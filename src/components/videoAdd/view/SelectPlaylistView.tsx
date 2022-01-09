import React from 'react'
import palette from '../../../lib/style/palette'
import { IPlaylist } from '../../../types'
import CustomButton from '../../elements/CustomButton'
import PlaylistItem from '../../elements/PlaylistItem'
import * as Strings from '../../../lib/strings'

const items: IPlaylist[] = [
  {
    id: 1,
    title: 'pop music',
    thumbnail:
      'https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg',
  },

  {
    id: 2,
    title: 'k-pop',
    thumbnail: 'https://freemusicdownloads.world/wp-content/uploads/2020/03/pop-music-1.jpg',
  },
  {
    id: 3,
    title: 'default',
    thumbnail:
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fd12b3eb0-10ec-11e8-aa39-e7299ff3a5e8.jpg?crop=3000%2C1687%2C0%2C156&resize=1200',
  },
  {
    id: 4,
    title: '이건 한글',
    thumbnail: 'https://wallpaperaccess.com/full/2742175.jpg',
  },
]

interface IProps {
  playlists: IPlaylist[]
  onClickCancle: () => void
  onClickPlaylist: (item: IPlaylist) => void
}

function SelectPlaylistView({ playlists, onClickCancle, onClickPlaylist }: IProps) {
  return (
    <div className="w-full h-full text-center flex flex-col">
      <div className="w-full basis-11/12 overflow-y-auto ">
        <div className="text-md">{Strings.SelectPlaylist}</div>
        <div className="w-full basis-10/12 flex  overflow-y-auto justify-center flex-wrap gap-y-4 py-4">
          {playlists.map((playlist, index) => (
            <PlaylistItem item={playlist} index={index} onClick={onClickPlaylist} />
          ))}
        </div>
      </div>
      <div className="basis-1/12 p-2 flex justify-center gap-x-4 w-full">
        <CustomButton text="취소" textColor={palette.cancel} onClick={onClickCancle} />
        <CustomButton text="새 플레이리스트" textColor={palette.redrose} onClick={() => console.log('cancle')} />
      </div>
    </div>
  )
}

export default SelectPlaylistView
