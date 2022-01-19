import { HandleProps, Range } from 'rc-slider'
import React from 'react'
import palette from '../../../lib/style/palette'

const handleStyle = {
  borderColor: palette.blackberry,
  width: '1.5rem',
  borderRadius: '0.5rem',
  ':hover': {
    backgroundColor: palette.redrose,
  },
}

interface IProps {
  range: number[]
  max: number
  onChange: (range: number[]) => void
  renderCustomHandle: (props: HandleProps & { index: number }) => React.ReactElement
}

function RangeView({ range, max, onChange, renderCustomHandle }: IProps) {
  return (
    <Range
      value={range}
      max={max}
      handle={renderCustomHandle}
      onChange={onChange}
      handleStyle={[handleStyle, handleStyle]}
      trackStyle={[{ backgroundColor: palette.redrose }]}
      railStyle={{ backgroundColor: palette['blackberry-lightest'] }}
    />
  )
}

export default RangeView
