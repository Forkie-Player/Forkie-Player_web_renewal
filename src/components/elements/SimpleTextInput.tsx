import React, { useState } from 'react'
import palette from '../../lib/style/palette'
import { CustomClearButton } from './CustomButton'

import * as Strings from '../../lib/strings'

interface IProps {
  title: string
  initialText?: string
  onClickCancle?: () => void | Promise<void>
  onClickComplete: (text: string) => void | Promise<void> | string
}

const SimpleTextInput = ({
  title,
  initialText = '',
  onClickCancle: onClickCancleCallback,
  onClickComplete: onClickCompleteCallback,
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

  const onClickComplete = () => {
    if (title.length === 0) {
      setErrorMsg(Strings.EnterName)
      return
    }
    const res = onClickCompleteCallback(text)
    if (typeof res === 'string') {
      setErrorMsg(res)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-blackberry">{title}</div>
      <input className="w-full bg-inherit border-b-[1px] border-blackberry focus:none" onChange={onChangeText}></input>
      <div className="text-redrose text-sm">{errorMsg}</div>
      <div className="flex gap-x-4 justify-center">
        {onClickCancleCallback !== undefined && (
          <CustomClearButton text="취소" textColor={palette.blackberry} onClick={onClickCancle} />
        )}
        <CustomClearButton text="완료" textColor={palette.redrose} onClick={onClickComplete} />
      </div>
    </div>
  )
}

export default React.memo(SimpleTextInput)
