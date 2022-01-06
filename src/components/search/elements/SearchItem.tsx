import parseViews from '../../../lib/utils/parseViews'
import { IVideo } from '../../../types'
import VideoInfo from '../../elements/videoInfo'

interface IProps {
  data: IVideo
  index: number
  onClickItem: (item: IVideo) => void
}
function SearchItem({ data, index, onClickItem }: IProps) {
  return (
    <div
      className="w-full h-fit flex gap-8
            hover:bg-background-light-hover
            hover:shadow-outer
            rounded-2xl
            cursor-pointer"
      onClick={() => onClickItem(data)}
    >
      <div className="relative w-80 min-w-[20rem] max-w-[20rem] aspect-video rounded-2xl overflow-hidden">
        <div className="absolute right-2 bottom-2 text-white">{data.duration}</div>
        <img src={data.thumbnail} alt={'thumbnail'} className="w-full h-full object-cover" />
      </div>
      <VideoInfo data={data} />
    </div>
  )
}

export default SearchItem
