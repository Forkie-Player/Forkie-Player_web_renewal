import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { NoSearchString } from '../../../lib/strings'
import { SearchPlatformType } from '../../../types'
import SelectOption from '../elements/SelectOption'
import SearchbarView from '../view/SearchbarView'

interface IProps {
  onSearch: (search: string) => void
}

const platformOptions: Array<{ value: SearchPlatformType; label: React.ReactNode }> = [
  {
    value: 'youtube',
    label: <SelectOption label="youtube" />,
  },
  { value: 'twitch', label: <SelectOption label="twitch" /> },
  { value: 'facebook', label: <SelectOption label="facebook" /> },
  { value: 'vimeo', label: <SelectOption label="vimeo" /> },
  { value: 'dailymotion', label: <SelectOption label="dailymotion" /> },
]

function SearchbarContainer({ onSearch: onSearchCallback }: IProps) {
  const [search, setSearch] = useState('')
  const [platformSelected, setPlatformSelected] = useState<Array<SearchPlatformType>>([
    'youtube',
    'twitch',
    'facebook',
    'vimeo',
    'dailymotion',
  ])
  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const searchBarViewRef = useRef<HTMLDivElement>(null)

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimedSearch = search.trim()
    if (trimedSearch.length !== 0) {
      onSearchCallback(trimedSearch)
    } else {
      toast.error(NoSearchString)
    }

    setSearch(trimedSearch)
  }

  const onSelectPlatform = (platform: SearchPlatformType) => {
    const newPlatformSelected = platformSelected.includes(platform)
      ? platformSelected.filter(p => p !== platform)
      : [...platformSelected, platform]
    if (newPlatformSelected.length === 0) {
      toast.error('최소 하나의 플랫폼을 선택해주세요.')
    } else {
      setPlatformSelected(newPlatformSelected)
      const input = searchBarViewRef.current?.querySelector('input#' + platform) as HTMLInputElement
      if (input !== null) {
        input.checked = !input.checked
      }
    }
  }

  return (
    <SearchbarView
      ref={searchBarViewRef}
      search={search}
      platformOptions={platformOptions}
      onChangeSearchText={onChangeSearchText}
      onSearch={onSearch}
      onSelectPlatform={onSelectPlatform}
    />
  )
}

export default React.memo(SearchbarContainer)
