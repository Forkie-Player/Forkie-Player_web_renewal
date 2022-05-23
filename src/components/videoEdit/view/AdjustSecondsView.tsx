import React from 'react'
import AdjustSeconds from '../elements/AdjustSeconds'

interface IProps {
  onClickAdjustSeconds: (right: boolean, offset: number) => void
}

function AdjustSecondsView({ onClickAdjustSeconds }: IProps) {
  return (
    <div className="w-full flex justify-between">
      <AdjustSeconds onClickAdjustSeconds={onClickAdjustSeconds} />
      <AdjustSeconds right onClickAdjustSeconds={onClickAdjustSeconds} />
    </div>
  )
}

export default React.memo(AdjustSecondsView)
