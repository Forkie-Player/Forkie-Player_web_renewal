import React, { useEffect, useState } from 'react'
import NavigationView from '../view/NavigationView'
import * as Strings from '../../../lib/strings'
import * as Constants from '../../../lib/constants'
import { MdHome, MdList, MdSearch } from 'react-icons/md'
import { INavItem } from '../types'

interface IProps {
  curPath: string
  navExpanded: boolean
  isSmScreen: boolean
  onToggleNav: () => void
}

const navLists: INavItem[] = [
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

function NavigationConatainer({ isSmScreen, curPath, navExpanded, onToggleNav }: IProps) {
  const [curActiveIndex, setCurActiveIndex] = useState(0)
  const [navIndicatorBoxTrnasform, setNavIndicatorBoxTrnasform] = useState(`-${-0.5 + navLists.length * 2.5}rem`)

  useEffect(() => {
    navLists.forEach(({ to }, index) => {
      if (index === 0 ? curPath === to : curPath.startsWith(to)) {
        setCurActiveIndex(index)
        setNavIndicatorBoxTrnasform(`-${-0.5 + (navLists.length - index) * 2.5}rem`)
      }
    })
  }, [curPath])

  return (
    <NavigationView
      isSmScreen={isSmScreen}
      curActiveIndex={curActiveIndex}
      navExpanded={navExpanded}
      navIndicatorBoxTrnasform={navIndicatorBoxTrnasform}
      navLists={navLists}
      onToggleNav={onToggleNav}
    />
  )
}

export default React.memo(NavigationConatainer)
