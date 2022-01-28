import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { auth as AuthStrings, THANKYOU } from '../../../lib/strings'
import { IUserInfo } from '../../../types'
import PopperWrapper from '../../elements/PopperWrapper'
import HeaderPopperView from '../view/HeaderPopperView'
import HeaderUserInfoView from '../view/HeaderUserInfoView'

interface IProps {
  userInfo: IUserInfo
  onWithdrawl: () => Promise<void>
  changePassword: (newPw: string) => Promise<string>
  onEditProfileImg: (e: React.ChangeEvent<HTMLInputElement>) => any
  onClickReauthenticate: (password: string) => Promise<string>
}

function HeaderUserInfoContainer({
  userInfo,
  onWithdrawl,
  changePassword,
  onEditProfileImg,
  onClickReauthenticate: onClickReauthenticateCallback,
}: IProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [reauthenicated, setReauthenicated] = useState(false)
  const [showPopper, setShowPopper] = useState(false)
  const [popperMode, setPopperMode] = useState<'WITDRAWL' | 'PASSWORD_CHANGE'>('WITDRAWL')
  const [error, setError] = useState('')

  const onToggleShowPopper = useCallback(() => {
    setShowPopper(prev => !prev)
    setError('')
  }, [])

  const onClickWithdrawlButton = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowPopper(true)
    setReferenceElement(e.target as HTMLElement)
    setPopperMode('WITDRAWL')
  }
  const onClickPasswordChangeButton = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowPopper(true)
    setReferenceElement(e.target as HTMLElement)
    setPopperMode('PASSWORD_CHANGE')
  }

  const onClickReauthenticate = async (password: string) => {
    setError('')
    const res = await onClickReauthenticateCallback(password)
    if (res !== '') {
      setError(res)
    } else {
      setReauthenicated(true)
      onToggleShowPopper()
      onToggleShowPopper()
    }
  }

  const onClickChangePassword = async (newPassword: string) => {
    setError('')
    const res = await changePassword(newPassword)
    if (res !== '') {
      setError(res)
    } else {
      toast.success(AuthStrings.PASSWORD_CHANGE_SUCCESS)
      onToggleShowPopper()
    }
  }

  const onCancleWithdrawl = () => {
    setShowPopper(false)
    setReferenceElement(null)
    toast.success(THANKYOU)
  }

  return (
    <>
      <HeaderUserInfoView
        userInfo={userInfo}
        onWithdrawl={onClickWithdrawlButton}
        onClickPasswordChangeButton={onClickPasswordChangeButton}
        onEditProfileImg={onEditProfileImg}
      />
      {showPopper && referenceElement !== null && (
        <PopperWrapper referenceElement={referenceElement} onToggleShowPopper={onToggleShowPopper}>
          <HeaderPopperView
            error={error}
            reauthenicated={reauthenicated}
            popperMode={popperMode}
            onWithdrawl={onWithdrawl}
            onClickReauthenticate={onClickReauthenticate}
            onClickChangePassword={onClickChangePassword}
            onCancleWithdrawl={onCancleWithdrawl}
          />
        </PopperWrapper>
      )}
    </>
  )
}

export default HeaderUserInfoContainer
