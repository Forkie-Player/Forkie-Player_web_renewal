import React from 'react'

interface IProps {
  text: string
  textColor?: string
  onClick: () => void
}

function CustomButton({ text, textColor, onClick }: IProps) {
  return (
    <div
      className="w-32 h-14 p-1 rounded-2xl bg-white shadow-outer text-center
      hover:drop-shadow-md active:shadow-inner cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`unselectable w-30 h-12 rounded-2xl bg-white shadow-inner leading-[3rem] 
      text-xl`}
        style={{ color: textColor }}
      >
        {text}
      </div>
    </div>
  )
}

export default React.memo(CustomButton)
