import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootModuleType } from '../../../modules/moduleTypes'
import { getVideoAsync } from '../../../modules/video/actions'
import ListView from '../view/ListView'

import * as Constants from '../../../lib/constants'
import { IPlaylist } from '../../../types'
import { deletePlaylistAsync, editPlaylistTitleAsync } from '../../../modules/playlist/actions'
import useDispatchInteraction from '../../../lib/hooks/useDispatchInteraction'

import * as Strings from '../../../lib/strings'

function ListContainer() {
  const [showModal, setShowModal] = useState(false)
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
      setShowModal(false)
    }
  }, [playlistStatus])

  const onToggleShowPopper = useCallback(() => {
    setShowModal(prev => !prev)
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
    (titleInput: string): string => {
      const title = titleInput.trim()
      if (itemOnPopper !== null) {
        if (itemOnPopper.title === title) {
          return Strings.SameTitleCurrent
        }
        if (playlist.items.some(item => item.title === title)) {
          return Strings.SameTitleInPlaylist
        }
        dispatch(editPlaylistTitleAsync.request({ id: itemOnPopper.id, title }))
      }
      return ''
    },
    [itemOnPopper, playlist, dispatch],
  )

  const onClickEditButton = useCallback(
    (item: IPlaylist) => {
      if (showModal === true && item === itemOnPopper) {
        setShowModal(false)
        setItemOnPopper(null)
      } else {
        setShowModal(true)
        setItemOnPopper(item)
      }
    },
    [itemOnPopper, showModal],
  )

  return (
    <ListView
      items={playlist.items}
      showModal={showModal}
      onClickPlaylistItem={onClickPlaylistItem}
      onClickEditButton={onClickEditButton}
      onToggleShowPopper={onToggleShowPopper}
      onClickDeleteListItem={onClickDeleteListItem}
      onClickTitleEdit={onClickTitleEdit}
    />
  )
}

export default ListContainer
