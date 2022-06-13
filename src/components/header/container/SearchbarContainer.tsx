import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { searchPlatforms } from '../../../lib/constants'
import { NoSearchString } from '../../../lib/strings'
import { SearchPlatformType } from '../../../types'
import SelectOption from '../elements/SelectOption'
import SearchbarView from '../view/SearchbarView'

interface IProps {
  onSearch: (search: string, selectedPlatform: Array<SearchPlatformType>) => void
}

function SearchbarContainer({ onSearch: onSearchCallback }: IProps) {
  const [search, setSearch] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<Array<SearchPlatformType>>([
    'YOUTUBE',
    'TWITCH',
    'DAILYMOTION',
  ])
  const [platformOptions, setPlatformOptions] = useState<Array<{ value: SearchPlatformType; label: React.ReactNode }>>([
    {
      value: 'YOUTUBE',
      label: <SelectOption label="YOUTUBE" isChecked={true} />,
    },
    { value: 'TWITCH', label: <SelectOption label="TWITCH" isChecked={true} /> },
    { value: 'DAILYMOTION', label: <SelectOption label="DAILYMOTION" isChecked={true} /> },
  ])

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const searchBarViewRef = useRef<HTMLDivElement>(null)

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimedSearch = search.trim()
    if (trimedSearch.length !== 0) {
      onSearchCallback(trimedSearch, selectedPlatform)
    } else {
      toast.error(NoSearchString)
    }

    setSearch(trimedSearch)
  }

  const onSelectPlatform = (platform: SearchPlatformType) => {
    const newPlatformSelected = selectedPlatform.includes(platform)
      ? selectedPlatform.filter(p => p !== platform)
      : [...selectedPlatform, platform]
    if (newPlatformSelected.length === 0) {
      toast.error('최소 하나의 플랫폼을 선택해주세요.')
    } else {
      setSelectedPlatform(newPlatformSelected)
      const input = searchBarViewRef.current?.querySelector('input#' + platform) as HTMLInputElement
      if (input !== null) {
        input.checked = !input.checked
      }
    }
  }
  const onMenuOpen = () => {
    const newSetPlatformOptions: Array<{ value: SearchPlatformType; label: React.ReactNode }> = []

    searchPlatforms.forEach(platform => {
      if (!selectedPlatform.includes(platform)) {
        newSetPlatformOptions.push({
          value: platform,
          label: <SelectOption label={platform} isChecked={false} />,
        })
      } else {
        newSetPlatformOptions.push({
          value: platform,
          label: <SelectOption label={platform} isChecked={true} />,
        })
      }
    })
    setPlatformOptions(newSetPlatformOptions)
  }

  return (
    <SearchbarView
      ref={searchBarViewRef}
      search={search}
      platformOptions={platformOptions}
      onChangeSearchText={onChangeSearchText}
      onSearch={onSearch}
      onMenuOpen={onMenuOpen}
      onSelectPlatform={onSelectPlatform}
    />
  )
}

export default React.memo(SearchbarContainer)
