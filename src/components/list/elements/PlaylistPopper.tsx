import React, { useCallback, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'

import * as Strings from '../../../lib/strings'
import palette from '../../../lib/style/palette'
import { CustomClearButton } from '../../elements/CustomButton'
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
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [onDeleteMode, setOnDeleteMode] = useState(false)
  const [onEditMode, setOnEditMode] = useState(false)
  const { styles, attributes } = usePopper(referenceElement, popperElement)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const eventTarget = event.target as HTMLElement
      if (popperElement !== null && eventTarget !== null && popperElement.contains(eventTarget) === false) {
        onToggleShowPopper()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [popperElement, onToggleShowPopper])

  const onClickDeleteButton = useCallback(() => {
    setOnDeleteMode(true)
    setOnEditMode(false)
  }, [])

  const onClickEditButton = useCallback(() => {
    setOnEditMode(true)
    setOnDeleteMode(false)
  }, [])

  return (
    <div
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
      className="unselectable z-50 text-blackberry"
    >
      <div className={'border-2 relative bg-white rounded-2xl shadow-outer'}>
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
                <CustomClearButton text="아니요" textColor={palette.blackberry} onClick={onToggleShowPopper} />
                <CustomClearButton text="네" textColor={palette.redrose} onClick={onClickDeleteCallback} />
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
    </div>
  )
}

export default React.memo(PlaylistPopper)
