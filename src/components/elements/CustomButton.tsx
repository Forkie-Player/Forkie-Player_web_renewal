import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

interface IProps {
  text: string
  textColor?: string
  size?: 'small' | 'medium' | 'large' | 'fit'
  onClick: () => void
}

function CustomButton({ text, textColor, size = 'fit', onClick }: IProps) {
  const [elementsSize, setElementsSize] = useState({
    wrapper: '',
    inner: '',
  })

  useEffect(() => {
    if (size === 'small') {
      setElementsSize({
        wrapper: 'w-20 h-10 rounded-xl',
        inner: 'w-30 h-8 rounded-xl leading-8 text-base',
      })
    } else if (size === 'medium') {
      setElementsSize({
        wrapper: 'w-24 h-12 rounded-xl',
        inner: 'w-30 h-10 rounded-xl leading-[2.5rem] text-lg',
      })
    } else if (size === 'large') {
      setElementsSize({
        wrapper: 'w-28 h-14 rounded-2xl',
        inner: 'w-[6.5rem] h-12 rounded-2xl leading-[3rem] text-xl',
      })
    } else {
      setElementsSize({
        wrapper: 'h-fit rounded-xl',
        inner: 'p-2 rounded-xl text-base',
      })
    }
  }, [size])

  return (
    <div
      className={clsx(
        elementsSize.wrapper,
        'p-1 bg-white shadow-outer text-center hover:drop-shadow-md active:shadow-inner cursor-pointer',
      )}
      onClick={onClick}
    >
      <div className={clsx(elementsSize.inner, `unselectable bg-white shadow-inner`)} style={{ color: textColor }}>
        {text}
      </div>
    </div>
  )
}

export default React.memo(CustomButton)
