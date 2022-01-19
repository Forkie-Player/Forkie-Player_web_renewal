import React, { HTMLProps } from 'react'
import { GoTriangleDown } from 'react-icons/go'
import secondsToHHMMSS from '../../../lib/utils/secondsToHHMMSS'

interface IProps {
  props: HTMLProps<HTMLDivElement>
  second: number
}

const SingleLapseIndicator = ({ props, second }: IProps) => {
  return (
    <div {...props} className="unselectable text-base text-center transition-all">
      <div className="-translate-x-1/3">{secondsToHHMMSS(second)}</div>
      <GoTriangleDown />
    </div>
  )
}

export default React.memo(SingleLapseIndicator)
