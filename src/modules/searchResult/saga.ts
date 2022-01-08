import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getSearchResultApi } from '../../lib/api/search'
import { ICrawlResultItem, IVideo } from '../../types'
import { getSearchResult, searchResultActionTypes } from './actions'

function* getSearchResultSaga(action: ReturnType<typeof getSearchResult.request>) {
  try {
    const res: ICrawlResultItem[] = yield call(getSearchResultApi, action.payload)
    let result: IVideo[] = res.map((item: ICrawlResultItem) => ({
      videoId: item.id,
      title: item.title,
      thumbnail: (item.thumbnails && item.thumbnails[0].url) || item.bestThumbnail.url,
      channelTitle: item.author.name,
      channelAvatar: item.author.bestAvatar.url,
      duration: item.duration,
      views: item.views,
      uploadedAt: item.uploadedAt,
    }))
    yield put(getSearchResult.success(result))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(getSearchResult.failure(err))
    }
  }
}

export function* searchResultSaga() {
  yield takeLatest(searchResultActionTypes.GET_SEARCH_RESULT, getSearchResultSaga)
}
