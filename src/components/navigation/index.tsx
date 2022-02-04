import React, { useCallback } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootModuleType } from '../../modules/moduleTypes'
import { setNavClose, setNavOpen } from '../../modules/navExpansion/actions'
import NavigationConatainer from './container/NavigationContainer'

import './index.css'

function Navigation() {
  const { navExpansion, isSmScreen } = useSelector(({ navExpansion, isSmScreen }: RootModuleType) => ({
    navExpansion,
    isSmScreen,
  }))
  const dispatch = useDispatch()
  const location = useLocation()

  const onToggleNav = useCallback(() => {
    if (navExpansion) {
      dispatch(setNavClose())
    } else {
      dispatch(setNavOpen())
    }
  }, [navExpansion, dispatch])

  const onRequestClose = useCallback(() => {
    dispatch(setNavClose())
  }, [dispatch])

  return (
    <>
      <NavigationConatainer curPath={location.pathname} navExpanded={navExpansion} onToggleNav={onToggleNav} />
      {isSmScreen && navExpansion && (
        <ReactModal
          isOpen={true}
          onRequestClose={onRequestClose}
          style={{
            overlay: { left: '12rem', height: '100vh', maxHeight: '100vh', overflow: 'hidden' },
            content: { visibility: 'hidden', height: '100vh' },
          }}
        />
      )}
    </>
  )
}

export default Navigation
