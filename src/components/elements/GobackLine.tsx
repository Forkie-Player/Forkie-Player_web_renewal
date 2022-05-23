import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Strings from '../../lib/strings'
import { CustomClearButton } from './CustomButton'

export default function GobackLine({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate()

  const goback = () => {
    navigate(-1)
  }
  return (
    <div {...props}>
      <CustomClearButton text={Strings.GoBack} type="secondary" onClick={goback} />
    </div>
  )
}
