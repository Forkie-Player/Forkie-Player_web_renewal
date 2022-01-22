import React, { useEffect, useState } from 'react'
import { usePopper } from 'react-popper'

interface IProps {
  referenceElement: HTMLElement | null
  children: React.ReactNode
}

const showEvents = ['mouseenter', 'focus']
const hideEvents = ['mouseleave', 'blur']

const PopperWrapper = ({ referenceElement, children }: IProps) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [showPopper, setShowPopper] = useState(false)
  const { styles, attributes, update } = usePopper(referenceElement, popperElement)

  useEffect(() => {
    function show() {
      setShowPopper(true)
      if (update !== null) {
        update()
      }
    }
    function hide() {
      setShowPopper(false)
    }
    showEvents.forEach(event => {
      referenceElement?.addEventListener(event, show)
    })
    hideEvents.forEach(event => {
      referenceElement?.addEventListener(event, hide)
    })

    return () => {
      showEvents.forEach(event => {
        referenceElement?.removeEventListener(event, show)
      })
      hideEvents.forEach(event => {
        referenceElement?.removeEventListener(event, hide)
      })
    }
  }, [popperElement, referenceElement, update])

  return (
    <>
      {showPopper && (
        <div
          id="popper_hover"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="unselectable z-50 text-blackberry bg-white"
        >
          {children}
        </div>
      )}
    </>
  )
}

export default React.memo(PopperWrapper)
