import parseViews from '../../lib/utils/parseViews'
import { IVideo } from '../../types'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: IVideo
}

export default function VideoInfo({ data, ...props }: IProps) {
  return (
    <div className="space-y-1" {...props}>
      <div className="line-clamp-1 md:line-clamp-2 text-lg">{data?.title}</div>
      <div className="flex gap-4">
        {data?.views && (
          <div className="line-clamp-1 te xt-base text-blackberry-lightest leading-8">
            조회수 {parseViews(data?.views)}회
          </div>
        )}
        <div className="line-clamp-1 text-base text-blackberry-lightest leading-8">{data?.uploadedAt}</div>
      </div>
      <div className="flex gap-2">
        {data?.channelAvatar !== undefined && data?.channelAvatar !== '' && (
          <img src={data.channelAvatar} alt={'channel'} className="w-8 h-8 rounded-full" />
        )}
        <div className="text-base leading-8  line-clamp-1">{data?.channelTitle}</div>
      </div>
    </div>
  )
}
