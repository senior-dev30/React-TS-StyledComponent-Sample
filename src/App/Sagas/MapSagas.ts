import { call, put } from 'redux-saga/effects'

import MapActions from '../Redux/MapRedux'

export function* loadMap(api: any, { siteID }: { siteID: string }) {
  const response = yield call(api.loadMap, siteID)

  if (response.ok) {
    yield put(MapActions.loadMapSuccess(response.data.data))
  } else {
    yield put(MapActions.loadMapFailure('Failed to load analytics.'))
  }
}
