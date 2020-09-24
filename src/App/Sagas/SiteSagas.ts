import { call, put } from 'redux-saga/effects'

import SiteActions, { ICreateSiteData } from '../Redux/SiteRedux'

export function* loadSites(api: any) {
  const response = yield call(api.loadSites)

  if (response.ok) {
    yield put(SiteActions.loadSitesSuccess(response.data.data))
  } else {
    yield put(SiteActions.loadSitesFailure("Failed to load user's sites."))
  }
}

export function* loadDetailedSites(api: any) {
  const response = yield call(api.loadDetailedSites)

  if (response.ok) {
    yield put(SiteActions.loadSitesSuccess(response.data.data))
  } else {
    yield put(SiteActions.loadSitesFailure("Failed to load user's detailed sites."))
  }
}

export function* createSite(api: any, { site }: { site: ICreateSiteData }) {
  const response = yield call(api.addSite, site)

  if (response.ok) {
    yield put(SiteActions.createSiteSuccess())
  } else {
    yield put(SiteActions.createSiteFailure('Failed to add site.'))
  }
}

export function* createSiteSuccess() {
  // adding a site from the ManageSites screen will pop back to ManageSites, which
  // requires detailed site data, so reload with details instead of default data
  yield put(SiteActions.loadDetailedSites())
}
