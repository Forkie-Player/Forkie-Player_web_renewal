import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import { useDispatch, useSelector } from 'react-redux'
import palette from '../../lib/style/palette'
import { RootModuleType } from '../../modules/moduleTypes'
import { createPlaylistAsync } from '../../modules/playlist/actions'
import { CustomClearButton } from './CustomButton'
import LoadingElement from './loading'
import * as Strings from '../../lib/strings'
import toast from 'react-hot-toast'
import SimpleTextInput from './SimpleTextInput'

interface IProps {
  text?: string
  place?: 'top' | 'bottom'
}

export default function AddPlaylistButton({ text = '추가', place = 'bottom' }: IProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [showPopper, setShowPopper] = useState(false)

  const dispatch = useDispatch()
  const { playlist, userInfo } = useSelector(({ playlist, userInfo }: RootModuleType) => ({ playlist, userInfo }))

  const { styles, attributes } = usePopper(referenceElement, popperElement)

  useEffect(() => {
    if (playlist.pending === true) {
      setTimeout(() => {
        setShowPopper(prev => !prev)
        setShowPopper(prev => !prev)
      }, 0)
    } else {
      setShowPopper(false)
    }
  }, [playlist.pending])

  const onClickToggleShowPopper = useCallback(() => {
    if (playlist.items.length < 5 || userInfo.userInfo.member === true) {
      setShowPopper(prev => !prev)
    } else {
      toast.error(Strings.ErrorMessageToUser.EXCEED_NONMEMBER_MAX_PLAYLIST)
    }
  }, [playlist.items, userInfo.userInfo])

  const onClickApplyButton = useCallback(
    (title: string) => {
      const checkSameTitle = playlist.items.some(item => item.title === title)
      if (checkSameTitle) {
        return Strings.SameTitleInPlaylist
      }
      dispatch(createPlaylistAsync.request({ title, isPublic: false, category: 'GAME' }))
    },
    [playlist, dispatch],
  )

  return (
    <>
      <CustomClearButton
        ref={setReferenceElement}
        text={text}
        textColor={palette.redrose}
        onClick={onClickToggleShowPopper}
      />
      {showPopper && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="z-50">
          <div className={clsx('border-2 relative p-4 bg-white rounded-2xl shadow-outer')}>
            {playlist.pending ? (
              <LoadingElement />
            ) : (
              <SimpleTextInput
                title={Strings.TypeNewPlaylistName}
                onClickCancle={onClickToggleShowPopper}
                onClickComplete={onClickApplyButton}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
