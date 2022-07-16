import { twMerge } from 'tailwind-merge'
import secondsToHHMMSS from '../../lib/utils/secondsToHHMMSS'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  range: number[]
}

function TimeLapse({ range, ...props }: IProps) {
  return (
    <div {...props} className={twMerge('flex select-none gap-x-4', props.className)}>
      <div>{secondsToHHMMSS(range[0])}</div>~<div>{secondsToHHMMSS(range[1])}</div>
    </div>
  )
}

export default TimeLapse
