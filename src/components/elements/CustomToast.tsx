import { useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import useIsSmScreen from '../../lib/hooks/useIsSmScreen'

export function CustomToast() {
  const isSmScreen = useIsSmScreen()

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
