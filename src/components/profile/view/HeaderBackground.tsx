import React from 'react'

function HeaderBackground() {
  return (
    <div className="relative w-full text-4xl text-white bg-redrose-light rounded-xl text-right">
      <div className="absolute bottom-4 right-4">Profile</div>
    </div>
  )
}

export default React.memo(HeaderBackground)
