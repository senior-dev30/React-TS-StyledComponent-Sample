import { AnyAction } from 'redux'
import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
export interface IUserTypes {
  LOAD_USER: 'LOAD_USER'
  LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS'
  LOAD_USER_FAILURE: 'LOAD_USER_FAILURE'
  REMOVE_USER: 'REMOVE_USER'
  REMOVE_USER_SUCCESS: 'REMOVE_USER_SUCCESS'
  REMOVE_USER_FAILURE: 'REMOVE_USER_FAILURE'
}

export interface ILoadUser extends AnyAction {
  type: IUserTypes['LOAD_USER']
}

export interface ILoadUserSuccess extends AnyAction {
  type: IUserTypes['LOAD_USER']
  user: IUser
}

export interface ILoadUserFailure extends AnyAction {
  type: IUserTypes['LOAD_USER_FAILURE']
  error: string
}

export interface IRemoveUser extends AnyAction {
  type: IUserTypes['REMOVE_USER']
}

export interface IRemoveUserSuccess extends AnyAction {
  type: IUserTypes['REMOVE_USER']
}

export interface IRemoveUserFailure extends AnyAction {
  type: IUserTypes['REMOVE_USER_FAILURE']
  error: string
}

interface IUserActions {
  loadUser(): ILoadUser
  loadUserSuccess(user: IUserData): ILoadUserSuccess
  loadUserFailure(error: string): ILoadUserSuccess
  removeUser(): IRemoveUser
  removeUserSuccess(): IRemoveUserSuccess
  removeUserFailure(error: string): IRemoveUserSuccess
}

const { Types, Creators } = createActions<IUserActions, IUserTypes>({
  loadUser: null,
  loadUserSuccess: ['user'],
  loadUserFailure: ['error'],
  removeUser: null,
  removeUserSuccess: null,
  removeUserFailure: ['error'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */
interface IFetchStatus {
  fetching: boolean
  error: string | undefined
  method: string | undefined
}

export interface IUserData {
  [key: string]: string | number
}

interface IUser {
  fetchStatus: IFetchStatus
  user: IUserData | undefined
}

export type UserType = Immutable.Immutable<IUser>

export const INITIAL_STATE: UserType = Immutable({
  fetchStatus: {
    fetching: false,
    error: undefined,
    method: undefined,
  },
  user: undefined,
})

function resetFetchStatus(state: UserType) {
  return state.setIn(['fetchStatus'], INITIAL_STATE.fetchStatus)
}

function setFetchStatus(
  state: UserType,
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

export const loadUser = (state: UserType) => {
  return setFetchStatus(state, true, 'loadUser')
}

export const loadUserSuccess = (state: UserType, { user }: { user: IUser }) => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['user'], user)
}

export const loadUserFailure = (state: UserType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'loadUser', error)
}

export const removeUser = (state: UserType) => {
  return setFetchStatus(state, true, 'removeUser')
}

export const removeUserSuccess = (state: UserType) => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['user'], undefined)
}

export const removeUserFailure = (state: UserType, { error }: { error: string }) => {
  return setFetchStatus(state, false, 'removeUser', error)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [UserTypes.LOAD_USER]: loadUser,
  [UserTypes.LOAD_USER_SUCCESS]: loadUserSuccess,
  [UserTypes.LOAD_USER_FAILURE]: loadUserFailure,
  [UserTypes.REMOVE_USER]: removeUser,
  [UserTypes.REMOVE_USER_SUCCESS]: removeUserSuccess,
  [UserTypes.REMOVE_USER_FAILURE]: removeUserFailure,
})
