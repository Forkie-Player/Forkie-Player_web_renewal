import React, { useCallback } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import useIsSmScreen from '../../lib/hooks/useIsSmScreen'
import { RootModuleType } from '../../modules/moduleTypes'
import { setNavClose, setNavOpen } from '../../modules/navExpansion/actions'
import NavigationConatainer from './container/NavigationContainer'

import './index.css'

function Navigation() {
  const navExpanded = useSelector(({ navExpansion }: RootModuleType) => navExpansion)
  const dispatch = useDispatch()
  const location = useLocation()
  const isSmScreen = useIsSmScreen()

  const onToggleNav = useCallback(() => {
    if (navExpanded) {
      dispatch(setNavClose())
    } else {
      dispatch(setNavOpen())
    }
  }, [navExpanded, dispatch])

  const onRequestClose = useCallback(() => {
    dispatch(setNavClose())
  }, [dispatch])

  return (
    <>
      <NavigationConatainer curPath={location.pathname} navExpanded={navExpanded} onToggleNav={onToggleNav} />
      <ReactModal
        isOpen={isSmScreen && navExpanded}
        onRequestClose={onRequestClose}
        style={{
          overlay: { left: '12rem', height: '100vh', maxHeight: '100vh', overflow: 'hidden' },
          content: { visibility: 'hidden', height: '100vh' },
        }}
      />
    </>
  )
}

export default Navigation
