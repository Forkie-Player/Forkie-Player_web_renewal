import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import { INavItem } from '../types'

interface IProps {
  navExpanded: boolean
  navItem: INavItem
  isActive: boolean
}
const NavLinkItem = ({ navExpanded, navItem, isActive }: IProps) => {
  return (
    <Link
      to={navItem.to}
      className={clsx(
        'block h-10 text-white transition-all',
        isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80',
        navExpanded ? 'flex gap-x-4 py-2 leading-6 pl-6' : 'my-3 px-3 text-center',
      )}
    >
      <div className={clsx(navExpanded ? 'text-2xl' : 'text-4xl')}>{navItem.icon}</div>
      {navExpanded && <div>{navItem.label}</div>}
    </Link>
  )
}

export default React.memo(NavLinkItem)
