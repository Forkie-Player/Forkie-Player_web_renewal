import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootModuleType } from '../../../modules/moduleTypes'
import { getVideoAsync } from '../../../modules/video/actions'
import ListView from '../view/ListView'

import * as Constants from '../../../lib/constants'

function ListContainer() {
  const [doesUserClickPlaylist, setDoesUserClickPlaylist] = useState(false)

  const playlist = useSelector(({ playlist }: RootModuleType) => playlist.items)
  const videoStore = useSelector(({ video }: RootModuleType) => video)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (videoStore.pending) {
      setDoesUserClickPlaylist(true)
    }
    if (videoStore.error !== null && doesUserClickPlaylist === true) {
      toast.error(videoStore.error)
      setDoesUserClickPlaylist(false)
    }
    if (videoStore.success === true && doesUserClickPlaylist === true) {
      setDoesUserClickPlaylist(false)
      if (videoStore.items.length !== 0) {
        navigate(Constants.NavAbsolutePathItems.PLAY)
      } else {
        toast.error('영상이 없습니다.')
      }
    }
  }, [navigate, doesUserClickPlaylist, videoStore])

  const onClickPlaylistItem = useCallback(
    ({ id }: { id: number }) => {
      dispatch(getVideoAsync.request(id))
    },
    [dispatch],
  )

  return <ListView items={playlist} onClickPlaylistItem={onClickPlaylistItem} />
}

export default ListContainer
