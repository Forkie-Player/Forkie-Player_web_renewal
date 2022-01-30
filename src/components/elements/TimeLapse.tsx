import secondsToHHMMSS from '../../lib/utils/secondsToHHMMSS'

export function TimeLapse({ range, gap = 4 }: { range: number[]; gap?: number }) {
  return (
    <div className={`unselectable flex ${'gap-x-' + gap}`}>
      <div>{secondsToHHMMSS(range[0])}</div>~<div>{secondsToHHMMSS(range[1])}</div>
    </div>
  )
}
