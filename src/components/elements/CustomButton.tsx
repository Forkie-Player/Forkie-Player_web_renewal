import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { MdEdit } from 'react-icons/md'
import palette from '../../lib/style/palette'

interface IProps {
  textColor?: string
  size?: 'small' | 'medium' | 'large' | 'fit'
  onClick?: (any: any) => void | Promise<void>
}

export interface ITextButtonProps extends IProps {
  text?: string
}

export interface IIconButtonProps extends IProps {
  icon?: JSX.Element
}

const getElementSizeWrapper = (size: string) => {
  if (size === 'small') {
    return 'w-20 h-10 rounded-xl'
  } else if (size === 'medium') {
    return 'w-24 h-12 rounded-xl'
  } else if (size === 'large') {
    return 'w-28 h-14 rounded-2xl'
  } else {
    return 'h-fit rounded-xl'
  }
}
const getElementSizeInner = (size: string) => {
  if (size === 'small') {
    return 'w-30 h-8 rounded-xl leading-8 text-base'
  } else if (size === 'medium') {
    return 'w-30 h-10 rounded-xl leading-[2.5rem] text-lg'
  } else if (size === 'large') {
    return 'w-[6.5rem] h-12 rounded-2xl leading-[3rem] text-xl'
  } else {
    return 'p-2 rounded-xl text-base'
  }
}

const CustomButton = forwardRef<HTMLDivElement, ITextButtonProps>(
  ({ text = '버튼', textColor = palette.blackberry, size = 'fit', onClick }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          getElementSizeWrapper(size),
          'p-1 bg-white shadow-outer text-center hover:drop-shadow-md active:shadow-inner cursor-pointer',
        )}
        onClick={onClick}
      >
        <div
          className={clsx(getElementSizeInner(size), `unselectable bg-white shadow-inner`)}
          style={{ color: textColor }}
        >
          {text}
        </div>
      </div>
    )
  },
)

const CustomClearButton = forwardRef<HTMLDivElement, ITextButtonProps>(
  ({ text = '버튼', textColor = palette.blackberry, onClick }: ITextButtonProps, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'max-w-fit max-h-9 px-2 py-1 unselectable text-base cursor-pointer rounded-xl hover:shadow-outer active:shadow-inner active:bg-inherit',
        )}
        onClick={onClick}
        style={{ color: textColor }}
      >
        {text}
      </div>
    )
  },
)

const CustomIconButton = forwardRef<HTMLDivElement, IIconButtonProps>(
  ({ icon = <MdEdit />, textColor = palette.blackberry, size = '', onClick }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'max-w-fit max-h-8 p-1 unselectable text-base cursor-pointer rounded-xl hover:shadow-outer active:shadow-inner active:bg-inherit',
        )}
        onClick={onClick}
        style={{ color: textColor }}
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
