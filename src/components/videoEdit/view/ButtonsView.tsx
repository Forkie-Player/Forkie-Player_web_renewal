import { ButtonStrings } from '../../../lib/strings'
import { CustomButton, ITextButtonProps } from '../../elements/CustomButton'

interface IProps {
  applyButtonProps?: ITextButtonProps
  completeButtonProps?: ITextButtonProps
  buttonSize?: 'small' | 'medium' | 'large'
}

function ButtonsView({ applyButtonProps, completeButtonProps, buttonSize }: IProps) {
  return (
    <div className="pt-2 2xl:pt-4 flex justify-center gap-x-8">
      <CustomButton text={ButtonStrings.APPLY} size={buttonSize} type="secondary" {...applyButtonProps} />
      <CustomButton text={ButtonStrings.ADD} size={buttonSize} {...completeButtonProps} />
    </div>
  )
}

export default ButtonsView
