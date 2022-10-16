import React from 'react'

function HeaderBackground() {
  return (
    <div className="relative w-full rounded-xl bg-blackberry text-right text-4xl text-white">
      <div className="absolute bottom-4 right-4">Profile</div>
    </div>
  )
}

export default React.memo(HeaderBackground)
