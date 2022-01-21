import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingElement from '../components/elements/loading'
import Profile from '../components/profile'
import { RootModuleType } from '../modules/moduleTypes'

const ProfilePage = () => {
  const userInfo = useSelector(({ userInfo }: RootModuleType) => userInfo.userInfo)
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo.member === false) {
      navigate('/')
    }
    setLoaded(true)
  }, [navigate, userInfo.member])

  return <>{loaded ? <Profile userInfo={userInfo} /> : <LoadingElement />}</>
}

export default ProfilePage
