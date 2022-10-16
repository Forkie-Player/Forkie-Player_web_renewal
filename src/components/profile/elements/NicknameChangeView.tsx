import React from 'react'
import SimpleTextInput from '../../elements/SimpleTextInput'

interface Props {
  onClickComplete: (newNickname: string) => Promise<void>
}

function NicknameChangeView({ onClickComplete }: Props) {
  return (
    <div className="h-40 w-80 rounded-xl border-2 bg-white p-4">
      <SimpleTextInput id="newNickname" title="닉네임 변경" type="text" onClickComplete={onClickComplete} />
    </div>
  )
}

export default NicknameChangeView
