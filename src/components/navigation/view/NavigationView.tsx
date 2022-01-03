import React from 'react'
import { Link } from 'react-router-dom'
import { FaGreaterThan, FaLessThan } from 'react-icons/fa'

interface IProps {
  navExpanded: boolean
  onToggleNav: () => void
}

function NavigationView({ navExpanded, onToggleNav }: IProps) {
  return (
    <div className="container relative w-full h-full">
      <div className="w-full">
        <Link to="/">Home</Link>
      </div>
      <div className="w-full">
        <Link to="/about">About</Link>
      </div>

      <div className="absolute w-min bottom-3 right-3" onClick={onToggleNav}>
        {navExpanded ? <FaLessThan /> : <FaGreaterThan />}
      </div>
    </div>
  )
}

export default NavigationView
