import { AnyAction } from 'redux'
import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
export interface IEquipmentTypes {
  LOAD_EQUIPMENT: 'LOAD_EQUIPMENT'
  LOAD_EQUIPMENT_SUCCESS: 'LOAD_EQUIPMENT_SUCCESS'
  LOAD_EQUIPMENT_FAILURE: 'LOAD_EQUIPMENT_SUCCESS'
  LOAD_EQUIPMENT_DETAIL: 'LOAD_EQUIPMENT_DETAIL'
  LOAD_EQUIPMENT_DETAIL_SUCCESS: 'LOAD_EQUIPMENT_DETAIL_SUCCESS'
  LOAD_EQUIPMENT_DETAIL_FAILURE: 'LOAD_EQUIPMENT_DETAIL_FAILURE'
  REPORT_EQUIPMENT_ISSUE: 'REPORT_EQUIPMENT_ISSUE'
  REPORT_EQUIPMENT_ISSUE_SUCCESS: 'REPORT_EQUIPMENT_ISSUE_SUCCESS'
  REPORT_EQUIPMENT_ISSUE_FAILURE: 'REPORT_EQUIPMENT_ISSUE_FAILURE'
  ASSIGN_EQUIPMENT: 'ASSIGN_EQUIPMENT'
  ASSIGN_EQUIPMENT_SUCCESS: 'ASSIGN_EQUIPMENT_SUCCESS'
  ASSIGN_EQUIPMENT_FAILURE: 'ASSIGN_EQUIPMENT_FAILURE'
  UNASSIGN_EQUIPMENT: 'UNASSIGN_EQUIPMENT'
  UNASSIGN_EQUIPMENT_SUCCESS: 'UNASSIGN_EQUIPMENT_SUCCESS'
  UNASSIGN_EQUIPMENT_FAILURE: 'ASSIGN_EQUIPMENT_FAILURE'
}

export interface ILoadEquipment extends AnyAction {
  type: IEquipmentTypes['LOAD_EQUIPMENT']
}

export interface ILoadEquipmentSuccess extends AnyAction {
  type: IEquipmentTypes['LOAD_EQUIPMENT_SUCCESS']
  entities: IEquipment[]
}

export interface ILoadEquipmentFailure extends AnyAction {
  type: IEquipmentTypes['LOAD_EQUIPMENT_FAILURE']
  error: string
}

export interface ILoadEquipmentDetail extends AnyAction {
  type: IEquipmentTypes['LOAD_EQUIPMENT_DETAIL']
  equipmentID: number
}

export interface ILoadEquipmentDetailSuccess extends AnyAction {
  type: IEquipmentTypes['LOAD_EQUIPMENT_DETAIL_SUCCESS']
  equipment: IEquipmentData
}

export interface ILoadEquipmentDetailFailure extends AnyAction {
  type: IEquipmentTypes['LOAD_EQUIPMENT_DETAIL_FAILURE']
  error: string
}

export interface IReportEquipmentIssue extends AnyAction {
  type: IEquipmentTypes['REPORT_EQUIPMENT_ISSUE']
  issue: ICreateIssue
}

export interface IReportEquipmentIssueSuccess extends AnyAction {
  type: IEquipmentTypes['REPORT_EQUIPMENT_ISSUE_SUCCESS']
}

export interface IReportEquipmentIssueFailure extends AnyAction {
  type: IEquipmentTypes['REPORT_EQUIPMENT_ISSUE_FAILURE']
  error: string
}

export interface IAssignEquipment extends AnyAction {
  type: IEquipmentTypes['ASSIGN_EQUIPMENT']
  contract: IContractData
}

export interface IAssignEquipmentSuccess extends AnyAction {
  type: IEquipmentTypes['ASSIGN_EQUIPMENT_SUCCESS']
}

export interface IAssignEquipmentFailure extends AnyAction {
  type: IEquipmentTypes['ASSIGN_EQUIPMENT_FAILURE']
  error: string
}

export interface IUnassignEquipment extends AnyAction {
  type: IEquipmentTypes['UNASSIGN_EQUIPMENT']
  equipmentID: number
}

export interface IUnassignEquipmentSuccess extends AnyAction {
  type: IEquipmentTypes['UNASSIGN_EQUIPMENT_SUCCESS']
}

export interface IUnassignEquipmentFailure extends AnyAction {
  type: IEquipmentTypes['UNASSIGN_EQUIPMENT_FAILURE']
  error: string
}

interface IEquipmentActions {
  loadEquipment(): ILoadEquipment
  loadEquipmentSuccess(entities: IEquipment[]): ILoadEquipmentSuccess
  loadEquipmentFailure(error: string): ILoadEquipmentFailure
  loadEquipmentDetail(equipmentID: number): ILoadEquipmentDetail
  loadEquipmentDetailSuccess(equipment: IEquipment): ILoadEquipmentDetailSuccess
  loadEquipmentDetailFailure(error: string): ILoadEquipmentDetailFailure
  reportEquipmentIssue(issue: ICreateIssue): IReportEquipmentIssue
  reportEquipmentIssueSuccess(): IReportEquipmentIssueSuccess
  reportEquipmentIssueFailure(error: string): IReportEquipmentIssueFailure
  assignEquipment(contract: IContractData): IAssignEquipment
  assignEquipmentSuccess(): IAssignEquipmentSuccess
  assignEquipmentFailure(error: string): IAssignEquipmentFailure
  unassignEquipment(equipmentID: number): IUnassignEquipment
  unassignEquipmentSuccess(): IUnassignEquipmentSuccess
  unassignEquipmentFailure(error: string): IUnassignEquipmentFailure
}

const { Types, Creators } = createActions<IEquipmentActions, IEquipmentTypes>({
  loadEquipment: null,
  loadEquipmentSuccess: ['entities'],
  loadEquipmentFailure: ['error'],
  loadEquipmentDetail: ['equipmentID'],
  loadEquipmentDetailSuccess: ['equipment'],
  loadEquipmentDetailFailure: ['error'],
  reportEquipmentIssue: ['issue'],
  reportEquipmentIssueSuccess: null,
  reportEquipmentIssueFailure: ['error'],
  assignEquipment: ['contract'],
  assignEquipmentSuccess: null,
  assignEquipmentFailure: ['error'],
  unassignEquipment: ['equipmentID'],
  unassignEquipmentSuccess: null,
  unassignEquipmentFailure: ['error'],
})

export const EquipmentTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export interface IFetchStatus {
  fetching: boolean
  error: string | undefined
  method: string | undefined
}

export interface IContractData {
  projectID: number
  customerID: number
  equipmentID: number
  dateFrom: string
}

export interface IIssue {
  issueID: number
  equipmentID: number
  description: string
  errorCode: string
  impact: string
  author: string
  created_at: string
  updated_at: string
  [key: string]: string | number
}

export interface ICreateIssue {
  equipmentID: number
  description: string
  errorCode?: string
  impact: string
}

export interface IEquipmentData {
  equipmentID: number
  workspaceID?: number
  manufacturer: string
  serialNumber?: string
  modelName?: string
  category: string
  nativeID?: string
  plantNumber: string
  created_at?: string
  updated_at?: string
  owner?: string
  site: string
  fleet: string
  engineIdleTime?: number
  engineWorkingTime?: number
  engineOff?: number
  utilisation?: number | undefined
  latitude?: number | undefined
  longitude?: number | undefined
  lastUpdated?: string | undefined
  issues?: IIssue[]
  [key: string]: string | number | IIssue[] | undefined
}

interface IEquipment {
  fetchStatus: IFetchStatus
  entities: IEquipmentData[]
}

export type EquipmentType = Immutable.Immutable<IEquipment>
export type ImmutableIEquipmentArray = Immutable.Immutable<IEquipmentData[]>

export const INITIAL_STATE: EquipmentType = Immutable({
  fetchStatus: {
    fetching: false,
    error: undefined,
    method: undefined,
  },
  entities: [],
})

function resetFetchStatus(state: EquipmentType) {
  return state.setIn(['fetchStatus'], INITIAL_STATE.fetchStatus)
}

function setFetchStatus(
  state: EquipmentType,
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

export const loadEquipment = (state: EquipmentType) => {
  return setFetchStatus(state, true, 'loadEquipment')
}

export const loadEquipmentSuccess = (
  state: EquipmentType,
  { entities }: { entities: IEquipment[] },
) => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['entities'], entities)
}

export const loadEquipmentFailure = (
  state: EquipmentType,
  { error }: { error: string },
) => setFetchStatus(state, false, 'loadEquipment', error)

// single equipment, with additional fields
export const loadEquipmentDetail = (state: EquipmentType) => {
  return setFetchStatus(state, true, 'loadEquipmentDetail')
}

export const loadEquipmentDetailSuccess = (
  state: EquipmentType,
  { equipment }: { equipment: IEquipmentData },
) => {
  let updatedState = resetFetchStatus(state)

  // replace existing equipment object with the new one
  const objIdx = updatedState.entities.findIndex(
    item => item.equipmentID === equipment.equipmentID,
  )
  updatedState = updatedState.setIn(['entities', objIdx], equipment)
  return updatedState
}

export const loadEquipmentDetailFailure = (
  state: EquipmentType,
  { error }: { error: string },
) => setFetchStatus(state, false, 'loadEquipmentDetail', error)

export const reportEquipmentIssue = (state: EquipmentType) => {
  return setFetchStatus(state, true, 'reportEquipmentIssue')
}

export const reportEquipmentIssueSuccess = (state: EquipmentType) => {
  return resetFetchStatus(state)
}

export const reportEquipmentIssueFailure = (
  state: EquipmentType,
  { error }: { error: string },
) => setFetchStatus(state, false, 'reportEquipmentIssue', error)

export const assignEquipment = (state: EquipmentType) => {
  return setFetchStatus(state, true, 'assignEquipment')
}

export const assignEquipmentSuccess = (state: EquipmentType) => {
  return resetFetchStatus(state)
}

export const assignEquipmentFailure = (
  state: EquipmentType,
  { error }: { error: string },
) => setFetchStatus(state, false, 'assignEquipment', error)

export const unassignEquipment = (state: EquipmentType) => {
  return setFetchStatus(state, true, 'unassignEquipment')
}

export const unassignEquipmentSuccess = (state: EquipmentType) => {
  return resetFetchStatus(state)
}

export const unassignEquipmentFailure = (
  state: EquipmentType,
  { error }: { error: string },
) => setFetchStatus(state, false, 'unassignEquipment', error)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [EquipmentTypes.LOAD_EQUIPMENT]: loadEquipment,
  [EquipmentTypes.LOAD_EQUIPMENT_SUCCESS]: loadEquipmentSuccess,
  [EquipmentTypes.LOAD_EQUIPMENT_FAILURE]: loadEquipmentFailure,
  [EquipmentTypes.LOAD_EQUIPMENT_DETAIL]: loadEquipmentDetail,
  [EquipmentTypes.LOAD_EQUIPMENT_DETAIL_SUCCESS]: loadEquipmentDetailSuccess,
  [EquipmentTypes.LOAD_EQUIPMENT_DETAIL_FAILURE]: loadEquipmentDetailFailure,
  [EquipmentTypes.REPORT_EQUIPMENT_ISSUE]: reportEquipmentIssue,
  [EquipmentTypes.REPORT_EQUIPMENT_ISSUE_SUCCESS]: reportEquipmentIssueSuccess,
  [EquipmentTypes.REPORT_EQUIPMENT_ISSUE_FAILURE]: reportEquipmentIssueFailure,
  [EquipmentTypes.ASSIGN_EQUIPMENT]: assignEquipment,
  [EquipmentTypes.ASSIGN_EQUIPMENT_SUCCESS]: assignEquipmentSuccess,
  [EquipmentTypes.ASSIGN_EQUIPMENT_FAILURE]: assignEquipmentFailure,
  [EquipmentTypes.UNASSIGN_EQUIPMENT]: unassignEquipment,
  [EquipmentTypes.UNASSIGN_EQUIPMENT_SUCCESS]: unassignEquipmentSuccess,
  [EquipmentTypes.UNASSIGN_EQUIPMENT_FAILURE]: unassignEquipmentFailure,
})
