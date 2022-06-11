import React from 'react'
import { IVideo } from '../../types'

import defaultProfileImg from '../../assets/images/default_profile.png'
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: IVideo
}

function VideoInfo({ data, ...props }: IProps) {
  return (
    <div className="space-y-1" {...props}>
      <div className="line-clamp-1 md:line-clamp-2 text-lg">{data?.title}</div>
      <div className="flex gap-4">
        {data?.views && (
          <div className="line-clamp-1 te xt-base text-blackberry-lightest leading-8">조회수 {data?.views}&nbsp;회</div>
        )}
        <div className="line-clamp-1 text-base text-blackberry-lightest leading-8">{data?.uploadedAt}</div>
      </div>
      <div className="flex gap-2">
        {data?.channelImage !== undefined &&
          data?.channelImage !== '' &&
          (data.channelImage === 'default' ? (
            <img src={defaultProfileImg} alt="channel" className="w-8 h-8 rounded-full" />
          ) : (
            <img src={data.channelImage} alt="channel" className="w-8 h-8 rounded-full" />
          ))}
        <div className="text-base leading-8  line-clamp-1">{data?.channelTitle}</div>
      </div>
    </div>
  )
}

export default React.memo(VideoInfo)
