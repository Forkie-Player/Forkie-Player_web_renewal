import { Cookies } from 'react-cookie'
import { CookieGetOptions, CookieSetOptions } from 'universal-cookie'

const cookies = new Cookies()

export const setCookie = (name: string, value: string, option?: CookieSetOptions) => {
  return cookies.set(name, value, { ...option })
}

export const getCookie = (name: string, option?: CookieGetOptions) => {
  return cookies.get(name, { ...option })
}

export const removeCookie = (name: string, options?: CookieSetOptions) => {
  return cookies.remove(name, { ...options })
}
