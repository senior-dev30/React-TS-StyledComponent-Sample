import { AnyAction } from 'redux'
import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
export interface ISiteTypes {
  LOAD_SITES: 'LOAD_SITES'
  LOAD_SITES_SUCCESS: 'LOAD_SITES_SUCCESS'
  LOAD_SITES_FAILURE: 'LOAD_SITES_SUCCESS'
  LOAD_DETAILED_SITES: 'LOAD_DETAILED_SITES'
  LOAD_DETAILED_SITES_SUCCESS: 'LOAD_DETAILED_SITES_SUCCESS'
  LOAD_DETAILED_SITES_FAILURE: 'LOAD_DETAILED_SITES_SUCCESS'
  CREATE_SITE: 'CREATE_SITE'
  CREATE_SITE_SUCCESS: 'CREATE_SITE_SUCCESS'
  CREATE_SITE_FAILURE: 'CREATE_SITE_FAILURE'
}

export interface ILoadSites extends AnyAction {
  type: ISiteTypes['LOAD_SITES']
}

export interface ILoadDetailedSites extends AnyAction {
  type: ISiteTypes['LOAD_DETAILED_SITES']
}

export interface ILoadSitesSuccess extends AnyAction {
  type: ISiteTypes['LOAD_SITES_SUCCESS']
  entities: ISite[]
}

export interface ILoadSitesFailure extends AnyAction {
  type: ISiteTypes['LOAD_SITES_SUCCESS']
  error: string
}

export interface ICreateSite extends AnyAction {
  type: ISiteTypes['CREATE_SITE']
  site: ICreateSiteData
}

export interface ICreateSiteSuccess extends AnyAction {
  type: ISiteTypes['CREATE_SITE_SUCCESS']
}

export interface ICreateSiteFailure extends AnyAction {
  type: ISiteTypes['CREATE_SITE_SUCCESS']
  error: string
}

interface ISiteActions {
  loadSites(): ILoadSites
  loadDetailedSites(): ILoadDetailedSites
  loadSitesSuccess(entities: ISite[]): ILoadSitesSuccess
  loadSitesFailure(error: string): ILoadSitesFailure
  createSite(site: ICreateSiteData): ICreateSite
  createSiteSuccess(): ICreateSiteSuccess
  createSiteFailure(error: string): ICreateSiteFailure
}

const { Types, Creators } = createActions<ISiteActions, ISiteTypes>({
  loadSites: null,
  loadDetailedSites: null,
  loadSitesSuccess: ['entities'],
  loadSitesFailure: ['error'],
  createSite: ['site'],
  createSiteSuccess: null,
  createSiteFailure: ['error'],
})

export const SiteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

interface IFetchStatus {
  fetching: boolean
  error: string | undefined
  method: string | undefined
}

export interface ICreateSiteData {
  name: string
  address: string
  projectID: number
  latitude: string
  longitude: string
  manager?: string
}

export interface ISite {
  siteID: number
  name: string
  workspaceID: number
  address: string
  created_at: string | null
  updated_at: string | null
  projectID: number
  sectionNumber: number | null
  latitude: string
  longitude: string
  manager: string
  [key: string]: string | number | null
}

interface ISites {
  fetchStatus: IFetchStatus
  entities: ISite[]
}

export type SiteType = Immutable.Immutable<ISites>
export type ImmutableISiteArray = Immutable.Immutable<ISite[]>

export const INITIAL_STATE: SiteType = Immutable({
  fetchStatus: {
    fetching: false,
    error: undefined,
    method: undefined,
  },
  entities: [],
})

function resetFetchStatus(state: SiteType) {
  return state.setIn(['fetchStatus'], INITIAL_STATE.fetchStatus)
}

function setFetchStatus(
  state: SiteType,
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

export const loadSites = (state: SiteType) => {
  return setFetchStatus(state, true, 'loadSites')
}

export const loadDetailedSites = (state: SiteType) => {
  return setFetchStatus(state, true, 'loadSites')
}

export const loadSitesSuccess = (
  state: SiteType,
  { entities }: { entities: ISites[] },
) => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['entities'], entities)
}

export const loadSitesFailure = (state: SiteType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'loadSites', error)
}

export const createSite = (state: SiteType) => {
  return setFetchStatus(state, true, 'createSite')
}

export const createSiteSuccess = (state: SiteType) => {
  return resetFetchStatus(state)
}

export const createSiteFailure = (state: SiteType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'createSite', error)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [SiteTypes.LOAD_SITES]: loadSites,
  [SiteTypes.LOAD_DETAILED_SITES]: loadDetailedSites,
  [SiteTypes.LOAD_SITES_SUCCESS]: loadSitesSuccess,
  [SiteTypes.LOAD_SITES_FAILURE]: loadSitesFailure,
  [SiteTypes.CREATE_SITE]: createSite,
  [SiteTypes.CREATE_SITE_SUCCESS]: createSiteSuccess,
  [SiteTypes.CREATE_SITE_FAILURE]: createSiteFailure,
})
