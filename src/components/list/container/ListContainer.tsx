import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ListView from '../view/ListView'

import * as Constants from '../../../lib/constants'
import { IPlaylist } from '../../../types'
import useDispatchInteraction from '../../../lib/hooks/useDispatchInteraction'

import * as Strings from '../../../lib/strings'
import { TPlaylistType } from '../../../modules/playlist/types'
import { TVideoStoreType } from '../../../modules/video/types'

interface IProps {
  playlistStore: TPlaylistType
  videoStore: TVideoStoreType
  onClickPlaylistItem: (item: IPlaylist) => void
  onClickTitleEdit: (id: number, title: string) => void
  onClickDeleteListItem: (id: number) => void
}

function ListContainer({
  playlistStore,
  videoStore,
  onClickPlaylistItem,
  onClickTitleEdit: onClickTitleEditCallback,
  onClickDeleteListItem: onClickDeleteListItemCallback,
}: IProps) {
  const [showModal, setShowModal] = useState(false)
  const [itemOnPopper, setItemOnPopper] = useState<IPlaylist | null>(null)

  const navigate = useNavigate()

  const playlistStatus = useDispatchInteraction(playlistStore)
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

  const onClickDeleteListItem = useCallback(() => {
    if (itemOnPopper !== null) {
      onClickDeleteListItemCallback(itemOnPopper.id)
    }
  }, [itemOnPopper, onClickDeleteListItemCallback])

  const onClickTitleEdit = useCallback(
    (titleInput: string): string => {
      const title = titleInput.trim()
      if (itemOnPopper !== null) {
        if (itemOnPopper.title === title) {
          return Strings.SameTitleCurrent
        }
        onClickTitleEditCallback(itemOnPopper.id, title)
      }
      return ''
    },
    [itemOnPopper, onClickTitleEditCallback],
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
      items={playlistStore.items}
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
