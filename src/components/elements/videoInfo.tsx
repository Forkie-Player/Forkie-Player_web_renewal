import parseViews from '../../lib/utils/parseViews'
import { IVideo } from '../../types'

interface IProps {
  data?: IVideo
}

export default function VideoInfo({ data }: IProps) {
  return (
    <div className="space-y-1">
      <div className="line-clamp-3 text-lg">{data?.title}</div>
      <div className="flex gap-4">
        {data?.views && (
          <div className="text-base text-blackberry-lightest leading-8">조회수 {parseViews(data?.views)}회</div>
        )}
        <div className="text-base text-blackberry-lightest leading-8">{data?.uploadedAt}</div>
      </div>
      <div className="flex gap-2">
        <img src={data?.channelAvatar} alt={'channel'} className="w-8 h-8 rounded-full" />
        <div className="text-base leading-8">{data?.channelTitle}</div>
      </div>
    </div>
  )
}
