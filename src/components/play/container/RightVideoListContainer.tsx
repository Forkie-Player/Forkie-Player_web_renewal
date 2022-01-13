import React, { useEffect } from 'react'
import { IVideoInPlaylist } from '../../../types'
import RightVideoListView from '../view/RightVideoListView'

interface IProps {
  videoList: IVideoInPlaylist[]
  currentVideoIndex: number
  onClickVideoListItem: (itemIndex: number) => void
  onClickEdit: (video: number) => void | Promise<void>
  onClickDelete: (video: number) => void | Promise<void>
}

function RightVideoListContainer({
  videoList,
  currentVideoIndex,
  onClickVideoListItem,
  onClickEdit,
  onClickDelete,
}: IProps) {
  const itemRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (itemRef.current !== null) {
      itemRef.current.scrollIntoView()
    }
  }, [itemRef, currentVideoIndex])

  return (
    <RightVideoListView
      itemRef={itemRef}
      videoList={videoList}
      currentVideoIndex={currentVideoIndex}
      onClickVideoListItem={onClickVideoListItem}
      onClickDelete={onClickDelete}
      onClickEdit={onClickEdit}
    />
  )
}

export default RightVideoListContainer
