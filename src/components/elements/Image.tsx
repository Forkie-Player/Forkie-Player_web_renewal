import React from 'react'
import { useImage } from 'react-image'

export default function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src } = useImage({
    srcList: props.src || '',
  })
  return <img alt="" {...props} src={src} />
}
