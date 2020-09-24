import { AnyAction } from 'redux'
import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { ISite } from './SiteRedux'
import { IEquipmentData } from './EquipmentRedux'

/* ------------- Types and Action Creators ------------- */
export interface IMapTypes {
  LOAD_MAP: 'LOAD_MAP'
  LOAD_MAP_SUCCESS: 'LOAD_MAP_SUCCESS'
  LOAD_MAP_FAILURE: 'LOAD_MAP_SUCCESS'
}

export interface ILoadMap extends AnyAction {
  type: IMapTypes['LOAD_MAP']
}

export interface ILoadMapSuccess extends AnyAction {
  type: IMapTypes['LOAD_MAP_SUCCESS']
  mapData: IMap
}

export interface ILoadMapFailure extends AnyAction {
  type: IMapTypes['LOAD_MAP_FAILURE']
  error: string
}

interface IMapActions {
  loadMap(siteID: number): ILoadMap
  loadMapSuccess(mapData: IMap): ILoadMapSuccess
  loadMapFailure(error: string): ILoadMapFailure
}

const { Types, Creators } = createActions<IMapActions, IMapTypes>({
  loadMap: ['siteID'],
  loadMapSuccess: ['mapData'],
  loadMapFailure: ['error'],
})

export const MapTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export interface IFetchStatus {
  fetching: boolean
  error: string | undefined
  method: string | undefined
}

export interface IWeather {
  temp: number | undefined
  status: string | undefined
}

export interface IMapData {
  site: ISite | {}
  weather: IWeather
  equipment: IEquipmentData[]
}

export interface IMap {
  site: ISite | {}
  weather: IWeather
  equipment: IEquipmentData[]
  fetchStatus: IFetchStatus
}

export type MapType = Immutable.Immutable<IMap>

export const INITIAL_STATE: MapType = Immutable({
  fetchStatus: {
    fetching: false,
    error: undefined,
    method: undefined,
  },
  site: {},
  weather: {
    temp: undefined,
    status: undefined,
  },
  equipment: [],
})

function resetFetchStatus(state: MapType) {
  return state.setIn(['fetchStatus'], INITIAL_STATE.fetchStatus)
}

function setFetchStatus(
  state: MapType,
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

export const loadMap = (state: MapType) => {
  return setFetchStatus(state, true, 'loadMap')
}

export const loadMapSuccess = (
  state: MapType,
  { mapData: { site, weather, equipment } }: { mapData: IMapData },
) => {
  let updatedState = resetFetchStatus(state)
  updatedState = updatedState.setIn(['site'], site)
  updatedState = updatedState.setIn(['weather'], weather)
  return updatedState.setIn(['equipment'], equipment)
}

export const loadMapFailure = (state: MapType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'loadMap', error)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [MapTypes.LOAD_MAP]: loadMap,
  [MapTypes.LOAD_MAP_SUCCESS]: loadMapSuccess,
  [MapTypes.LOAD_MAP_FAILURE]: loadMapFailure,
})
