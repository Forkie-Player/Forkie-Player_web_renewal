import React from 'react'
import { PlatformSelectOptionLebels } from '../../../lib/strings'

interface IProps {
  label: keyof typeof PlatformSelectOptionLebels
  isChecked: boolean
}

function SelectOption({ label, isChecked }: IProps) {
  return (
    <div className="w-full h-full flex">
      <div className="w-4 h-full">
        <input id={label} type="checkbox" checked={isChecked} onChange={() => {}} className="accent-primary-yellow" />
      </div>
      <div className="w-full flex-1 pl-2">{PlatformSelectOptionLebels[label]}</div>
    </div>
  )
}

export default SelectOption
