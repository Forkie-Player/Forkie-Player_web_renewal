import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { localStorageKey, searchPlatforms } from '../../../lib/constants'
import { NoSearchString } from '../../../lib/strings'
import { SearchPlatformType } from '../../../types'
import SelectOption from '../elements/SelectOption'
import SearchbarView from '../view/SearchbarView'
import { FiInfo } from 'react-icons/fi'
import CustomModalWrapper from '../../elements/CustomModalWrapper'
import { CustomButton } from '../../elements/CustomButton'

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
    { value: 'VIMEO', label: <SelectOption label="VIMEO" isChecked={false} /> },
  ])
  const [oauthNotiRequiredPlatform, setOauthNotiRequiredPlatform] = useState(false)
  const [showNotiModal, setShowNotiModal] = useState(false)

  useEffect(() => {
    const savedSelectedPlatform = localStorage.getItem(localStorageKey.SELECTED_PLATFORM)
    if (savedSelectedPlatform) {
      setSelectedPlatform(JSON.parse(savedSelectedPlatform))
    } else {
      setOauthNotiRequiredPlatform(true)
    }
  }, [])

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
      if (oauthNotiRequiredPlatform && platform === 'VIMEO') {
        setOauthNotiRequiredPlatform(false)
        setShowNotiModal(true)
      }

      setSelectedPlatform(newPlatformSelected)
      localStorage.setItem(localStorageKey.SELECTED_PLATFORM, JSON.stringify(newPlatformSelected))
      const input = searchBarViewRef.current?.querySelector('input#' + platform) as HTMLInputElement
      if (input !== null) {
        input.checked = !input.checked
      }
    }
  }
  const onMenuOpen = () => {
    const newSetPlatformOptions: Array<{ value: SearchPlatformType; label: React.ReactNode }> = []

    let savedSelectedPlatform = localStorage.getItem(localStorageKey.SELECTED_PLATFORM)
    let newSelectedPlatform: Array<SearchPlatformType> = []

    if (savedSelectedPlatform === null) {
      newSelectedPlatform = selectedPlatform
    } else {
      newSelectedPlatform = JSON.parse(savedSelectedPlatform) as Array<SearchPlatformType>
      setSelectedPlatform(newSelectedPlatform)
    }

    searchPlatforms.forEach(platform => {
      newSetPlatformOptions.push({
        value: platform,
        label: <SelectOption label={platform} isChecked={newSelectedPlatform.includes(platform)} />,
      })
    })
    setPlatformOptions(newSetPlatformOptions)
  }

  const closeNotiModal = () => {
    setShowNotiModal(false)
  }

  return (
    <>
      <SearchbarView
        ref={searchBarViewRef}
        search={search}
        platformOptions={platformOptions}
        onChangeSearchText={onChangeSearchText}
        onSearch={onSearch}
        onMenuOpen={onMenuOpen}
        onSelectPlatform={onSelectPlatform}
      />
      {
        <CustomModalWrapper isOpen={showNotiModal} onRequestClose={closeNotiModal}>
          <div className="p-4 px-8 w-120 bg-white rounded-md drop-shadow-lg">
            <FiInfo className="w-8 h-8 mb-4 text-primary-yellow rounded-full" />
            <div className="leading-8">
              Vimeo 검색에는 실제 사용자분의 인증이 필요해요. <br />
              검색을 눌렀을 시 인증 페이지가 뜰텐데 인증을 마치시면 검색이 완료돼요. <br />
              한번 인증하면 긴 기간동안 재인증을 안해도 되니, 귀찮더라도 인증 부탁드려요.
            </div>
            <div className="mt-4">
              <button className="bg-primary-yellow py-2 px-4 rounded text-white" onClick={closeNotiModal}>
                확인
              </button>
            </div>
          </div>
        </CustomModalWrapper>
      }
    </>
  )
}

export default React.memo(SearchbarContainer)
