import { HandleProps } from 'rc-slider'
import CustomRangeHandle from '../elements/CustomRangeHandle'
import RangeView from '../view/RangeView'

interface IProps {
  range: number[]
  max: number
  selectedLapse: number[]
  onChange: (range: number[]) => void
}

function RangeContainer({ range, max, selectedLapse, onChange }: IProps) {
  const renderCustomHandle = (props: HandleProps & { index: number }) => {
    return <CustomRangeHandle key={props.index} props={props} />
  }

  return (
    <RangeView
      range={range}
      max={max}
      selectedLapse={selectedLapse}
      onChange={onChange}
      renderCustomHandle={renderCustomHandle}
    />
  )
}

export default RangeContainer
