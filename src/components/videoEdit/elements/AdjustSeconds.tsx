import React from 'react'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import { CustomButtonWrapper } from '../../elements/CustomButton'

interface IProps {
  right?: boolean
  onClickAdjustSeconds: (right: boolean, offset: number) => void
}

function AdjustSeconds({ right, onClickAdjustSeconds }: IProps) {
  return (
    <div className={`flex gap-x-2 ${right ? 'translate-x-6' : '-translate-x-6'}`}>
      <CustomButtonWrapper className="p-0">
        <FiMinusCircle
          className="text-2xl rounded-full text-blackberry"
          onClick={() => onClickAdjustSeconds(right !== undefined ? right : false, -1)}
        />
      </CustomButtonWrapper>
      <CustomButtonWrapper className="p-0">
        <FiPlusCircle
          className="text-2xl rounded-full text-blackberry"
          onClick={() => onClickAdjustSeconds(right !== undefined ? right : false, 1)}
        />
      </CustomButtonWrapper>
    </div>
  )
}

export default AdjustSeconds
