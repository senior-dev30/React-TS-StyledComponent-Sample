import { call, put } from 'redux-saga/effects'

import UserActions from '../Redux/UserRedux'

export function* loadUser(api: any) {
  const response = yield call(api.loadUser)

  if (response.ok) {
    yield put(UserActions.loadUserSuccess(response.data.data))
  } else {
    yield put(UserActions.loadUserFailure('Failed to load user.'))
  }
}

export function* removeUser() {
  yield put(UserActions.removeUserSuccess())
}
