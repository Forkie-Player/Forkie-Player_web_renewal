import React from 'react'
import { MdLogout } from 'react-icons/md'

function ProfileView() {
  return (
    <div className="flex gap-x-5 w-4/12 h-full justify-end">
      <img
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        className="h-full w-auto object-cover rounded-full aspect-square outline outline-2 outline-redrose"
        alt="profile"
      />
      <div className="text-sm">
        <p>User1</p>
        <p className="text-blackberry-lightest">has 3 lists</p>
      </div>
      <button className="text-2xl h-full align-bottom py-2">
        <MdLogout />
      </button>
    </div>
  )
}

export default ProfileView
