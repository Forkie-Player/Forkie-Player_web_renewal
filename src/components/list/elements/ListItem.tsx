import React from 'react'
import { IPlaylistItem } from '../../../types'

interface IProps {
  item: IPlaylistItem
  index: number
}

function ListItem({ item, index }: IProps) {
  return (
    <div className="w-60 h-60 bg-white rounded-3xl shadow-outer overflow-hidden hover:drop-shadow-md cursor-pointer">
      <img src={item.thumbnail} alt="thumbnail" className="w-full min-h-[80%] max-h-[80%] object-cover" />
      <div className="w-full text-center leading-10">{item.title}</div>
    </div>
  )
}

export default ListItem
