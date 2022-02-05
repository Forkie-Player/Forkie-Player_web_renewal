import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  thumbnail: string
  duration: string
}

function VideoThumbnail({ thumbnail, duration, ...props }: IProps) {
  return (
    <div {...props} className={twMerge('relative h-full w-full', props.className)}>
      <img src={thumbnail} alt="thumbnail" className="h-full w-full object-cover" />
      <div className="absolute right-2 bottom-2 text-white">{duration}</div>
    </div>
  )
}

export default React.memo(VideoThumbnail)
