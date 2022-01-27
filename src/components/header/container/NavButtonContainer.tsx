import React from 'react'
import NavButtonView from '../view/NavButtonView'

interface IProps {
  isSmScreen: boolean
  onClickNavOpen: () => void
}

function NavButtonContainer({ isSmScreen, onClickNavOpen }: IProps) {
  return <NavButtonView isSmScreen={isSmScreen} onClickNavOpen={onClickNavOpen} />
}

export default NavButtonContainer
