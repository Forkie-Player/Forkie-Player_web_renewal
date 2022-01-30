import { Cookies } from 'react-cookie'
import { CookieGetOptions, CookieSetOptions } from 'universal-cookie'

const cookies = new Cookies()

export const setCookie = (name: string, value: string, option?: CookieSetOptions) => {
  return cookies.set(name, value, { ...option, secure: true })
}

export const getCookie = (name: string, option?: CookieGetOptions) => {
  const res = cookies.get(name, { ...option })

  /** 기존 웹에서는 localStorage에 토큰, 비회원아이디를 저장함
   *  하지만 리뉴얼에서는 쿠키를 사용하므로 이에 대응하기 위해
   *  쿠키에서 요청온 것이 발견되지 않으면, 로컬스토리지에서도 한번 찾아봄.
   *  이후 쿠키에 저장하고 삭제
   */
  if (res === undefined) {
    const local = window.localStorage.getItem(name)
    if (local !== null) {
      window.localStorage.removeItem(name)
      try {
        const parsed = JSON.parse(local)
        setCookie(name, parsed)
        return parsed
      } catch (err) {
        setCookie(name, local)
        return local
      }
    }
  }

  return res
}

export const removeCookie = (name: string, options?: CookieSetOptions) => {
  return cookies.remove(name, { ...options })
}
