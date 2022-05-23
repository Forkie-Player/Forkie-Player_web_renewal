import { IVideo } from '../../../types'
import VideoInfo from '../../elements/videoInfo'

interface IProps {
  data: IVideo
  onClick: (item: IVideo) => void
}
function SearchItem({ data, onClick }: IProps) {
  return (
    <div
      className="w-full h-fit flex gap-4 md:gap-8
            hover:bg-background-light-hover
            hover:shadow-outer
            rounded-2xl
            cursor-pointer"
      onClick={() => onClick(data)}
    >
      <div className="relative w-[40%] min-w-[40%] max-w-[40%]  md:w-80 md:min-w-[20rem] md:max-w-[20rem] aspect-video rounded-2xl overflow-hidden">
        <div className="absolute right-2 bottom-2 text-white">{data.duration}</div>
        <img src={data.thumbnail} alt={'thumbnail'} className="w-full h-full object-cover" />
      </div>
      <VideoInfo data={data} />
    </div>
  )
}

export default SearchItem
