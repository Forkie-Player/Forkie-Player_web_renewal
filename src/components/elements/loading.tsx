import Lottie from 'react-lottie-player'

import LoadingAnimation from '../../assets/animations/loading.json'

function LoadingElement() {
  return <Lottie animationData={LoadingAnimation} loop play style={{ width: 100, height: 100, margin: 'auto' }} />
}
export default LoadingElement
