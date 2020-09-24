import { call, put } from 'redux-saga/effects'

import AnalyticsActions from '../Redux/AnalyticsRedux'

export function* loadAnalytics(
  api: any,
  {
    dateFrom,
    dateTo,
    projects,
    sites,
    customers,
  }: {
    dateFrom: string
    dateTo: string
    projects: number[]
    sites: number[]
    customers: number[]
  },
) {
  const response = yield call(
    api.loadAnalytics,
    dateFrom,
    dateTo,
    projects,
    sites,
    customers,
  )

  if (response.ok) {
    yield put(AnalyticsActions.loadAnalyticsSuccess(response.data))
  } else {
    yield put(AnalyticsActions.loadAnalyticsFailure('Failed to load analytics.'))
  }
}

export function* updateKpis(
  api: any,
  {
    dateFrom,
    dateTo,
    projects,
    sites,
    kpis,
  }: {
    dateFrom: string
    dateTo: string
    projects: number[]
    sites: number[]
    kpis: string[]
  },
) {
  const response = yield call(api.loadAnalytics, dateFrom, dateTo, projects, sites, kpis)

  if (response.ok) {
    yield put(AnalyticsActions.updateKpisSuccess(response.data))
  } else {
    yield put(AnalyticsActions.updateKpisFailure('Failed to update kpis.'))
  }
}
