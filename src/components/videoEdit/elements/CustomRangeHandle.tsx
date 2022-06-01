import { Handle, HandleProps } from 'rc-slider'
import React from 'react'

interface IProps {
  props: HandleProps
}

const CustomRangeHandle = React.forwardRef<HTMLDivElement, IProps>(({ props }: IProps, ref) => {
  return (
    <Handle {...props}>
      <div ref={ref} />
    </Handle>
  )
})

export default React.memo(CustomRangeHandle)
