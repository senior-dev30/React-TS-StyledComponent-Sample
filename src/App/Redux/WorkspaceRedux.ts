import { AnyAction } from 'redux'
import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
export interface IWorkspaceTypes {
  LOAD_WORKSPACE: 'LOAD_WORKSPACE'
  LOAD_WORKSPACE_SUCCESS: 'LOAD_WORKSPACE_SUCCESS'
  LOAD_WORKSPACE_FAILURE: 'LOAD_WORKSPACE_SUCCESS'
}

export interface ILoadWorkspace extends AnyAction {
  type: IWorkspaceTypes['LOAD_WORKSPACE']
}

export interface ILoadWorkspaceSuccess extends AnyAction {
  type: IWorkspaceTypes['LOAD_WORKSPACE_SUCCESS']
  workspace: IWorkspaceData
}

export interface ILoadWorkspaceFailure extends AnyAction {
  type: IWorkspaceTypes['LOAD_WORKSPACE_SUCCESS']
  error: string
}

interface IWorkspaceActions {
  loadWorkspace(): ILoadWorkspace
  loadWorkspaceSuccess(entities: IWorkspaceData[]): ILoadWorkspaceSuccess
  loadWorkspaceFailure(error: string): ILoadWorkspaceFailure
}

const { Types, Creators } = createActions<IWorkspaceActions, IWorkspaceTypes>({
  loadWorkspace: null,
  loadWorkspaceSuccess: ['workspace'],
  loadWorkspaceFailure: ['error'],
})

export const WorkspaceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

interface IFetchStatus {
  fetching: boolean
  error: string | undefined
  method: string | undefined
}

export interface IWorkspaceData {
  companyName: string
  companyType: string
  workpaceID: number
  createdAt: string
  updatedAt: string
}

interface IWorkspace {
  fetchStatus: IFetchStatus
  workspace: IWorkspaceData | undefined
}

export type WorkspaceType = Immutable.Immutable<IWorkspace>

export const INITIAL_STATE: WorkspaceType = Immutable({
  fetchStatus: {
    fetching: false,
    error: undefined,
    method: undefined,
  },
  workspace: undefined,
})

function resetFetchStatus(state: WorkspaceType) {
  return state.setIn(['fetchStatus'], INITIAL_STATE.fetchStatus)
}

function setFetchStatus(
  state: WorkspaceType,
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

export const loadWorkspace = (state: WorkspaceType) => {
  return setFetchStatus(state, true, 'loadWorkspace')
}

export const loadWorkspaceSuccess = (
  state: WorkspaceType,
  { workspace }: { workspace: IWorkspaceData },
) => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['workspace'], workspace)
}

export const loadWorkspaceFailure = (
  state: WorkspaceType,
  { error }: { error: string },
) => {
  return setFetchStatus(state, false, 'loadWorkspace', error)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [WorkspaceTypes.LOAD_WORKSPACE]: loadWorkspace,
  [WorkspaceTypes.LOAD_WORKSPACE_SUCCESS]: loadWorkspaceSuccess,
  [WorkspaceTypes.LOAD_WORKSPACE_FAILURE]: loadWorkspaceFailure,
})
