import { HandleProps } from 'rc-slider'
import React from 'react'
import CustomRangeHandle from '../elements/CustomRangeHandle'
import RangeView from '../view/RangeView'

interface IProps {
  range: number[]
  max: number
  handleRefs: React.RefObject<HTMLDivElement>[]
  onChange: (range: number[]) => void
}

function RangeContainer({ range, max, onChange, handleRefs }: IProps) {
  const renderCustomHandle = (props: HandleProps & { index: number }) => {
    return <CustomRangeHandle props={props} ref={handleRefs[props.index]} />
  }

  return <RangeView range={range} max={max} onChange={onChange} renderCustomHandle={renderCustomHandle} />
}

export default RangeContainer
