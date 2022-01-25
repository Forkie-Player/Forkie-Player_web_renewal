import React, { useCallback, useState } from 'react'

import * as Strings from '../../../lib/strings'
import { CustomClearButton } from '../../elements/CustomButton'
import PopperWrapper from '../../elements/PopperWrapper'
import SimpleTextInput from '../../elements/SimpleTextInput'

interface IProps {
  referenceElement: HTMLDivElement | null
  onToggleShowPopper: () => void
  onClickTitleEdit: (title: string) => string
  onClickDelete: () => void
}

const PlaylistPopper = ({
  referenceElement,
  onToggleShowPopper,
  onClickTitleEdit: onClickTitleEditCallback,
  onClickDelete: onClickDeleteCallback,
}: IProps) => {
  const [onDeleteMode, setOnDeleteMode] = useState(false)
  const [onEditMode, setOnEditMode] = useState(false)

  const onClickDeleteButton = useCallback(() => {
    setOnDeleteMode(true)
    setOnEditMode(false)
  }, [])

  const onClickEditButton = useCallback(() => {
    setOnEditMode(true)
    setOnDeleteMode(false)
  }, [])

  return (
    <PopperWrapper referenceElement={referenceElement} onToggleShowPopper={onToggleShowPopper}>
      <div className={'border-2 relative rounded-2xl bg-white'}>
        {!onEditMode ? (
          !onDeleteMode ? (
            <div className="p-2 w-32 text-center divide-y-2 leading-10">
              <div className="cursor-pointer" onClick={onClickEditButton}>
                타이틀 수정
              </div>
              <div className="cursor-pointer text-redrose" onClick={onClickDeleteButton}>
                삭제
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              <div className="text-blackberry">{Strings.CheckVideoDelete}</div>
              <div className="flex gap-x-4 justify-center">
                <CustomClearButton text="아니요" type="secondary" onClick={onToggleShowPopper} />
                <CustomClearButton text="네" onClick={onClickDeleteCallback} />
              </div>
            </div>
          )
        ) : (
          <div className="p-4">
            <SimpleTextInput
              title={Strings.TypeNewPlaylistName}
              onClickCancle={onToggleShowPopper}
              onClickComplete={onClickTitleEditCallback}
            />
          </div>
        )}
      </div>
    </PopperWrapper>
  )
}

export default React.memo(PlaylistPopper)
