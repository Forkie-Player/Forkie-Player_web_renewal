import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, pwUpdate, updateProfileImag } from '../../lib/api/auth'
import { auth as AuthStrings, ErrorMessageFromServer, ErrorMessageToUser } from '../../lib/strings'
import { withdrawlUser } from '../../lib/utils/auth'
import { checkPassword, handleAuthApiError } from '../../lib/utils/handleAuthErr'
import { RootModuleType } from '../../modules/moduleTypes'
import { getPlaylistAsync } from '../../modules/playlist/actions'
import { clearUserInfo, getUserInfo, setUserInfo } from '../../modules/userInfo/actions'
import { IUserInfo } from '../../types'
import HeaderUserInfoContainer from './container/HeaderUserInfoContainer'
import HeaderBackground from './view/HeaderBackground'

interface IProps {
  userInfo: IUserInfo
}

const Profile = ({ userInfo }: IProps) => {
  const playlists = useSelector(({ playlist }: RootModuleType) => playlist.items)
  const [prevPassword, setPrevPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onWithdrawl = useCallback(async () => {
    try {
      await withdrawlUser()
      dispatch(getUserInfo.request())
      dispatch(getPlaylistAsync.request())
      navigate('/')
    } catch (err) {
      if (err === ErrorMessageFromServer.REMOVE_USER_FAIL) {
        toast.error(ErrorMessageToUser.REMOVE_USER_FAIL)
      } else if (err === ErrorMessageFromServer.NONMEMBER_LOGIN_FAIL) {
        dispatch(clearUserInfo())
        window.location.reload()
      }
    }
    toast.success(AuthStrings.WITHDRAWL_SUCCESS)
  }, [dispatch, navigate])

  const onEditProfileImg = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData()
      if (e.target.files !== undefined && e.target.files !== null) {
        formData.append('img', e.target.files[0])
        try {
          const res = await updateProfileImag(formData)
          dispatch(setUserInfo(res.response))
        } catch (err) {
          toast.error(ErrorMessageToUser.UPDATE_PROFILE_IMG_FAIL)
        }
      }
    },
    [dispatch],
  )

  const changePassword = useCallback(
    async (newPw: string) => {
      const checkPasswordRef = checkPassword(newPw)
      if (checkPasswordRef !== '') {
        return checkPasswordRef
      }
      try {
        await pwUpdate(prevPassword, newPw)
      } catch (err) {
        return handleAuthApiError(err)
      }
      return ''
    },
    [prevPassword],
  )

  const onClickReauthenticate = useCallback(
    async (password: string) => {
      const checkPasswordRef = checkPassword(password)
      if (checkPasswordRef !== '') {
        return checkPasswordRef
      }
      try {
        await login(userInfo.loginId, password)
      } catch (err) {
        return handleAuthApiError(err)
      }
      setPrevPassword(password)
      return ''
    },
    [userInfo],
  )

  return (
    <div className="w-full h-full px-[5%]">
      <HeaderBackground />
      <HeaderUserInfoContainer
        userInfo={userInfo}
        playlists={playlists}
        onWithdrawl={onWithdrawl}
        changePassword={changePassword}
        onEditProfileImg={onEditProfileImg}
        onClickReauthenticate={onClickReauthenticate}
      />
    </div>
  )
}

export default Profile
