import React from 'react'
import Lottie from 'react-lottie-player'

import LoadingAnimation from '../../assets/animations/loading.json'

function LoadingElement(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Lottie animationData={LoadingAnimation} loop play style={{ width: 100, height: 100, margin: 'auto' }} />
    </div>
  )
}
export default LoadingElement
