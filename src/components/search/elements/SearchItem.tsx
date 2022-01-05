import parseViews from '../../../lib/utils/parseViews'
import { ISearchResult } from '../../../types'

interface IProps {
  data: ISearchResult
  index: number
}
function SearchItem({ data, index }: IProps) {
  return (
    <div
      className="w-full h-fit flex gap-8
            hover:drop-shadow-xl  
            cursor-pointer"
    >
      <div className="relative w-80 max-w-sm min-w-80 aspect-video rounded-2xl overflow-hidden">
        <div className="absolute right-2 bottom-2 text-white">{data.duration}</div>
        <img src={data.thumbnail} alt={'thumbnail'} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-1">
        <div className="text-lg">{data.title}</div>
        <div className="flex gap-4">
          <div className="text-base text-blackberry-lightest leading-8">조회수 {parseViews(data.views)}회</div>
          <div className="text-base text-blackberry-lightest leading-8">{data.uploadedAt}</div>
        </div>
        <div className="flex gap-2">
          <img src={data.channelAvatar} alt={'channel'} className="w-8 h-8 rounded-full" />
          <div className="text-base leading-8">{data.channelTitle}</div>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
