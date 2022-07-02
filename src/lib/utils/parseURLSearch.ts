export default function getQueryStringObject<T extends Object>(): T | null {
  var a = window.location.search.substr(1).split('&')
  var b: T = Object()

  if (a.length === 0) return null

  for (var i = 0; i < a.length; ++i) {
    var p = a[i].split('=', 2)
    if (p.length === 1) {
      Object.assign(b, { [p[0]]: '' })
    } else {
      Object.assign(b, { [p[0]]: decodeURIComponent(p[1].replace(/\+/g, ' ')) })
    }
  }

  return b
}
