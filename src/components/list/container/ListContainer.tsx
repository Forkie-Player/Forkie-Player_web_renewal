import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootModuleType } from '../../../modules/moduleTypes'
import { getVideoAsync } from '../../../modules/video/actions'
import ListView from '../view/ListView'

import * as Constants from '../../../lib/constants'
import { IPlaylist } from '../../../types'
import PlaylistPopper from '../elements/PlaylistPopper'
import { deletePlaylistAsync, editPlaylistTitleAsync } from '../../../modules/playlist/actions'
import useDispatchInteraction from '../../../lib/hooks/useDispatchInteraction'

function ListContainer() {
  const [showPopper, setShowPopper] = useState(false)
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [itemOnPopper, setItemOnPopper] = useState<IPlaylist | null>(null)

  const playlist = useSelector(({ playlist }: RootModuleType) => playlist)
  const videoStore = useSelector(({ video }: RootModuleType) => video)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const playlistStatus = useDispatchInteraction(playlist)
  const videoStoreStatus = useDispatchInteraction(videoStore)

  useEffect(() => {
    if (videoStoreStatus !== null) {
      switch (videoStoreStatus) {
        case 'SUCCESS':
          if (videoStore.items.length !== 0) {
            navigate(Constants.NavAbsolutePathItems.PLAY)
          } else {
            toast.error('영상이 없어요')
          }
          break
      }
    }
  }, [navigate, videoStore, videoStoreStatus])

  useEffect(() => {
    if (playlistStatus === 'SUCCESS') {
      setShowPopper(false)
    }
  }, [playlistStatus])

  const onToggleShowPopper = useCallback(() => {
    setShowPopper(prev => !prev)
  }, [])

  const onClickPlaylistItem = useCallback(
    ({ id }: { id: number }) => {
      dispatch(getVideoAsync.request(id))
    },
    [dispatch],
  )

  const onClickDeleteListItem = useCallback(() => {
    if (itemOnPopper !== null) {
      dispatch(deletePlaylistAsync.request(itemOnPopper.id))
    }
  }, [itemOnPopper, dispatch])

  const onClickTitleEdit = useCallback(
    (title: string) => {
      if (itemOnPopper !== null) {
        dispatch(editPlaylistTitleAsync.request({ id: itemOnPopper.id, title }))
      }
    },
    [itemOnPopper, dispatch],
  )

  const onClickEditButton = useCallback(
    (item: IPlaylist, reference: HTMLDivElement | null) => {
      setReferenceElement(reference)
      if (showPopper === true && item === itemOnPopper) {
        setShowPopper(false)
        setItemOnPopper(null)
      } else {
        setShowPopper(true)
        setItemOnPopper(item)
      }
    },
    [itemOnPopper, showPopper],
  )

  return (
    <>
      <ListView
        items={playlist.items}
        onClickPlaylistItem={onClickPlaylistItem}
        onClickEditButton={onClickEditButton}
      />

      {showPopper && (
        <PlaylistPopper
          referenceElement={referenceElement}
          onToggleShowPopper={onToggleShowPopper}
          onClickDelete={onClickDeleteListItem}
          onClickTitleEdit={onClickTitleEdit}
        />
      )}
    </>
  )
}

export default ListContainer
