import React from 'react'
import { GoTriangleDown } from 'react-icons/go'
import secondsToHHMMSS from '../../../lib/utils/secondsToHHMMSS'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  second: number
}

const SingleLapseIndicator = ({ second, ...props }: IProps) => {
  return (
    <div
      {...props}
      className="unselectable text-base text-center transition-all translate-x-1/3 -translate-y-14 text-blackberry"
    >
      <div className="-translate-x-1/3">{secondsToHHMMSS(second)}</div>
      <GoTriangleDown />
    </div>
  )
}

export default React.memo(SingleLapseIndicator)
