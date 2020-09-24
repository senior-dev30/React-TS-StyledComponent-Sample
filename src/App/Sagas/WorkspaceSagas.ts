import { call, put } from 'redux-saga/effects'

import WorkspaceActions from '../Redux/WorkspaceRedux'

export function* loadWorkspace(api: any) {
  const response = yield call(api.loadWorkspace)

  if (response.ok) {
    yield put(WorkspaceActions.loadWorkspaceSuccess(response.data.data))
  } else {
    yield put(WorkspaceActions.loadWorkspaceFailure("Failed to load user's customers."))
  }
}
