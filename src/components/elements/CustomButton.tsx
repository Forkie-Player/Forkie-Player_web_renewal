import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { MdEdit } from 'react-icons/md'

interface IProps {
  type?: 'primary' | 'secondary' | 'none'
  size?: 'small' | 'medium' | 'large' | 'fit'
}

export interface ITextButtonProps extends IProps, React.HTMLAttributes<HTMLDivElement> {
  text?: string | JSX.Element
}

export interface IIconButtonProps extends IProps, React.HTMLAttributes<HTMLDivElement> {
  icon?: JSX.Element
}

const getElementSizeWrapper = (size: string) => {
  if (size === 'small') {
    return 'w-20 h-10 rounded-xl leading-8 text-base'
  } else if (size === 'medium') {
    return 'w-24 h-12 rounded-xl leading-[2.5rem] text-lg'
  } else if (size === 'large') {
    return 'w-28 h-14 rounded-2xl leading-[3rem] text-xl'
  } else {
    return 'h-fit rounded-xl text-base'
  }
}

const CustomButton = forwardRef<HTMLDivElement, ITextButtonProps>(
  ({ text = '버튼', type = 'primary', size = 'fit', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          getElementSizeWrapper(size),
          'p-1 bg-white shadow-outer text-center hover:drop-shadow-md active:shadow-inner cursor-pointer',
          type === 'primary' && 'bg-redrose-light text-white',
          type === 'secondary' && 'bg-white text-redrose-light',
        )}
        {...props}
      >
        {text}
      </div>
    )
  },
)

const CustomClearButton = forwardRef<HTMLDivElement, ITextButtonProps>(
  ({ text = '버튼', type = 'primary', ...props }: ITextButtonProps, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'max-w-fit min-h-fit max-h-fit px-2 py-1 unselectable text-base cursor-pointer rounded-xl hover:shadow-outer active:shadow-inner active:bg-inherit',
          type === 'primary' && 'text-redrose',
          type === 'secondary' && 'text-blackberry',
        )}
        {...props}
      >
        {text}
      </div>
    )
  },
)

const CustomIconButton = forwardRef<HTMLDivElement, IIconButtonProps>(
  ({ icon = <MdEdit />, type = 'primary', ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx(
          'max-w-fit max-h-8 p-1 unselectable text-base cursor-pointer rounded-xl hover:shadow-outer active:shadow-inner active:bg-inherit',
          type === 'primary' && 'text-redrose',
          type === 'secondary' && 'text-blackberry',
          props.className,
        )}
      >
        {icon}
      </div>
    )
  },
)

const CustomButtonWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={clsx(
        'unselectable p-1 cursor-pointer rounded-xl hover:shadow-outer active:shadow-inner active:bg-inherit',
      )}
    >
      {children}
    </div>
  )
}

export { CustomButton, CustomClearButton, CustomIconButton, CustomButtonWrapper }
