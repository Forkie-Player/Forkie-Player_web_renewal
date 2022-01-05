import React from 'react'
import { IPlaylistItem } from '../../../types'
import ListView from '../view/ListView'

interface IProps {
  items: IPlaylistItem[]
}

function ListContainer({ items }: IProps) {
  return <ListView items={items} />
}

export default ListContainer
