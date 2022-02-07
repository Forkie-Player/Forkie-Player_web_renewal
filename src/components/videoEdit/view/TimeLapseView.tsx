import React from 'react'
import TimeLapse from '../../elements/TimeLapse'

interface IProps {
  range: number[]
}

function TimeLapseView({ range }: IProps) {
  return (
    <div className="max-w-fit mx-auto text-xl xl:text-2xl 2xl:text-3xl">
      <TimeLapse range={range} />
    </div>
  )
}

export default TimeLapseView
