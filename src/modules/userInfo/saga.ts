import toast from 'react-hot-toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getUserInfoApi, updateProfileImag } from '../../lib/api/auth'
import { IGetUserInfoSuccess, IUpdateProfileImgSuccess } from '../../lib/api/types'
import { ErrorMessageToUser } from '../../lib/strings'
import handleSagaError from '../handleSagaError'
import { getUserInfo, updateProfileImgAsync } from './actions'

function* getUserInfoSaga() {
  try {
    const res: IGetUserInfoSuccess = yield call(getUserInfoApi)
    yield put(getUserInfo.success(res.response))
  } catch (err) {
    yield handleSagaError(err, getUserInfo.failure)
  }
}
function* updateProfileImgSaga(action: ReturnType<typeof updateProfileImgAsync.request>) {
  try {
    console.log(action.payload)
    const formData = new FormData()
    formData.append('img', action.payload)
    const res: IUpdateProfileImgSuccess = yield call(updateProfileImag, formData)
    yield put(updateProfileImgAsync.success(res.response.profileImg))
  } catch (err) {
    yield handleSagaError(err, updateProfileImgAsync.failure)
    toast.error(ErrorMessageToUser.UPDATE_PROFILE_IMG_FAIL)
  }
}

export default function* userInfoSaga() {
  yield takeLatest(getUserInfo.request, getUserInfoSaga)
  yield takeLatest(updateProfileImgAsync.request, updateProfileImgSaga)
}
