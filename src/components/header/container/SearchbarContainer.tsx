import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CrawlAddress } from '../../../lib/api/constants'
import { setLoading, setUnloading } from '../../../modules/loading'
import { setSearchResult } from '../../../modules/searchResult'
import { ICrawlResultItem, IVideo } from '../../../types'
import SearchbarView from '../view/SearchbarView'

function SearchbarContainer() {
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      dispatch(setLoading())
      navigate('/search')
      const res = await axios.get(`${CrawlAddress}${decodeURIComponent(search)}`)
      let result: IVideo[] = res.data.data.items.map((item: ICrawlResultItem) => ({
        videoId: item.id,
        title: item.title,
        thumbnail: (item.thumbnails && item.thumbnails[0].url) || item.bestThumbnail.url,
        channelTitle: item.author.name,
        channelAvatar: item.author.bestAvatar.url,
        duration: item.duration,
        views: item.views,
        uploadedAt: item.uploadedAt,
      }))
      dispatch(setSearchResult(result))
      dispatch(setUnloading())
    } catch (err) {
      console.log(err)
    }
  }

  return <SearchbarView search={search} onChangeSearchText={onChangeSearchText} onSearch={onSearch} />
}

export default SearchbarContainer
