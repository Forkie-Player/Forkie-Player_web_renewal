import { call, put, takeLatest } from 'redux-saga/effects'
import { getSearchResultByPlatform } from '../../lib/api/search'
import { ISearchSuccess } from '../../lib/api/types'
import handleSagaError from '../handleSagaError'
import {
  getSearchResult,
  getSearchResultDailymotion,
  getSearchResultTwitch,
  getSearchResultYoutube,
  searchResultActionTypes,
} from './actions'

export function* getSearchResultSaga(action: ReturnType<typeof getSearchResult>) {
  for (const platform of action.payload.platforms) {
    switch (platform) {
      case 'youtube':
        yield put(getSearchResultYoutube.request(action.payload.search))
        break
      case 'twitch':
        yield put(getSearchResultTwitch.request(action.payload.search))
        break
      case 'dailymotion':
        yield put(getSearchResultDailymotion.request(action.payload.search))
        break
    }
  }
}

export function* getYoutubeSearchResultSaga(action: ReturnType<typeof getSearchResultYoutube.request>) {
  try {
    const res: ISearchSuccess = yield call(getSearchResultByPlatform, { search: action.payload, platform: 'youtube' })
    yield put(getSearchResultYoutube.success(res.data))
  } catch (err) {
    yield handleSagaError(err, getSearchResultYoutube.failure)
  }
}

export function* getTwitchSearchResultSaga(action: ReturnType<typeof getSearchResultTwitch.request>) {
  try {
    const res: ISearchSuccess = yield call(getSearchResultByPlatform, { search: action.payload, platform: 'twitch' })
    yield put(getSearchResultTwitch.success(res.data))
  } catch (err) {
    yield handleSagaError(err, getSearchResultTwitch.failure)
  }
}

export function* getDailymotionSearchResultSaga(action: ReturnType<typeof getSearchResultDailymotion.request>) {
  try {
    const res: ISearchSuccess = yield call(getSearchResultByPlatform, {
      search: action.payload,
      platform: 'dailymotion',
    })
    yield put(getSearchResultDailymotion.success(res.data))
  } catch (err) {
    yield handleSagaError(err, getSearchResultDailymotion.failure)
  }
}

export default function* searchResultSaga() {
  yield takeLatest(searchResultActionTypes.GET_SEARCH_RESULT, getSearchResultSaga)
  yield takeLatest(searchResultActionTypes.GET_SEARCH_RESULT_YOUTUBE, getYoutubeSearchResultSaga)
  yield takeLatest(searchResultActionTypes.GET_SEARCH_RESULT_TWITCH, getTwitchSearchResultSaga)
  yield takeLatest(searchResultActionTypes.GET_SEARCH_RESULT_DAILYMOTION, getDailymotionSearchResultSaga)
}
