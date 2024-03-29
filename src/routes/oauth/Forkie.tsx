import React from 'react'
import getQueryStringObject from '../../lib/utils/parseURLSearch'

function Forkie() {
  window.document.body.innerHTML = ''
  React.useEffect(() => {
    const urlSearch = getQueryStringObject<{ accessToken: string; refreshToken: string }>()
    if (urlSearch !== null) {
      if (urlSearch.accessToken && urlSearch.refreshToken) {
        localStorage.setItem(
          '@tokens',
          JSON.stringify({ accessToken: urlSearch.accessToken, refreshToken: urlSearch.refreshToken }),
        )
      } else {
        localStorage.setItem('@tokens', '')
      }
    }
    window.close()
  }, [])
  return <></>
}

export default Forkie
