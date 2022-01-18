import React from 'react'
import NavigationView from '../view/NavigationView'

interface IProps {
  curPath: string
  navExpanded: boolean
  onToggleNav: () => void
}

function NavigationConatainer({ curPath, navExpanded, onToggleNav }: IProps) {
  return <NavigationView navExpanded={navExpanded} curPath={curPath} onToggleNav={onToggleNav} />
}

export default React.memo(NavigationConatainer)
