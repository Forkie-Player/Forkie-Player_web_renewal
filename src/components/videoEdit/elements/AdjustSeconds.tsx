import React from 'react'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'

interface IProps {
  right?: boolean
  onClickAdjustSeconds: (right: boolean, offset: number) => void
}

function AdjustSeconds({ right, onClickAdjustSeconds }: IProps) {
  return (
    <div className={`flex gap-x-2 ${right === undefined ? '-' : ''}translate-x-6`}>
      <FiMinusCircle
        className="text-2xl rounded-2xl text-blackberry 
      cursor-pointer hover:shadow-outer hover:drop-shadow-md active:drop-shadow-none active:shadow-inner"
        onClick={() => onClickAdjustSeconds(right !== undefined, -1)}
      />
      <FiPlusCircle
        className="text-2xl rounded-2xl text-blackberry 
      cursor-pointer hover:shadow-outer hover:drop-shadow-md  active:drop-shadow-none  active:shadow-inner"
        onClick={() => onClickAdjustSeconds(right !== undefined, 1)}
      />
    </div>
  )
}

export default React.memo(AdjustSeconds)
