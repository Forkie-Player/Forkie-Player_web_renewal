import { ButtonStrings } from '../../../lib/strings'
import { CustomButton, ITextButtonProps } from '../../elements/CustomButton'

interface IProps {
  completeButtonProps?: ITextButtonProps
  buttonSize?: 'small' | 'medium' | 'large'
}

function ButtonsView({ completeButtonProps, buttonSize }: IProps) {
  return (
    <div className="flex justify-center gap-x-8 pt-2 2xl:pt-4">
      <CustomButton text={ButtonStrings.ADD} size={buttonSize} {...completeButtonProps} />
    </div>
  )
}

export default ButtonsView
