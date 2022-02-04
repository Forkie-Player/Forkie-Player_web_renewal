import React from 'react'
import { Link } from 'react-router-dom'
import { FaLessThan } from 'react-icons/fa'
import logoImage from '../../../assets/images/logo.png'
import * as Strings from '../../../lib/strings'
import clsx from 'clsx'
import { INavItem } from '../types'
import * as Contants from '../../../lib/constants'
import NavLinkItem from '../elements/NavLinkItem'

interface IProps {
  navExpanded: boolean
  navLists: INavItem[]
  curActiveIndex: number
  navIndicatorTrnasformOffset: string
  onToggleNav: () => void
}

function NavigationView({ navExpanded, navLists, curActiveIndex, navIndicatorTrnasformOffset, onToggleNav }: IProps) {
  return (
    <div
      className={clsx(navExpanded ? 'w-48' : 'w-16', 'relative h-full pt-8 transition-[width] duration-75 select-none')}
    >
      <Link to={Contants.NavAbsolutePathItems.HOME} className="flex w-full pl-3 gap-x-2 text-3xl text-white">
        <img src={logoImage} alt="logo" className="w-10 rounded-full" />
        {navExpanded && Strings.AppName}
      </Link>
      <div className="h-12" />
      {navExpanded && <div className="text-white/50 pl-7">Menus</div>}
      {navLists.map((item, index) => (
        <NavLinkItem navExpanded={navExpanded} navItem={item} isActive={curActiveIndex === index} key={item.label} />
      ))}

      {navExpanded && (
        <div
          className={clsx('bg-white', 'w-1 h-6 py-2 transition-all')}
          style={{ transform: `translateY(${navIndicatorTrnasformOffset})` }}
        />
      )}

      <FaLessThan
        className={clsx(
          navExpanded ? 'navCloseButton' : 'navExpandButton',
          'absolute bottom-3 right-3 text-white cursor-pointer',
        )}
        onClick={onToggleNav}
      />
    </div>
  )
}

export default NavigationView
