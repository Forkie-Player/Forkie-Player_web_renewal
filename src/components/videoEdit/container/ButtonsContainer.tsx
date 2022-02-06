import React, { useMemo } from 'react'
import { screenSizeString } from '../../../lib/constants'
import { ITextButtonProps } from '../../elements/CustomButton'
import ButtonsView from '../view/ButtonsView'

interface IProps {
  applyButtonProps?: ITextButtonProps
  completeButtonProps?: ITextButtonProps
  screenSize: string
}

function ButtonsContainer({ applyButtonProps, completeButtonProps, screenSize }: IProps) {
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
    <ButtonsView
      applyButtonProps={applyButtonProps}
      completeButtonProps={completeButtonProps}
      buttonSize={buttonSize}
    />
  )
}

export default React.memo(ButtonsContainer)
