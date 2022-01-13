import React from 'react'
import { IPlaylist } from '../../types'

interface IProps {
  item: IPlaylist
  index: number
  onClick: (item: IPlaylist) => any
}

function PlaylistItem({ item, onClick }: IProps) {
  return (
    <div
      className="w-60 h-60 bg-white rounded-3xl shadow-outer overflow-hidden hover:drop-shadow-md active:shadow-inner cursor-pointer"
      onClick={() => onClick(item)}
    >
      {item?.thumbnail ? (
        <img src={item?.thumbnail} alt="thumbnail" className="w-full min-h-[80%] max-h-[80%] object-cover" />
      ) : (
        <div className="w-full min-h-[80%] max-h-[80%] bg-blackberry-lightest" />
      )}
      <div className="w-full text-center leading-10">{item?.title}</div>
    </div>
  )
}

export default PlaylistItem
