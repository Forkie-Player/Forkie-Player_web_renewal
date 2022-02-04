import { useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../modules/moduleTypes'

export function CustomToast() {
  const isSmScreen = useSelector(({ isSmScreen }: RootModuleType) => isSmScreen)

  const containerStyleMemo = useMemo(() => {
    if (isSmScreen) {
      return {
        left: '4.5rem',
        bottom: '3rem',
      }
    } else {
      return {}
    }
  }, [isSmScreen])

  return <Toaster position="bottom-left" containerStyle={containerStyleMemo}></Toaster>
}
