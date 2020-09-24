import { delay } from 'redux-saga'
import { call, put, takeLatest, all } from 'redux-saga/effects'

import apiCreator from '../Services/api'

import { loadAnalytics, updateKpis } from './AnalyticsSagas'
import { loadCustomers } from './CustomerSagas'
import {
  loadEquipment,
  loadEquipmentDetail,
  reportEquipmentIssue,
  assignEquipment,
  assignEquipmentSuccess,
  unassignEquipment,
  unassignEquipmentSuccess,
} from './EquipmentSagas'
import { loadMap } from './MapSagas'
import {
  loadProjects,
  addProject,
  addProjectSuccess,
  updateProjectSites,
  updateProjectSitesSuccess,
} from './ProjectSagas'
import {
  loadReports,
  createReport,
  createReportSuccess,
  updateReport,
  updateReportSuccess,
  deleteReport,
  deleteReportSuccess,
  downloadReport,
} from './ReportSagas'
import { login, loginSuccess, logout, refreshToken } from './SessionSagas'
import { loadSites, loadDetailedSites, createSite, createSiteSuccess } from './SiteSagas'
import { loadUser, removeUser } from './UserSagas'
import { loadWorkspace } from './WorkspaceSagas'

/* ------------- Types ------------- */

import { AnalyticsTypes } from '../Redux/AnalyticsRedux'
import { CustomerTypes } from '../Redux/CustomerRedux'
import { EquipmentTypes } from '../Redux/EquipmentRedux'
import { MapTypes } from '../Redux/MapRedux'
import { ProjectTypes } from '../Redux/ProjectRedux'
import { ReportTypes } from '../Redux/ReportRedux'
import SessionActions, { SessionTypes } from '../Redux/SessionRedux'
import { SiteTypes } from '../Redux/SiteRedux'
import { UserTypes } from '../Redux/UserRedux'
import { WorkspaceTypes } from '../Redux/WorkspaceRedux'

/* ------------- API ------------- */

const api = new apiCreator()

/* ------------- Connect Types To Sagas ------------- */

function* pollRefreshTokens() {
  yield call(delay, 1000 * 60 * 98) // delay of 98 minutes (100 minute token expiry)
  yield put(SessionActions.refreshToken())
}

export function* watchRefreshTokens() {
  while (true) {
    yield call(pollRefreshTokens)
  }
}

function* resumeSession() {
  const token = localStorage.getItem('user')
  if (token) yield watchRefreshTokens()
}

export default function* root() {
  yield all([
    // Analytics
    takeLatest(AnalyticsTypes.LOAD_ANALYTICS, loadAnalytics, api),
    takeLatest(AnalyticsTypes.UPDATE_KPIS, updateKpis, api),

    // Customers
    takeLatest(CustomerTypes.LOAD_CUSTOMERS, loadCustomers, api),

    //Equipment
    takeLatest(EquipmentTypes.LOAD_EQUIPMENT, loadEquipment, api),
    takeLatest(EquipmentTypes.LOAD_EQUIPMENT_DETAIL, loadEquipmentDetail, api),
    takeLatest(EquipmentTypes.REPORT_EQUIPMENT_ISSUE, reportEquipmentIssue, api),
    takeLatest(EquipmentTypes.ASSIGN_EQUIPMENT, assignEquipment, api),
    takeLatest(EquipmentTypes.ASSIGN_EQUIPMENT_SUCCESS, assignEquipmentSuccess, api),
    takeLatest(EquipmentTypes.UNASSIGN_EQUIPMENT, unassignEquipment, api),
    takeLatest(EquipmentTypes.UNASSIGN_EQUIPMENT_SUCCESS, unassignEquipmentSuccess),

    // Map
    takeLatest(MapTypes.LOAD_MAP, loadMap, api),

    // Projects
    takeLatest(ProjectTypes.LOAD_PROJECTS, loadProjects, api),
    takeLatest(ProjectTypes.ADD_PROJECT, addProject, api),
    takeLatest(ProjectTypes.ADD_PROJECT_SUCCESS, addProjectSuccess),
    takeLatest(ProjectTypes.UPDATE_PROJECT_SITES, updateProjectSites, api),
    takeLatest(ProjectTypes.UPDATE_PROJECT_SITES_SUCCESS, updateProjectSitesSuccess),

    // Reports
    takeLatest(ReportTypes.LOAD_REPORTS, loadReports, api),
    takeLatest(ReportTypes.CREATE_REPORT, createReport, api),
    takeLatest(ReportTypes.CREATE_REPORT_SUCCESS, createReportSuccess),
    takeLatest(ReportTypes.UPDATE_REPORT, updateReport, api),
    takeLatest(ReportTypes.UPDATE_REPORT_SUCCESS, updateReportSuccess),
    takeLatest(ReportTypes.DELETE_REPORT, deleteReport, api),
    takeLatest(ReportTypes.DELETE_REPORT_SUCCESS, deleteReportSuccess),
    takeLatest(ReportTypes.DOWNLOAD_REPORT, downloadReport, api),

    // Session
    takeLatest(SessionTypes.LOGIN, login, api),
    takeLatest(SessionTypes.LOGIN_SUCCESS, loginSuccess),
    takeLatest(SessionTypes.LOGOUT, logout),
    takeLatest(SessionTypes.REFRESH_TOKEN, refreshToken, api),

    // Sites
    takeLatest(SiteTypes.LOAD_SITES, loadSites, api),
    takeLatest(SiteTypes.LOAD_DETAILED_SITES, loadDetailedSites, api),
    takeLatest(SiteTypes.CREATE_SITE, createSite, api),
    takeLatest(SiteTypes.CREATE_SITE_SUCCESS, createSiteSuccess),

    // User
    takeLatest(UserTypes.LOAD_USER, loadUser, api),
    takeLatest(UserTypes.REMOVE_USER, removeUser),

    // Workspace
    takeLatest(WorkspaceTypes.LOAD_WORKSPACE, loadWorkspace, api),

    // Auth Monitor
    resumeSession(),
  ])
}
