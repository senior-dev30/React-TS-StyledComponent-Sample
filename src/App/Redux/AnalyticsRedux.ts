import { AnyAction } from 'redux'
import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
export interface IAnalyticsTypes {
  LOAD_ANALYTICS: 'LOAD_ANALYTICS'
  LOAD_ANALYTICS_SUCCESS: 'LOAD_ANALYTICS_SUCCESS'
  LOAD_ANALYTICS_FAILURE: 'LOAD_ANALYTICS_SUCCESS'
  UPDATE_KPIS: 'UPDATE_KPIS'
  UPDATE_KPIS_SUCCESS: 'UPDATE_KPIS_SUCCESS'
  UPDATE_KPIS_FAILURE: 'UPDATE_KPIS_FAILURE'
}

export interface ILoadAnalytics extends AnyAction {
  type: IAnalyticsTypes['LOAD_ANALYTICS']
  dateFrom: string
  dateTo: string
  projects: number[]
  sites: number[]
}

export interface ILoadAnalyticsSuccess extends AnyAction {
  type: IAnalyticsTypes['LOAD_ANALYTICS_SUCCESS']
  reports: IAnalyticsReports
}

export interface ILoadAnalyticsFailure extends AnyAction {
  type: IAnalyticsTypes['LOAD_ANALYTICS_FAILURE']
  error: string
}

export interface IUpdateKpis extends AnyAction {
  type: IAnalyticsTypes['UPDATE_KPIS']
  dateFrom: string
  dateTo: string
  projects: number[]
  sites: number[]
  kpis: string[]
}

export interface IUpdateKpisSuccess extends AnyAction {
  type: IAnalyticsTypes['UPDATE_KPIS_SUCCESS']
  reports: IAnalyticsReports
}

export interface IUpdateKpisFailure extends AnyAction {
  type: IAnalyticsTypes['UPDATE_KPIS_FAILURE']
  error: string
}

interface IAnalyticsActions {
  loadAnalytics(
    dateFrom: string,
    dateTo: string,
    projects: number[],
    sites: number[],
    customers: number[],
  ): ILoadAnalytics
  loadAnalyticsSuccess(reports: IAnalyticsReports): ILoadAnalyticsSuccess
  loadAnalyticsFailure(error: string): ILoadAnalyticsFailure
  updateKpis(
    dateFrom: string,
    dateTo: string,
    projects: number[],
    sites: number[],
    kpis: string[],
  ): IUpdateKpis
  updateKpisSuccess(reports: IAnalyticsReports): IUpdateKpisSuccess
  updateKpisFailure(error: string): IUpdateKpisFailure
}

const { Types, Creators } = createActions<IAnalyticsActions, IAnalyticsTypes>({
  loadAnalytics: ['dateFrom', 'dateTo', 'projects', 'sites', 'customers'],
  loadAnalyticsSuccess: ['reports'],
  loadAnalyticsFailure: ['error'],
  updateKpis: ['dateFrom', 'dateTo', 'projects', 'sites', 'kpis'],
  updateKpisSuccess: ['reports'],
  updateKpisFailure: ['error'],
})

export const AnalyticsTypes = Types
export default Creators

/* ------------- Initial State ------------- */
interface IFetchStatus {
  fetching: boolean
  error: string | undefined
  method: string | undefined
}

export interface IAnalyticsReport {
  [key: string]: string | number | boolean | IAnalyticsReport
}

export interface IAnalyticsReports {
  co2Emissions: IAnalyticsReport
  equipmentPerformance: IAnalyticsReport
  fuelConsumption: IAnalyticsReport
  fuelSpendByEquipment: IAnalyticsReport
  fuelSpendBySite: IAnalyticsReport
  operationScoreboard: IAnalyticsReport
  workingHours: IAnalyticsReport
}

interface IAnalytics {
  reports: IAnalyticsReports
  fetchStatus: IFetchStatus
}

export type AnalyticsType = Immutable.Immutable<IAnalytics>

export const INITIAL_STATE: AnalyticsType = Immutable({
  fetchStatus: {
    fetching: false,
    error: undefined,
    method: undefined,
  },
  reports: {
    co2Emissions: {},
    equipmentPerformance: {},
    fuelConsumption: {},
    fuelSpendByEquipment: {},
    fuelSpendBySite: {},
    operationScoreboard: {},
    workingHours: {},
  },
})

function resetFetchStatus(state: AnalyticsType) {
  return state.setIn(['fetchStatus'], INITIAL_STATE.fetchStatus)
}

function setFetchStatus(
  state: AnalyticsType,
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

export const loadAnalytics = (state: AnalyticsType) => {
  return setFetchStatus(state, true, 'loadAnalyticsa')
}

export const loadAnalyticsSuccess = (
  state: AnalyticsType,
  { reports }: { reports: IAnalyticsReports },
) => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['reports'], reports)
}

export const loadAnalyticsFailure = (
  state: AnalyticsType,
  { error }: { error: string },
) => {
  return setFetchStatus(state, false, 'loadAnalytics', error)
}

export const updateKpis = (state: AnalyticsType) => {
  return setFetchStatus(state, true, 'updateKpis')
}

export const updateKpisSuccess = (
  state: AnalyticsType,
  { reports }: { reports: IAnalyticsReports },
) => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['reports'], reports)
}

export const updateKpisFailure = (state: AnalyticsType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'updateKpis', error)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [AnalyticsTypes.LOAD_ANALYTICS]: loadAnalytics,
  [AnalyticsTypes.LOAD_ANALYTICS_SUCCESS]: loadAnalyticsSuccess,
  [AnalyticsTypes.LOAD_ANALYTICS_FAILURE]: loadAnalyticsFailure,
  [AnalyticsTypes.UPDATE_KPIS]: updateKpis,
  [AnalyticsTypes.UPDATE_KPIS_SUCCESS]: updateKpisSuccess,
  [AnalyticsTypes.UPDATE_KPIS_FAILURE]: updateKpisFailure,
})
