import React from 'react'
import getQueryStringObject from '../../lib/utils/parseURLSearch'

function Vimeo() {
  window.document.body.innerHTML = ''
  React.useEffect(() => {
    const urlSearch = getQueryStringObject<{ code: string; state: string }>()
    if (urlSearch !== null) {
      if (urlSearch.code) {
        localStorage.setItem('vimeoAccessToken', urlSearch.code)
      } else {
        localStorage.setItem('vimeoAccessToken', '')
      }
      localStorage.setItem('vimeoState', urlSearch.state)
    }
    window.close()
  }, [])
  return <></>
}

export default Vimeo
