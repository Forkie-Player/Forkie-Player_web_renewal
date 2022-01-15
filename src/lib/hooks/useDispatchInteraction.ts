import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IAsyncState } from '../../modules/moduleTypes'
import useDispatchStatus from './useDispatchStatus'

export default function useDispatchInteraction(modules: IAsyncState) {
  const status = useDispatchStatus(modules)
  const [loadingToastId, setLoadingToastId] = useState<string>('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    switch (status) {
      case 'PENDING':
        if (timeoutId === null) {
          const id = setTimeout(() => setLoadingToastId(toast.loading('진행중이에요...')), 1000)
          setTimeoutId(id)
        }
        break
      case 'SUCCESS':
        if (loadingToastId !== '') {
          toast.success('성공했어요!', { id: loadingToastId })
        } else {
          toast.success('성공했어요!')
          if (timeoutId !== null) {
            clearTimeout(timeoutId)
          }
        }
        setTimeoutId(null)
        break
      case 'ERROR':
        if (loadingToastId !== '') {
          toast.error(modules.error, { id: loadingToastId })
        } else {
          toast.error(modules.error)
          if (timeoutId !== null) {
            clearTimeout(timeoutId)
          }
        }
        setTimeoutId(null)
        break
    }
  }, [loadingToastId, status, modules.error, timeoutId])

  return status
}
