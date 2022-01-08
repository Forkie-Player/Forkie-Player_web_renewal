import React from 'react'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../../modules/moduleTypes'
import ListView from '../view/ListView'

function ListContainer() {
  const playlist = useSelector(({ playlist }: RootModuleType) => playlist.items)
  return <ListView items={playlist} />
}

export default ListContainer
