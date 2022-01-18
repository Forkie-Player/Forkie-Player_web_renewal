import React from 'react'
import { Link } from 'react-router-dom'
import { FaLessThan } from 'react-icons/fa'
import { MdHome, MdList, MdSearch } from 'react-icons/md'
import logoImage from '../../../assets/images/logo.png'
import * as Strings from '../../../lib/strings'
import * as Constants from '../../../lib/constants'
import clsx from 'clsx'

interface IProps {
  navExpanded: boolean
  curPath: string
  onToggleNav: () => void
}

interface INavItem {
  to: string
  label: string
  icon: React.ReactElement
}

const lists: INavItem[] = [
  {
    to: Constants.NavAbsolutePathItems.HOME,
    label: Strings.NavLabelItems.HOME,
    icon: <MdHome />,
  },
  {
    to: Constants.NavAbsolutePathItems.SEARCH,
    label: Strings.NavLabelItems.SEARCH,
    icon: <MdSearch />,
  },
  {
    to: Constants.NavAbsolutePathItems.LIST,
    label: Strings.NavLabelItems.LIST,
    icon: <MdList />,
  },
]

function NavigationView({ navExpanded, curPath, onToggleNav }: IProps) {
  return (
    <div
      className={clsx(
        navExpanded ? 'w-48' : 'w-16',
        'transition-[width] duration-500 unselectable relative h-full pt-8',
      )}
    >
      <Link to={'/'} className="pl-3 flex gap-x-2 w-full text-3xl text-white">
        <img src={logoImage} alt="logo" className="w-10 h-10 rounded-full" />
        {navExpanded && Strings.AppName}
      </Link>
      <div className="h-12" />
      {navExpanded && <div className="text-white/50 pl-7">Menus</div>}
      {lists.map(({ to, label, icon }, index) => {
        const isActive = index === 0 ? curPath === to : curPath.startsWith(to)
        return (
          <Link
            to={to}
            className={clsx(
              'block h-10 text-white transition-all',
              isActive ? 'opacity-100' : 'opacity-50',
              navExpanded ? 'flex gap-x-4 py-2 leading-6' : 'my-3 px-3 text-center',
            )}
            key={`nav_${index}`}
          >
            {navExpanded && <div className={clsx(isActive ? 'bg-white' : 'bg-redrose', 'w-2 h-full')} />}
            <div className={clsx(navExpanded ? 'text-2xl' : 'text-4xl')}>{icon}</div>
            {navExpanded && <div className="">{label}</div>}
          </Link>
        )
      })}

      <div
        className={clsx(
          navExpanded ? 'navCloseButton' : 'navExpandButton',
          'absolute w-min bottom-3 right-3 text-white cursor-pointer',
        )}
        onClick={onToggleNav}
      >
        <FaLessThan />
      </div>
    </div>
  )
}

export default NavigationView
