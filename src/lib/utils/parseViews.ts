function addRest(views: string) {
  let cnt = 0
  for (let i = views.length - 1; i >= 0; i--) {
    cnt++
    if (cnt % 3 === 0 && i !== 0) {
      views = views.slice(0, i) + ',' + views.slice(i)
    }
  }
  return views
}

export default function parseViews(views: number) {
  if (views >= 100000000) {
    return `${addRest(Math.floor(views / 100000000).toString())}억`
  } else if (views >= 10000) {
    return `${addRest(Math.floor(views / 10000).toString())}만`
  } else {
    return `${addRest(views.toString())}`
  }
}
