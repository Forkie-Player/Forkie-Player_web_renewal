import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { MdEdit } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

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
    return 'w-20 h-10 rounded-xl text-base leading-10'
  } else if (size === 'medium') {
    return 'w-24 h-12 rounded-xl text-lg leading-[3rem]'
  } else if (size === 'large') {
    return 'w-28 h-14 rounded-2xl text-xl leading-[3.5rem]'
  } else {
    return 'h-fit rounded-xl text-base'
  }
}

const CustomButton = forwardRef<HTMLDivElement, ITextButtonProps>(
  ({ text = '버튼', type = 'primary', size = 'fit', ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={twMerge(
          clsx([
            getElementSizeWrapper(size),
            'select-none shadow-outer text-center hover:drop-shadow-md active:shadow-inner cursor-pointer',
            type === 'primary' && 'bg-redrose-light text-white',
            type === 'secondary' && 'bg-white text-redrose-light',
            props.className,
          ]),
        )}
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
        {...props}
        className={twMerge(
          clsx(
            'max-w-fit min-h-fit max-h-fit px-2 py-1 select-none text-base cursor-pointer rounded-xl hover:shadow-outer active:shadow-inner active:bg-inherit',
            type === 'primary' && 'text-redrose',
            type === 'secondary' && 'text-blackberry',
            props.className,
          ),
        )}
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
        className={twMerge(
          clsx(
            'max-w-fit max-h-8 p-1 select-none text-base cursor-pointer rounded-xl hover:shadow-outer active:shadow-inner active:bg-inherit',
            type === 'primary' && 'text-redrose',
            type === 'secondary' && 'text-blackberry',
            props.className,
          ),
        )}
      >
        {icon}
      </div>
    )
  },
)
const CustomButtonWrapper = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={twMerge(
          'select-none p-1 cursor-pointer rounded-xl hover:shadow-outer active:shadow-inner active:bg-inherit',
          props.className,
        )}
      >
        {children}
      </div>
    )
  },
)
export { CustomButton, CustomClearButton, CustomIconButton, CustomButtonWrapper }
