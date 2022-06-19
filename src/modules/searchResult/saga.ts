import { call, put, takeLatest } from 'redux-saga/effects'
import { getSearchResultByPlatform } from '../../lib/api/search'
import { ISearchSuccess } from '../../lib/api/types'
import handleSagaError from '../handleSagaError'
import {
  getSearchResult,
  getSearchResultDailymotion,
  getSearchResultTwitch,
  getSearchResultVimeo,
  getSearchResultYoutube,
  searchResultActionTypes,
} from './actions'

export function* getSearchResultSaga(action: ReturnType<typeof getSearchResult.request>) {
  for (const platform of action.payload.platforms) {
    switch (platform) {
      case 'YOUTUBE':
        yield put(getSearchResultYoutube.request(action.payload.search))
        break
      case 'TWITCH':
        yield put(getSearchResultTwitch.request(action.payload.search))
        break
      case 'DAILYMOTION':
        yield put(getSearchResultDailymotion.request(action.payload.search))
        break
      case 'VIMEO':
        yield put(getSearchResultVimeo.request(action.payload.search))
        break
    }
  }
  yield put(getSearchResult.success())
}

export function* getYoutubeSearchResultSaga(action: ReturnType<typeof getSearchResultYoutube.request>) {
  try {
    const res: ISearchSuccess = yield call(getSearchResultByPlatform, { search: action.payload, platform: 'YOUTUBE' })
    yield put(getSearchResultYoutube.success(res.data))
  } catch (err) {
    yield handleSagaError(err, getSearchResultYoutube.failure)
  }
}

export function* getTwitchSearchResultSaga(action: ReturnType<typeof getSearchResultTwitch.request>) {
  try {
    const res: ISearchSuccess = yield call(getSearchResultByPlatform, { search: action.payload, platform: 'TWITCH' })
    yield put(getSearchResultTwitch.success(res.data))
  } catch (err) {
    yield handleSagaError(err, getSearchResultTwitch.failure)
  }
}

export function* getDailymotionSearchResultSaga(action: ReturnType<typeof getSearchResultDailymotion.request>) {
  try {
    const res: ISearchSuccess = yield call(getSearchResultByPlatform, {
      search: action.payload,
      platform: 'DAILYMOTION',
    })
    yield put(getSearchResultDailymotion.success(res.data))
  } catch (err) {
    yield handleSagaError(err, getSearchResultDailymotion.failure)
  }
}

export function* getVimeoSearchResultSaga(action: ReturnType<typeof getSearchResultVimeo.request>) {
  try {
    const res: ISearchSuccess = yield call(getSearchResultByPlatform, { search: action.payload, platform: 'VIMEO' })
    yield put(getSearchResultVimeo.success(res.data))
  } catch (err) {
    yield handleSagaError(err, getSearchResultVimeo.failure)
  }
}

export default function* searchResultSaga() {
  yield takeLatest(searchResultActionTypes.GET_SEARCH_RESULT, getSearchResultSaga)
  yield takeLatest(searchResultActionTypes.GET_SEARCH_RESULT_YOUTUBE, getYoutubeSearchResultSaga)
  yield takeLatest(searchResultActionTypes.GET_SEARCH_RESULT_TWITCH, getTwitchSearchResultSaga)
  yield takeLatest(searchResultActionTypes.GET_SEARCH_RESULT_DAILYMOTION, getDailymotionSearchResultSaga)
  yield takeLatest(searchResultActionTypes.GET_SEARCH_RESULT_VIMEO, getVimeoSearchResultSaga)
}
