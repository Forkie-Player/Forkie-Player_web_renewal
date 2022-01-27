import React from 'react'
import { Link } from 'react-router-dom'
import { FaLessThan } from 'react-icons/fa'
import logoImage from '../../../assets/images/logo.png'
import * as Strings from '../../../lib/strings'
import clsx from 'clsx'
import { INavItem } from '../types'

interface IProps {
  isSmScreen: boolean
  navExpanded: boolean
  navLists: INavItem[]
  curActiveIndex: number
  navIndicatorBoxTrnasform: string
  onToggleNav: () => void
}

function NavigationView({
  isSmScreen,
  navExpanded,
  navLists,
  curActiveIndex,
  navIndicatorBoxTrnasform,
  onToggleNav,
}: IProps) {
  return (
    <div
      className={clsx(
        !isSmScreen ? (navExpanded ? 'w-48' : 'w-16') : '-translate-x-full',
        'transition-[width] unselectable relative h-full pt-8',
      )}
    >
      <Link to={'/'} className="pl-3 gap-x-2 flex w-full text-3xl text-white">
        <img src={logoImage} alt="logo" className="w-10 h-10 rounded-full" />
        {navExpanded && Strings.AppName}
      </Link>
      <div className="h-12" />
      {navExpanded && <div className="text-white/50 pl-7">Menus</div>}
      {navLists.map(({ to, label, icon }, index) => {
        return (
          <Link
            to={to}
            className={clsx(
              'block h-10 text-white transition-all',
              curActiveIndex === index ? 'opacity-100' : 'opacity-50 hover:opacity-80',
              navExpanded ? 'flex gap-x-4 py-2 leading-6 pl-6' : 'my-3 px-3 text-center',
            )}
            key={`nav_${index}`}
          >
            <div className={clsx(navExpanded ? 'text-2xl' : 'text-4xl')}>{icon}</div>
            {navExpanded && <div className="">{label}</div>}
          </Link>
        )
      })}

      {navExpanded && (
        <div
          className={clsx('bg-white', 'w-1 h-6 py-2 transition-all')}
          style={{ transform: `translateY(${navIndicatorBoxTrnasform})` }}
        />
      )}

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
