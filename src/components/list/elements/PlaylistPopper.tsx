import React, { useCallback, useState } from 'react'

import * as Strings from '../../../lib/strings'
import { CustomButton } from '../../elements/CustomButton'
import CustomModalWrapper from '../../elements/CustomModalWrapper'
import SimpleTextInput from '../../elements/SimpleTextInput'

interface IProps {
  showModal: boolean
  onToggleShowPopper: () => void
  onClickTitleEdit: (title: string) => string
  onClickDelete: () => void
}

const PlaylistModal = ({ showModal, onToggleShowPopper, onClickTitleEdit, onClickDelete }: IProps) => {
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

  const onRequestClose = useCallback(() => {
    setOnDeleteMode(false)
    setOnEditMode(false)
    onToggleShowPopper()
  }, [onToggleShowPopper])

  const onClickTitleEditCallback = useCallback(
    (title: string) => {
      onClickTitleEdit(title)
      onRequestClose()
    },
    [onClickTitleEdit, onRequestClose],
  )

  const onClickDeleteCallback = useCallback(() => {
    onClickDelete()
    onRequestClose()
  }, [onClickDelete, onRequestClose])

  return (
    <CustomModalWrapper isOpen={showModal} onRequestClose={onRequestClose}>
      <div className={'border-2 relative rounded-2xl bg-white'}>
        {!onEditMode ? (
          !onDeleteMode ? (
            <div className="p-2 w-32 text-center divide-y-2 leading-10">
              <div className="cursor-pointer" onClick={onClickEditButton}>
                {Strings.ButtonStrings.EDIT_TITLE}
              </div>
              <div className="cursor-pointer text-error" onClick={onClickDeleteButton}>
                {Strings.ButtonStrings.DELETE}
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              <div className="text-blackberry text-center">{Strings.CheckVideoDelete}</div>
              <div className="flex gap-x-4 justify-center">
                <CustomButton text={Strings.ButtonStrings.NO} size="small" type="secondary" onClick={onRequestClose} />
                <CustomButton text={Strings.ButtonStrings.YES} size="small" onClick={onClickDeleteCallback} />
              </div>
            </div>
          )
        ) : (
          <div className="p-4">
            <SimpleTextInput
              title={Strings.TypeNewPlaylistName}
              onClickCancle={onRequestClose}
              onClickComplete={onClickTitleEditCallback}
            />
          </div>
        )}
      </div>
    </CustomModalWrapper>
  )
}

export default React.memo(PlaylistModal)
