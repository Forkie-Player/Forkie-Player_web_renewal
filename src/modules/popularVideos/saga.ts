import moment from 'moment'
import { call, put, takeLatest } from 'redux-saga/effects'
import { IGetPopularVideoSuccess } from '../../lib/api/types'
import { getPopularVideos as getPopularVideosApi } from '../../lib/api/videos'
import secondsToHHMMSS from '../../lib/utils/secondsToHHMMSS'
import { IVideo } from '../../types'
import handleSagaError from '../handleSagaError'
import { getPopularVideoAsync, popularVideosTypes } from './actions'

export function* getPopularVideoSaga() {
  try {
    const res: IGetPopularVideoSuccess = yield call(getPopularVideosApi)
    const ans: IVideo[] = res.popular.map(item => ({
      platform: 'youtube',
      videoId: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      channelImage: item.channelAvatar,
      duration: secondsToHHMMSS(moment.duration(item.contentDetails.duration).asSeconds()),
      views: item.statistics.viewCount,
      uploadedAt: item.snippet.publishedAt.slice(0, 10),
    }))

    yield put(getPopularVideoAsync.success(ans))
  } catch (err) {
    yield handleSagaError(err, getPopularVideoAsync.failure)
  }
}

export default function* popularVideosSaga() {
  yield takeLatest(popularVideosTypes.GET_POPULAR_VIDEOS, getPopularVideoSaga)
}
