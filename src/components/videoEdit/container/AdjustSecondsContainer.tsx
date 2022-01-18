import React from 'react'
import AdjustSecondsView from '../view/AdjustSecondsView'
interface IProps {
  onClickAdjustSeconds: (right: boolean, offset: number) => void
}

function AdjustSecondsContainer({ onClickAdjustSeconds }: IProps) {
  return <AdjustSecondsView onClickAdjustSeconds={onClickAdjustSeconds} />
}

export default AdjustSecondsContainer
