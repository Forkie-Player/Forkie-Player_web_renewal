import { CustomButton, ITextButtonProps } from '../../elements/CustomButton'

interface IProps {
  leftButtonProps?: ITextButtonProps
  rightButtonProps?: ITextButtonProps
}

function ButtonsView({ leftButtonProps, rightButtonProps }: IProps) {
  return (
    <div className="w-full pt-4 flex text-3xl justify-center gap-x-8">
      <CustomButton text="적용" size="large" type="secondary" {...leftButtonProps} />
      <CustomButton text="추가" size="large" {...rightButtonProps} />
    </div>
  )
}

export default ButtonsView
