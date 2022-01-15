import { useEffect, useState } from 'react'
import { IAsyncState } from '../../modules/moduleTypes'

export default function useDispatchStatus(modules: IAsyncState) {
  const { error, success, pending } = modules
  const [status, setStatus] = useState<'PENDING' | 'SUCCESS' | 'ERROR' | null>(null)
  const [inProgress, setInProgress] = useState(false)

  useEffect(() => {
    if (!inProgress && pending === true) {
      setStatus('PENDING')
      setInProgress(true)
    } else if (inProgress && success === true) {
      setStatus('SUCCESS')
      setInProgress(false)
    } else if (inProgress && error !== null) {
      setStatus('ERROR')
      setInProgress(false)
    } else {
      setStatus(null)
    }
  }, [inProgress, success, error, pending])

  return status
}
