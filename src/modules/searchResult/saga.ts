import { call, put, takeLatest } from 'redux-saga/effects'
import { getSearchResultApi } from '../../lib/api/search'
import { ISearchSuccess } from '../../lib/api/types'
import { ICrawlResultItem, IVideo } from '../../types'
import handleSagaError from '../handleSagaError'
import { getSearchResult, searchResultActionTypes } from './actions'

function* getSearchResultSaga(action: ReturnType<typeof getSearchResult.request>) {
  try {
    const res: ISearchSuccess = yield call(getSearchResultApi, action.payload)

    let result: IVideo[] = res.data.items.map((item: ICrawlResultItem) => ({
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
    yield handleSagaError(err, getSearchResult.failure)
  }
}

export default function* searchResultSaga() {
  yield takeLatest(searchResultActionTypes.GET_SEARCH_RESULT, getSearchResultSaga)
}
