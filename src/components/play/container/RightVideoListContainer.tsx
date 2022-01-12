import React from 'react'
import { IVideoHasRange } from '../../../types'
import RightVideoListView from '../view/RightVideoListView'

interface IProps {
  videoList: IVideoHasRange[]
  currentVideoIndex: number
  onClickVideoListItem: (itemIndex: number) => void
}

function RightVideoListContainer({ videoList, currentVideoIndex, onClickVideoListItem }: IProps) {
  return (
    <RightVideoListView
      videoList={videoList}
      currentVideoIndex={currentVideoIndex}
      onClickVideoListItem={onClickVideoListItem}
    />
  )
}

export default RightVideoListContainer
