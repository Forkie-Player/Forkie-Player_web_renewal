import { useMemo } from 'react'
import { screenSizeString } from '../../../lib/constants'
import useScreenSize from '../../../lib/hooks/useScreenSize'
import { CustomButton, ITextButtonProps } from '../../elements/CustomButton'

interface IProps {
  leftButtonProps?: ITextButtonProps
  rightButtonProps?: ITextButtonProps
}

function ButtonsView({ leftButtonProps, rightButtonProps }: IProps) {
  const screenSize = useScreenSize()
  const buttonSize = useMemo(() => {
    switch (screenSize) {
      case screenSizeString['3XL']:
      case screenSizeString['2XL']:
        return 'large'
      case screenSizeString['XL']:
      case screenSizeString['LG']:
        return 'medium'
      case screenSizeString['MD']:
      case screenSizeString['SM']:
      case screenSizeString['XSM']:
        return 'small'
    }
  }, [screenSize])

  return (
    <div className="w-full pt-2 2xl:pt-4 flex text-3xl justify-center gap-x-8">
      <CustomButton text="적용" size={buttonSize} type="secondary" {...leftButtonProps} />
      <CustomButton text="추가" size={buttonSize} {...rightButtonProps} />
    </div>
  )
}

export default ButtonsView
