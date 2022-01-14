import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import { useDispatch, useSelector } from 'react-redux'
import palette from '../../lib/style/palette'
import { RootModuleType } from '../../modules/moduleTypes'
import { addPlaylistAsync } from '../../modules/playlist/actions'
import { CustomClearButton } from './CustomButton'
import LoadingElement from './loading'
import * as Strings from '../../lib/strings'
import toast from 'react-hot-toast'

interface IProps {
  text?: string
  place?: 'top' | 'bottom'
}

export default function AddPlaylistButton({ text = '추가', place = 'bottom' }: IProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const [showPopper, setShowPopper] = useState(false)
  const [title, setTitle] = useState('')

  const dispatch = useDispatch()
  const { playlist, userInfo } = useSelector(({ playlist, userInfo }: RootModuleType) => ({ playlist, userInfo }))

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  })

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
      toast.error(Strings.NonMemberCouldMakeOnlyFive)
    }
  }, [playlist.items, userInfo.userInfo])

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }, [])

  const onClickApplyButton = useCallback(() => {
    dispatch(addPlaylistAsync.request({ title, isPublic: false, category: 'GAME' }))
  }, [title, dispatch])

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
          {place === 'bottom' && (
            <div
              ref={setArrowElement}
              style={styles.arrow}
              className={'min-h-fit min-w-fit border-[0.25rem] border-transparent border-b-gray-300'}
            />
          )}
          <div
            className={clsx(
              place === 'bottom' && 'top-2',
              'border-2 relative p-4 bg-background-light rounded-2xl space-y-4 shadow-outer',
            )}
          >
            {playlist.pending ? (
              <LoadingElement />
            ) : (
              <>
                <div className="text-blackberry">{Strings.TypeNewPlaylistName}</div>
                <input
                  className="w-full bg-background-light border-b-[1px] border-blackberry focus:none"
                  onChange={onChangeTitle}
                ></input>
                <div className="flex gap-x-4 justify-center">
                  <CustomClearButton text="취소" textColor={palette.blackberry} onClick={onClickToggleShowPopper} />
                  <CustomClearButton text="완료" textColor={palette.redrose} onClick={onClickApplyButton} />
                </div>
              </>
            )}
          </div>

          {place === 'top' && (
            <div
              ref={setArrowElement}
              style={styles.arrow}
              className={'min-h-fit min-w-fit border-[0.25rem] border-transparent border-t-gray-300'}
            />
          )}
        </div>
      )}
    </>
  )
}
