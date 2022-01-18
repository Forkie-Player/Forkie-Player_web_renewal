import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootModuleType } from '../../modules/moduleTypes'
import { setNavClose, setNavOpen } from '../../modules/navExpansion/actions'
import NavigationConatainer from './container/NavigationContainer'

import './index.css'

function Navigation() {
  const navExpanded = useSelector(({ navExpansion }: RootModuleType) => navExpansion)
  const dispatch = useDispatch()
  const location = useLocation()

  const onToggleNav = useCallback(() => {
    if (navExpanded) {
      dispatch(setNavClose())
    } else {
      dispatch(setNavOpen())
    }
  }, [navExpanded, dispatch])

  return <NavigationConatainer curPath={location.pathname} navExpanded={navExpanded} onToggleNav={onToggleNav} />
}

export default Navigation
