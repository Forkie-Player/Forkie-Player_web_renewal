import { call, put } from 'redux-saga/effects'
import * as sagas from './saga'
import * as apis from '../../lib/api/playlist'
import * as actions from './actions'
import { temp_playlist, temp_videoHasRange } from '../../lib/tempData'
import handleSagaError from '../handleSagaError'
import * as Strings from '../../lib/strings'
import toast from 'react-hot-toast'
import { addVideo } from '../../lib/api/videos'

jest.mock('../../lib/api/playlist', () => ({
  createPlaylist: jest.fn(),
  deletePlaylist: jest.fn(),
  editPlaylistTitle: jest.fn(),
  getPlaylistApi: jest.fn(),
}))
jest.mock('../../lib/api/videos', () => ({
  addVideo: jest.fn(),
}))
jest.mock('../handleSagaError', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const tempError = Error('error')

describe('test getPlaylistSaga', () => {
  test('should yield put properly', () => {
    const generator = sagas.getPlaylistSaga()
    expect(generator.next().value).toEqual(call(apis.getPlaylistApi))
    expect(
      generator.next({
        status: 200,
        message: '성공',
        data: temp_playlist,
      }).value,
    ).toEqual(put(actions.getPlaylistAsync.success(temp_playlist)))
  })
  test('when api fail, call handleSagaError', () => {
    const generator = sagas.getPlaylistSaga()
    expect(generator.next().value).toEqual(call(apis.getPlaylistApi))

    generator.throw(tempError)
    expect(handleSagaError).toHaveBeenCalled()
    expect(handleSagaError).toBeCalledWith(tempError, actions.getPlaylistAsync.failure)
  })
})

describe('test createPlaylistSaga', () => {
  test('should yield put properly', () => {
    const generator = sagas.createPlaylistSaga(
      actions.createPlaylistAsync.request({ title: 'test', isPublic: false, category: 'OTHER' }),
    )
    const mocked_toast_success = jest.spyOn(toast, 'success')

    expect(generator.next().value).toEqual(
      call(apis.createPlaylist, {
        title: 'test',
        isPublic: false,
        category: 'OTHER',
      }),
    )
    expect(
      generator.next({
        status: 200,
        message: '성공',
        data: null,
      }).value,
    ).toEqual(put(actions.createPlaylistAsync.success(null)))
    generator.next()
    expect(mocked_toast_success).toBeCalledTimes(1)
    expect(mocked_toast_success).toBeCalledWith(Strings.addPlaylistSuccess)
  })
  test('when api fail, call handleSagaError', () => {
    const generator = sagas.createPlaylistSaga(
      actions.createPlaylistAsync.request({ title: 'test', isPublic: false, category: 'OTHER' }),
    )

    expect(generator.next().value).toEqual(
      call(apis.createPlaylist, {
        title: 'test',
        isPublic: false,
        category: 'OTHER',
      }),
    )
    generator.throw(tempError)
    expect(handleSagaError).toHaveBeenCalled()
    expect(handleSagaError).toBeCalledWith(tempError, actions.createPlaylistAsync.failure)
  })
})

describe('test addVideoSaga', () => {
  test('should yield put properly', () => {
    const generator = sagas.addVideoSaga(
      actions.addVideoAsync.request({
        playlistId: 1,
        video: {
          ...temp_videoHasRange,
          startTime: temp_videoHasRange.start,
          endTime: temp_videoHasRange.end,
          channelImg: temp_videoHasRange.channelImage,
        },
      }),
    )
    const mocked_toast_success = jest.spyOn(toast, 'success')

    expect(generator.next().value).toEqual(
      call(addVideo, {
        playlistId: 1,
        video: {
          ...temp_videoHasRange,
          startTime: temp_videoHasRange.start,
          endTime: temp_videoHasRange.end,
          channelImg: temp_videoHasRange.channelImage,
        },
      }),
    )
    expect(
      generator.next({
        id: 1,
        thumbnail: temp_videoHasRange.thumbnail,
      }).value,
    ).toEqual(
      put(
        actions.addVideoAsync.success({
          id: 1,
          thumbnail: temp_videoHasRange.thumbnail,
        }),
      ),
    )
    generator.next()
    expect(mocked_toast_success).toBeCalledTimes(1)
    expect(mocked_toast_success).toBeCalledWith(Strings.addVideoSuccess)
  })
  test('when api fail, call handleSagaError', () => {
    const generator = sagas.addVideoSaga(
      actions.addVideoAsync.request({
        playlistId: 1,
        video: {
          ...temp_videoHasRange,
          startTime: temp_videoHasRange.start,
          endTime: temp_videoHasRange.end,
          channelImg: temp_videoHasRange.channelImage,
        },
      }),
    )

    expect(generator.next().value).toEqual(
      call(addVideo, {
        playlistId: 1,
        video: {
          ...temp_videoHasRange,
          startTime: temp_videoHasRange.start,
          endTime: temp_videoHasRange.end,
          channelImg: temp_videoHasRange.channelImage,
        },
      }),
    )
    generator.throw(tempError)
    expect(handleSagaError).toHaveBeenCalled()
    expect(handleSagaError).toBeCalledWith(tempError, actions.addVideoAsync.failure)
  })
})

describe('test deletePlaylistSaga', () => {
  test('should yield put properly', () => {
    const generator = sagas.deletePlaylistSaga(actions.deletePlaylistAsync.request(1))

    expect(generator.next().value).toEqual(call(apis.deletePlaylist, 1))
    expect(generator.next({ success: true, error: null, id: 1, deleted: true }).value).toEqual(
      put(actions.deletePlaylistAsync.success(null)),
    )
  })
  test('when api fail, call handleSagaError', () => {
    const generator = sagas.deletePlaylistSaga(actions.deletePlaylistAsync.request(1))

    expect(generator.next().value).toEqual(call(apis.deletePlaylist, 1))
    generator.throw(tempError)
    expect(handleSagaError).toHaveBeenCalled()
    expect(handleSagaError).toBeCalledWith(tempError, actions.deletePlaylistAsync.failure)
  })
})

describe('test editPlaylistTitleSaga', () => {
  test('should yield put properly', () => {
    const generator = sagas.editPlaylistTitleSaga(
      actions.editPlaylistTitleAsync.request({ playlistId: 1, title: 'test' }),
    )

    expect(generator.next().value).toEqual(call(apis.editPlaylistTitle, { playlistId: 1, title: 'test' }))
    expect(generator.next().value).toEqual(
      put(actions.editPlaylistTitleAsync.success({ playlistId: 1, title: 'test' })),
    )
  })
  test('when api fail, call handleSagaError', () => {
    const generator = sagas.editPlaylistTitleSaga(
      actions.editPlaylistTitleAsync.request({ playlistId: 1, title: 'test' }),
    )

    expect(generator.next().value).toEqual(call(apis.editPlaylistTitle, { playlistId: 1, title: 'test' }))
    generator.throw(tempError)
    expect(handleSagaError).toHaveBeenCalled()
    expect(handleSagaError).toBeCalledWith(tempError, actions.editPlaylistTitleAsync.failure)
  })
})
