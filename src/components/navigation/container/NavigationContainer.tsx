import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootModuleType } from '../../../modules/moduleTypes'
import { setNavClose, setNavOpen } from '../../../modules/navExpansion'
import NavigationView from '../view/NavigationView'

function NavigationConatainer() {
  const navExpanded = useSelector(({ navExpansion }: RootModuleType) => navExpansion)
  const dispatch = useDispatch()

  const onToggleNav = () => {
    if (navExpanded) {
      dispatch(setNavClose())
    } else {
      dispatch(setNavOpen())
    }
  }

  return <NavigationView navExpanded={navExpanded} onToggleNav={onToggleNav} />
}

export default NavigationConatainer
