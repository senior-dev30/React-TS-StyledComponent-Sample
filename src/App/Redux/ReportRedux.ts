import { AnyAction } from 'redux'
import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
export interface IReportTypes {
  LOAD_REPORTS: 'LOAD_REPORTS'
  LOAD_REPORTS_SUCCESS: 'LOAD_REPORTS_SUCCESS'
  LOAD_REPORTS_FAILURE: 'LOAD_REPORTS_SUCCESS'
  DOWNLOAD_REPORT: 'DOWNLOAD_REPORT'
  CREATE_REPORT: 'CREATE_REPORT'
  CREATE_REPORT_SUCCESS: 'CREATE_REPORT_SUCCESS'
  CREATE_REPORT_FAILURE: 'CREATE_REPORT_FAILURE'
  UPDATE_REPORT: 'UPDATE_REPORT'
  UPDATE_REPORT_SUCCESS: 'UPDATE_REPORT_SUCCESS'
  UPDATE_REPORT_FAILURE: 'UPDATE_REPORT_FAILURE'
  DELETE_REPORT: 'DELETE_REPORT'
  DELETE_REPORT_SUCCESS: 'DELETE_REPORT_SUCCESS'
  DELETE_REPORT_FAILURE: 'DELETE_REPORT_FAILURE'
}

export interface ILoadReports extends AnyAction {
  type: IReportTypes['LOAD_REPORTS']
}

export interface ILoadReportsSuccess extends AnyAction {
  type: IReportTypes['LOAD_REPORTS_SUCCESS']
  reports: IReports
}

export interface ILoadReportsFailure extends AnyAction {
  type: IReportTypes['LOAD_REPORTS_FAILURE']
  error: string
}

export interface ICreateReport extends AnyAction {
  type: IReportTypes['CREATE_REPORT']
  reportData: ICreateReportData
}

export interface ICreateReportSuccess extends AnyAction {
  type: IReportTypes['CREATE_REPORT_SUCCESS']
}

export interface ICreateReportFailure extends AnyAction {
  type: IReportTypes['CREATE_REPORT_FAILURE']
  error: string
}

export interface IUpdateReport extends AnyAction {
  type: IReportTypes['UPDATE_REPORT']
  reportID: number
  reportData: ICreateReportData
}

export interface IUpdateReportSuccess extends AnyAction {
  type: IReportTypes['UPDATE_REPORT_SUCCESS']
}

export interface IUpdateReportFailure extends AnyAction {
  type: IReportTypes['UPDATE_REPORT_FAILURE']
  error: string
}

export interface IDeleteReport extends AnyAction {
  type: IReportTypes['DELETE_REPORT']
  reportID: number
}

export interface IDeleteReportSuccess extends AnyAction {
  type: IReportTypes['DELETE_REPORT_SUCCESS']
}

export interface IDeleteReportFailure extends AnyAction {
  type: IReportTypes['DELETE_REPORT_FAILURE']
  error: string
}

export interface IDownloadReport extends AnyAction {
  type: IReportTypes['DOWNLOAD_REPORT']
}

interface IReportActions {
  // read
  loadReports(): ILoadReports
  loadReportsSuccess(reports: IReports): ILoadReportsSuccess
  loadReportsFailure(error: string): ILoadReportsFailure
  // create
  createReport(reportData: ICreateReportData): ICreateReport
  createReportSuccess(): ICreateReportSuccess
  createReportFailure(error: string): ICreateReportFailure
  // update
  updateReport(reportID: number, reportData: ICreateReportData): IUpdateReport
  updateReportSuccess(): IUpdateReportSuccess
  updateReportFailure(error: string): IUpdateReportFailure
  // delete
  deleteReport(reportID: number): IDeleteReport
  deleteReportSuccess(): IDeleteReportSuccess
  deleteReportFailure(error: string): IDeleteReportFailure
  // misc
  downloadReport(reportID: number): IDownloadReport
}

const { Types, Creators } = createActions<IReportActions, IReportTypes>({
  loadReports: null,
  loadReportsSuccess: ['reports'],
  loadReportsFailure: ['error'],
  createReport: ['reportData'],
  createReportSuccess: null,
  createReportFailure: ['error'],
  updateReport: ['reportID', 'reportData'],
  updateReportSuccess: null,
  updateReportFailure: ['error'],
  deleteReport: ['reportID'],
  deleteReportSuccess: null,
  deleteReportFailure: ['error'],
  downloadReport: ['reportID'],
})

export const ReportTypes = Types
export default Creators

/* ------------- Initial State ------------- */
interface IFetchStatus {
  fetching: boolean
  error: string | undefined
  method: string | undefined
}

export interface IChildReport {
  reportID: number
  dateFrom: string
  dateTo: string
}

export interface IReport {
  reportID: number
  name: string
  dateFrom: string
  dateTo: string
  image: string
  frequency?: string
  projects: number[]
  sites: number[]
  children: IChildReport[]
  [key: string]: string | number | boolean | number[] | IChildReport[] | undefined
}

export interface ICreateReportData {
  category?: string
  dateFrom: string
  dateTo?: string
  name: string
  image?: string
  projects: number[]
  sites: number[]
  scheduled?: boolean
  frequency?: string
  customers?: number[]
}

interface IReports {
  entities: IReport[]
  fetchStatus: IFetchStatus
}

export type ReportType = Immutable.Immutable<IReports>
export type ImmutableIReportArray = Immutable.Immutable<IReport[]>
export type ImmutableIChildReportArray = Immutable.Immutable<IChildReport[]>

export const INITIAL_STATE: ReportType = Immutable({
  fetchStatus: {
    fetching: false,
    error: undefined,
    method: undefined,
  },
  entities: [],
})

// fetch status helpers
function resetFetchStatus(state: ReportType) {
  return state.setIn(['fetchStatus'], INITIAL_STATE.fetchStatus)
}

function setFetchStatus(
  state: ReportType,
  fetching: boolean,
  method: string,
  error?: string,
) {
  return state.setIn(['fetchStatus'], {
    fetching,
    error,
    method,
  })
}

// read
export const loadReports = (state: ReportType) => {
  return setFetchStatus(state, true, 'loadReports')
}

export const loadReportsSuccess = (
  state: ReportType,
  { reports }: { reports: IReports },
) => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['entities'], reports)
}

export const loadReportsFailure = (state: ReportType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'loadReports', error)
}

// create
export const createReport = (state: ReportType) => {
  return setFetchStatus(state, true, 'createReport')
}

export const createReportSuccess = (state: ReportType) => {
  return resetFetchStatus(state)
}

export const createReportFailure = (state: ReportType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'createReport', error)
}

// update
export const updateReport = (state: ReportType) => {
  return setFetchStatus(state, true, 'updateReport')
}

export const updateReportSuccess = (state: ReportType) => {
  return resetFetchStatus(state)
}

export const updateReportFailure = (state: ReportType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'updateReport', error)
}

// delete
export const deleteReport = (state: ReportType) => {
  return setFetchStatus(state, true, 'deleteReport')
}

export const deleteReportSuccess = (state: ReportType) => {
  return resetFetchStatus(state)
}

export const deleteReportFailure = (state: ReportType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'deleteReport', error)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [ReportTypes.LOAD_REPORTS]: loadReports,
  [ReportTypes.LOAD_REPORTS_SUCCESS]: loadReportsSuccess,
  [ReportTypes.LOAD_REPORTS_FAILURE]: loadReportsFailure,
  [ReportTypes.DOWNLOAD_REPORT]: null,
  [ReportTypes.CREATE_REPORT]: createReport,
  [ReportTypes.CREATE_REPORT_SUCCESS]: createReportSuccess,
  [ReportTypes.CREATE_REPORT_FAILURE]: createReportFailure,
  [ReportTypes.UPDATE_REPORT]: updateReport,
  [ReportTypes.UPDATE_REPORT_SUCCESS]: updateReportSuccess,
  [ReportTypes.UPDATE_REPORT_FAILURE]: updateReportFailure,
  [ReportTypes.DELETE_REPORT]: deleteReport,
  [ReportTypes.DELETE_REPORT_SUCCESS]: deleteReportSuccess,
  [ReportTypes.DELETE_REPORT_FAILURE]: deleteReportFailure,
})
