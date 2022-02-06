import React from 'react'
import PopperWrapper from '../../elements/PopperWrapper'

import * as Strings from '../../../lib/strings'
import { CustomButton } from '../../elements/CustomButton'

interface IProps {
  referenceElement: HTMLDivElement | null
  popperMode: 'edit' | 'delete'
  onToggleShowPopper: () => void
  onClickEditComplete: () => void
  onClickDeleteComplete: () => void
}

function VideoListPopper({
  referenceElement,
  popperMode,
  onToggleShowPopper,
  onClickEditComplete,
  onClickDeleteComplete,
}: IProps) {
  return (
    <PopperWrapper referenceElement={referenceElement} onToggleShowPopper={onToggleShowPopper}>
      <div className="border-2 relative p-4 bg-white rounded-2xl space-y-4 shadow-outer">
        <div className="text-blackberry text-center">
          {popperMode === 'edit' ? Strings.CheckVideoEdit : Strings.CheckVideoDelete}
        </div>
        <div className="flex gap-x-4 justify-center">
          <CustomButton text={Strings.ButtonStrings.NO} size="small" type="secondary" onClick={onToggleShowPopper} />
          <CustomButton
            text={Strings.ButtonStrings.YES}
            size="small"
            onClick={popperMode === 'edit' ? onClickEditComplete : onClickDeleteComplete}
          />
        </div>
      </div>
    </PopperWrapper>
  )
}

export default React.memo(VideoListPopper)
