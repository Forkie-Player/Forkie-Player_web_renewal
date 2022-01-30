import { HandleProps, Range } from 'rc-slider'
import React from 'react'
import palette from '../../../lib/style/palette'
import SingleLapseIndicator from '../elements/SingleLapseIndicator'

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
  selectedLapse: number[]
  onChange: (range: number[]) => void
  renderCustomHandle: (props: HandleProps & { index: number }) => React.ReactElement
}

function RangeView({ range, max, selectedLapse, onChange, renderCustomHandle }: IProps) {
  return (
    <Range
      value={range}
      max={max}
      marks={{
        [selectedLapse[0]]: <SingleLapseIndicator second={selectedLapse[0]} />,
        [selectedLapse[1]]: <SingleLapseIndicator second={selectedLapse[1]} />,
      }}
      handle={renderCustomHandle}
      onChange={onChange}
      handleStyle={[handleStyle, handleStyle]}
      trackStyle={[{ backgroundColor: palette.redrose }]}
      railStyle={{ backgroundColor: palette['blackberry-lightest'] }}
    />
  )
}

export default RangeView
