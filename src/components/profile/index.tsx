import React, { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, pwUpdate } from '../../lib/api/auth'
import { auth as AuthStrings, ErrorMessageFromServer, ErrorMessageToUser } from '../../lib/strings'
import { withdrawlUser } from '../../lib/utils/auth'
import { checkPassword, handleAuthApiError } from '../../lib/utils/handleAuthErr'
import { getPlaylistAsync } from '../../modules/playlist/actions'
import { clearUserInfo, getUserInfo, updateProfileImgAsync } from '../../modules/userInfo/actions'
import { IUserInfo } from '../../types'
import HeaderUserInfoContainer from './container/HeaderUserInfoContainer'
import HeaderBackground from './view/HeaderBackground'

interface IProps {
  userInfo: IUserInfo
}

const Profile = ({ userInfo }: IProps) => {
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
      if (e.target.files !== undefined && e.target.files !== null) {
        dispatch(updateProfileImgAsync.request(e.target.files[0]))
      }
    },
    [dispatch],
  )

  const changePassword = useCallback(async (prevPw: string, newPw: string) => {
    try {
      checkPassword(newPw)
    } catch (err) {
      throw err
    }

    try {
      await pwUpdate(prevPw, newPw)
    } catch (err) {
      throw Error(handleAuthApiError(err))
    }
  }, [])

  const onClickReauthenticate = useCallback(
    async (password: string) => {
      try {
        checkPassword(password)
      } catch (err) {
        throw err
      }
      try {
        await login(userInfo.loginId, password)
      } catch (err) {
        throw Error(handleAuthApiError(err))
      }
    },
    [userInfo],
  )

  return (
    <div className="grid h-full w-full grid-rows-6 px-2 md:px-[5%]">
      <HeaderBackground />
      <HeaderUserInfoContainer
        userInfo={userInfo}
        onWithdrawl={onWithdrawl}
        changePassword={changePassword}
        onEditProfileImg={onEditProfileImg}
        onClickReauthenticate={onClickReauthenticate}
      />
    </div>
  )
}

export default Profile
