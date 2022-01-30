import { Handle, HandleProps } from 'rc-slider'
import React from 'react'

interface IProps {
  props: HandleProps
}

const CustomRangeHandle = React.forwardRef<HTMLDivElement, IProps>(({ props }: IProps, ref) => {
  const { value, ...restProps } = props
  return (
    <Handle value={value} {...restProps}>
      <div ref={ref} />
    </Handle>
  )
})

export default React.memo(CustomRangeHandle)
