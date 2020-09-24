import { AnyAction } from 'redux'
import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
export interface IProjectTypes {
  LOAD_PROJECTS: 'LOAD_PROJECTS'
  LOAD_PROJECTS_SUCCESS: 'LOAD_PROJECTS_SUCCESS'
  LOAD_PROJECTS_FAILURE: 'LOAD_PROJECTS_SUCCESS'
  ADD_PROJECT: 'ADD_PROJECT'
  ADD_PROJECT_SUCCESS: 'ADD_PROJECT_SUCCESS'
  ADD_PROJECT_FAILURE: 'ADD_PROJECT_SUCCESS'
  UPDATE_PROJECT_SITES: 'UPDATE_PROJECT_SITES'
  UPDATE_PROJECT_SITES_SUCCESS: 'UPDATE_PROJECT_SITES_SUCCESS'
  UPDATE_PROJECT_SITES_FAILURE: 'UPDATE_PROJECT_SITES_FAILURE'
}

export interface ILoadProjects extends AnyAction {
  type: IProjectTypes['LOAD_PROJECTS']
}

export interface ILoadProjectsSuccess extends AnyAction {
  type: IProjectTypes['LOAD_PROJECTS_SUCCESS']
  entities: IProject[]
}

export interface ILoadProjectsFailure extends AnyAction {
  type: IProjectTypes['LOAD_PROJECTS_SUCCESS']
  error: string
}

export interface IAddProject extends AnyAction {
  type: IProjectTypes['ADD_PROJECT']
  project: ICreateProjectData
}

export interface IAddProjectSuccess extends AnyAction {
  type: IProjectTypes['ADD_PROJECT_SUCCESS']
}

export interface IAddProjectFailure extends AnyAction {
  type: IProjectTypes['ADD_PROJECT_SUCCESS']
  error: string
}

export interface IUpdateProjectSites extends AnyAction {
  type: IProjectTypes['UPDATE_PROJECT_SITES']
  sites: number[]
}

export interface IUpdateProjectSitesSuccess extends AnyAction {
  type: IProjectTypes['UPDATE_PROJECT_SITES_SUCCESS']
}

export interface IUpdateProjectSitesFailure extends AnyAction {
  type: IProjectTypes['UPDATE_PROJECT_SITES_FAILURE']
  error: string
}

interface IProjectActions {
  loadProjects(): ILoadProjects
  loadProjectsSuccess(entities: IProject[]): ILoadProjectsSuccess
  loadProjectsFailure(error: string): ILoadProjectsFailure
  addProject(project: ICreateProjectData): IAddProject
  addProjectSuccess(): IAddProjectSuccess
  addProjectFailure(error: string): IAddProjectFailure
  updateProjectSites(projectID: number, sites: number[]): IUpdateProjectSites
  updateProjectSitesSuccess(): IUpdateProjectSitesSuccess
  updateProjectSitesFailure(error: string): IUpdateProjectSitesFailure
}

const { Types, Creators } = createActions<IProjectActions, IProjectTypes>({
  loadProjects: null,
  loadProjectsSuccess: ['entities'],
  loadProjectsFailure: ['error'],
  addProject: ['project'],
  addProjectSuccess: null,
  addProjectFailure: ['error'],
  updateProjectSites: ['projectID', 'sites'],
  updateProjectSitesSuccess: null,
  updateProjectSitesFailure: ['error'],
})

export const ProjectTypes = Types
export default Creators

/* ------------- Initial State ------------- */

interface IFetchStatus {
  fetching: boolean
  error: string | undefined
  method: string | undefined
}

export interface ICreateProjectData {
  name: string
  sites: number[]
}

export interface IProject {
  projectID: number
  name: string
  [key: string]: string | number
}

interface IProjects {
  fetchStatus: IFetchStatus
  entities: IProject[]
}

export type ProjectType = Immutable.Immutable<IProjects>
export type ImmutableIProjectArray = Immutable.Immutable<IProject[]>

export const INITIAL_STATE: ProjectType = Immutable({
  fetchStatus: {
    fetching: false,
    error: undefined,
    method: undefined,
  },
  entities: [],
})

function resetFetchStatus(state: ProjectType) {
  return state.setIn(['fetchStatus'], INITIAL_STATE.fetchStatus)
}

function setFetchStatus(
  state: ProjectType,
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

export const loadProjects = (state: ProjectType) => {
  return setFetchStatus(state, true, 'loadProjects')
}

export const loadProjectsSuccess = (
  state: ProjectType,
  { entities }: { entities: IProjects[] },
) => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['entities'], entities)
}

export const loadProjectsFailure = (state: ProjectType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'loadProjects', error)
}

export const addProject = (state: ProjectType) => {
  return setFetchStatus(state, true, 'addProject')
}

export const addProjectSuccess = (state: ProjectType) => {
  return resetFetchStatus(state)
}

export const addProjectFailure = (state: ProjectType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'addProject', error)
}

export const updateProjectSites = (state: ProjectType) => {
  return setFetchStatus(state, true, 'updateProjectSites')
}

export const updateProjectSitesSuccess = (state: ProjectType) => {
  return resetFetchStatus(state)
}

export const updateProjectSitesFailure = (
  state: ProjectType,
  { error }: { error: string },
) => {
  return setFetchStatus(state, false, 'updateProjectSites', error)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [ProjectTypes.LOAD_PROJECTS]: loadProjects,
  [ProjectTypes.LOAD_PROJECTS_SUCCESS]: loadProjectsSuccess,
  [ProjectTypes.LOAD_PROJECTS_FAILURE]: loadProjectsFailure,
  [ProjectTypes.ADD_PROJECT]: addProject,
  [ProjectTypes.ADD_PROJECT_SUCCESS]: addProjectSuccess,
  [ProjectTypes.ADD_PROJECT_FAILURE]: addProjectFailure,
  [ProjectTypes.UPDATE_PROJECT_SITES]: updateProjectSites,
  [ProjectTypes.UPDATE_PROJECT_SITES_SUCCESS]: updateProjectSitesSuccess,
  [ProjectTypes.UPDATE_PROJECT_SITES_FAILURE]: updateProjectSitesFailure,
})
