import React, { useEffect, useState } from 'react'
import { usePopper } from 'react-popper'

interface IProps {
  referenceElement: HTMLElement | null
  onToggleShowPopper: () => void
  children: React.ReactNode
}

const PopperWrapper = ({ referenceElement, onToggleShowPopper, children }: IProps) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
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

  return (
    <div
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
      className="unselectable z-50 text-blackberry bg-white"
    >
      {children}
    </div>
  )
}

export default React.memo(PopperWrapper)
