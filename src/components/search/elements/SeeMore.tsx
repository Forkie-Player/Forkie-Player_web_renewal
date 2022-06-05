import React from 'react'

interface IProps {
  isSeeMore: boolean
  onClick: () => void
}

function SeeMore({ isSeeMore, onClick }: IProps) {
  return (
    <div className="relative w-full h-6 cursor-pointer" onClick={onClick}>
      <div className="absolute w-full h-3 border-b-[1px] border-blackberry-lightest z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 px-2 h-full bg-background-light z-50">
        {isSeeMore ? '더보기' : '닫기'}
      </div>
    </div>
  )
}

export default SeeMore
