import React, { useState } from 'react'
import { CustomButton } from './CustomButton'
import CustomInput from './CustomInput'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
  initialText?: string
  error?: string
  onClickCancle?: () => void | Promise<void>
  onClickComplete: (text: string) => void | Promise<void> | string
}

const SimpleTextInput = ({
  title,
  error = '',
  initialText = '',
  onClickCancle: onClickCancleCallback,
  onClickComplete: onClickCompleteCallback,
  ...inputProps
}: IProps) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [text, setText] = useState(initialText)

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('')
    setText(e.target.value)
  }

  const onClickCancle = () => {
    if (onClickCancleCallback !== undefined) {
      onClickCancleCallback()
    }
    setErrorMsg('')
    setText('')
  }

  const onClickComplete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const textInput = text.trim()
    if (textInput.length === 0) {
      setErrorMsg('내용을 입력해주세요')
      return
    }
    const res = onClickCompleteCallback(textInput)
    setText(textInput)
    if (typeof res === 'string') {
      setErrorMsg(res)
    }
  }

  return (
    <form className="space-y-4" onSubmit={onClickComplete}>
      <div className="text-blackberry text-center">{title}</div>
      <CustomInput value={text} error={error || errorMsg} onChange={onChangeText} {...inputProps} />
      <div className="flex gap-x-4 justify-center">
        {onClickCancleCallback !== undefined && (
          <CustomButton text="취소" size="small" type="secondary" onClick={onClickCancle} />
        )}
        <button type="submit">
          <CustomButton text="완료" size="small" type="primary" />
        </button>
      </div>
    </form>
  )
}

export default React.memo(SimpleTextInput)
