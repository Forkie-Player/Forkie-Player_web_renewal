import React from 'react'
import { MdMenuOpen } from 'react-icons/md'
import { CustomButtonWrapper } from '../../elements/CustomButton'

interface IProps {
  isSmScreen: boolean
  onClickNavOpen: () => void
}

function NavButtonView({ isSmScreen, onClickNavOpen }: IProps) {
  return (
    <>
      {isSmScreen && (
        <CustomButtonWrapper className="m-auto">
          <MdMenuOpen className="text-3xl text-blackberry-lightest" onClick={onClickNavOpen} />
        </CustomButtonWrapper>
      )}
    </>
  )
}

export default NavButtonView
