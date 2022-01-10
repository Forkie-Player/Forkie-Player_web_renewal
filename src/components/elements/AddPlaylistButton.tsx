import { useCallback, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import { useDispatch, useSelector } from 'react-redux'
import palette from '../../lib/style/palette'
import { RootModuleType } from '../../modules/moduleTypes'
import { addPlaylistAsync } from '../../modules/playlist/actions'
import { CustomClearButton } from './CustomButton'
import LoadingElement from './loading'

export default function AddPlaylistButton() {
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
    setTimeout(() => {
      setShowPopper(prev => !prev)
      setShowPopper(prev => !prev)
    }, 0)
  }, [playlist.pending])

  const onClickToggleShowPopper = useCallback(() => {
    if (playlist.items.length < 5 || userInfo.userInfo.member === true) {
      setShowPopper(prev => !prev)
    } else {
      console.log('비회원은 최대 5개')
    }
  }, [playlist.items, userInfo.userInfo])

  const getCustomButtonRef = useCallback((instance: HTMLDivElement | null) => {
    if (instance !== null) {
      setReferenceElement(instance)
    }
  }, [])

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }, [])

  const onClickApplyButton = useCallback(() => {
    dispatch(addPlaylistAsync.request({ title, isPublic: false, category: 'GAME' }))
  }, [title, dispatch])

  return (
    <>
      <CustomClearButton
        buttonRef={getCustomButtonRef}
        text="추가"
        textColor={palette.redrose}
        onClick={onClickToggleShowPopper}
      />
      {showPopper && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="z-50">
          <div
            ref={setArrowElement}
            style={styles.arrow}
            className={'min-h-fit min-w-fit border-[0.25rem] border-transparent border-b-gray-300'}
          />
          <div className="border-2 relative top-2 p-4 bg-background-light rounded-2xl space-y-4 shadow-outer">
            {playlist.pending ? (
              <LoadingElement />
            ) : (
              <>
                <div className="text-blackberry">추가하실 재생목록의 이름을 입력해주세요</div>
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
        </div>
      )}
    </>
  )
}
