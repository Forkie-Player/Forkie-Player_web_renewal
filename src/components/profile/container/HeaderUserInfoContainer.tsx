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
  changePassword: (prevPw: string, newPw: string) => Promise<void>
  onEditProfileImg: (e: React.ChangeEvent<HTMLInputElement>) => any
  onClickReauthenticate: (password: string) => Promise<void>
}

function HeaderUserInfoContainer({
  userInfo,
  onWithdrawl,
  changePassword,
  onEditProfileImg,
  onClickReauthenticate: onClickReauthenticateCallback,
}: IProps) {
  const [prevPassword, setPrevPassword] = useState('')
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  // 재인증 되었냐 아니냐
  const [isReauthenicated, setIsReauthenicated] = useState(false)
  const [showPopper, setShowPopper] = useState(false)
  const [popperMode, setPopperMode] = useState<'WITDRAWL' | 'PASSWORD_CHANGE'>('WITDRAWL')
  const [error, setError] = useState('')

  const onToggleShowPopper = useCallback(() => {
    setShowPopper(prev => !prev)
    setError('')
  }, [])

  // 회원 탈퇴버튼 눌렀을시, 회원탈퇴 팝업창을 보여줌
  const onClickWithdrawlButton = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowPopper(true)
    setReferenceElement(e.target as HTMLElement)
    setPopperMode('WITDRAWL')
  }
  // 비밀번호 변경 버튼 눌렀을시, 비밀번호 변경 팝업창을 보여줌
  const onClickPasswordChangeButton = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowPopper(true)
    setReferenceElement(e.target as HTMLElement)
    setPopperMode('PASSWORD_CHANGE')
  }

  // 비밀번호 입력 후 확인버튼 눌렀을시 호출
  const onClickReauthenticate = async (password: string) => {
    setError('')
    try {
      await onClickReauthenticateCallback(password)
      setPrevPassword(password)
      setIsReauthenicated(true)
      onToggleShowPopper()
      onToggleShowPopper()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // 비밀번호 변경 시도
  const onClickChangePassword = async (newPassword: string) => {
    setError('')
    try {
      await changePassword(prevPassword, newPassword)
      toast.success(AuthStrings.PASSWORD_CHANGE_SUCCESS)
      setIsReauthenicated(false)
      setPrevPassword('')
      onToggleShowPopper()
    } catch (err: any) {
      setError(err.message)
    }
  }

  // 회원탈퇴 취소
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
            isReauthenicated={isReauthenicated}
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

export default React.memo(HeaderUserInfoContainer)
