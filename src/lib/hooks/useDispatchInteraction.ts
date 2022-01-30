import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IAsyncState } from '../../modules/moduleTypes'
import useDispatchStatus from './useDispatchStatus'

export default function useDispatchInteraction(
  modules: IAsyncState,
  showPendingToast: boolean = true,
  showSuccessToast: boolean = false,
  showErrorToast: boolean = true,
) {
  const status = useDispatchStatus(modules)
  const [loadingToastId, setLoadingToastId] = useState<string>('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    switch (status) {
      case 'PENDING':
        if (showPendingToast === true) {
          if (timeoutId === null) {
            const id = setTimeout(() => setLoadingToastId(toast.loading('진행중이에요...')), 1000)
            setTimeoutId(id)
          }
        }
        break
      case 'SUCCESS':
        if (showSuccessToast === true) {
          if (loadingToastId !== '') {
            toast.success('성공했어요!', { id: loadingToastId })
          } else {
            toast.success('성공했어요!')
          }
        } else if (loadingToastId !== '') {
          toast.dismiss(loadingToastId)
        }
        if (timeoutId !== null) {
          clearTimeout(timeoutId)
        }
        setTimeoutId(null)
        break
      case 'ERROR':
        if (showErrorToast === true) {
          if (loadingToastId !== '') {
            toast.error(modules.error, { id: loadingToastId })
          } else {
            toast.error(modules.error)
          }
        } else if (loadingToastId !== '') {
          toast.dismiss(loadingToastId)
        }
        if (timeoutId !== null) {
          clearTimeout(timeoutId)
        }
        setTimeoutId(null)
        break
    }
  }, [loadingToastId, status, modules.error, timeoutId, showPendingToast, showSuccessToast, showErrorToast])

  return status
}
