import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import palette from '../../lib/style/palette'

interface IProps {
  error?: string
}

const CustomInput = ({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & IProps) => {
  return (
    <div className="relative transition-all">
      <input
        {...props}
        className={twMerge(
          clsx(
            'form_field placeholder:text-transparent',
            'w-full py-1 duration-300 focus:border-primary-yellow bg-inherit border-b-[1px]',
            props.className,
          ),
        )}
        style={{ borderColor: error ? palette.error : palette['blackberry-lightest'] }}
      />
      <label
        htmlFor={props.id}
        className={clsx(error && 'text-error font-semibold', 'transition-all unselectable form__label block absolute')}
      >
        {props.placeholder}
      </label>
      <div className="text-left text-xs text-error">{error}</div>
    </div>
  )
}

export default React.memo(CustomInput)
