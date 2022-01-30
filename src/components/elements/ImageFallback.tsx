import React from 'react'
import Image from './Image'
function ImageFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <React.Suspense fallback={<div className="w-full h-full bg-blackberry-lightest" />}>
      <Image {...props} />
    </React.Suspense>
  )
}

export default React.memo(ImageFallback)
