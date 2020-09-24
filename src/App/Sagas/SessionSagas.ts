import axios from 'axios'
import { call, put, all } from 'redux-saga/effects'

import EquipmentActions from '../Redux/EquipmentRedux'
import CustomerActions from '../Redux/CustomerRedux'
import ProjectActions from '../Redux/ProjectRedux'
import SessionActions from '../Redux/SessionRedux'
import SiteActions from '../Redux/SiteRedux'
import UserActions from '../Redux/UserRedux'
import WorkspaceActions from '../Redux/WorkspaceRedux'

import { watchRefreshTokens } from '../Sagas'

export function* login(
  api: any,
  { email, password }: { email: string; password: string },
) {
  const response = yield call(api.login, email, password)

  if (response.ok) {
    // subsequent site visits will instantiate the api with auth header from localStorage
    localStorage.setItem('user', response.data.token)

    // remainder of current site visit will use headers set on the line below
    yield call(api.api.setHeaders, {
      Authorization: `Bearer ${response.data.token}`,
    })

    // auth token also stored in persisted redux store, for auth checks
    yield put(SessionActions.loginSuccess(response.data.token))
  } else {
    yield put(SessionActions.loginFailure('Failed to Login. Please retry'))
  }
}

export function* loginSuccess() {
  yield all([
    put(UserActions.loadUser()),
    put(ProjectActions.loadProjects()),
    put(SiteActions.loadSites()),
    put(EquipmentActions.loadEquipment()),
    put(CustomerActions.loadCustomers()),
    put(WorkspaceActions.loadWorkspace()),
    call(watchRefreshTokens),
  ])
}

export function* logout() {
  delete axios.defaults.headers.common['Authorization']
  localStorage.clear()
  yield [put(UserActions.removeUser()), put(SessionActions.logoutSuccess())]
}

export function* refreshToken(api: any) {
  const response = yield call(api.refreshToken)

  if (response.ok) {
    // subsequent site visits will instantiate the api with auth header from localStorage
    localStorage.setItem('user', response.data.token)

    // remainder of current site visit will use headers set on the line below
    yield call(api.api.setHeaders, {
      Authorization: `Bearer ${response.data.token}`,
    })

    // auth token also stored in persisted redux store, for auth checks
    yield put(SessionActions.refreshTokenSuccess(response.data.token))
  } else {
    return yield all([
      put(SessionActions.refreshTokenFailure('Failed to refresh token. Logging out...')),
      put(SessionActions.logout()),
    ])
  }
}
