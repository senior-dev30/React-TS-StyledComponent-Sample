import { AnyAction } from 'redux'
import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
export interface ISessionTypes {
  LOGIN: 'LOGIN'
  LOGIN_SUCCESS: 'LOGIN_SUCCESS'
  LOGIN_FAILURE: 'LOGIN_FAILURE'
  LOGOUT: 'LOGOUT'
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS'
  LOGOUT_FAILURE: 'LOGOUT_FAILURE'
  REFRESH_TOKEN: 'REFRESH_TOKEN'
  REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS'
  REFRESH_TOKEN_FAILURE: 'REFRESH_TOKEN_FAILURE'
}

export interface ILogin extends AnyAction {
  type: ISessionTypes['LOGIN']
  email: string
  password: string
}

export interface ILoginSuccess extends AnyAction {
  type: ISessionTypes['LOGIN_SUCCESS']
  token: IToken
}

export interface ILoginFailure extends AnyAction {
  type: ISessionTypes['LOGIN_FAILURE']
  error: string
  payload: {
    error: string
  }
}

export interface ILogout extends AnyAction {
  type: ISessionTypes['LOGOUT']
}

export interface ILogoutSuccess extends AnyAction {
  type: ISessionTypes['LOGOUT_SUCCESS']
}

export interface ILogoutFailure extends AnyAction {
  type: ISessionTypes['LOGOUT_FAILURE']
  error: string
}

export interface IRefreshToken extends AnyAction {
  type: ISessionTypes['REFRESH_TOKEN']
}

export interface IRefreshTokenSuccess extends AnyAction {
  type: ISessionTypes['REFRESH_TOKEN_SUCCESS']
}

export interface IRefreshTokenFailure extends AnyAction {
  type: ISessionTypes['REFRESH_TOKEN_FAILURE']
  error: string
}

interface ISessionActions {
  login(email: string, password: string): ILogin
  loginSuccess(token: IToken): ILoginSuccess
  loginFailure(error: string): ILoginFailure
  logout(): ILogout
  logoutSuccess(): ILoginSuccess
  logoutFailure(error: string): ILogoutFailure
  refreshToken(): IRefreshToken
  refreshTokenSuccess(token: IToken): IRefreshTokenSuccess
  refreshTokenFailure(error: string): IRefreshTokenFailure
}

const { Types, Creators } = createActions<ISessionActions, ISessionTypes>({
  login: ['email', 'password'],
  loginSuccess: ['token'],
  loginFailure: ['error'],
  logout: null,
  logoutSuccess: null,
  logoutFailure: ['error'],
  refreshToken: null,
  refreshTokenSuccess: ['token'],
  refreshTokenFailure: ['error'],
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */
interface IFetchStatus {
  fetching: boolean
  error: string | undefined
  method: string | undefined
}

export interface IToken {
  value: string
}

interface ISession {
  fetchStatus: IFetchStatus
  token: IToken | undefined
  count: number
}

export type SessionType = Immutable.Immutable<ISession>

export const INITIAL_STATE: SessionType = Immutable({
  fetchStatus: {
    fetching: false,
    error: undefined,
    method: undefined,
  },
  token: undefined,
  count: 0,
})

function resetFetchStatus(state: SessionType) {
  return state.setIn(['fetchStatus'], INITIAL_STATE.fetchStatus)
}

function setFetchStatus(
  state: SessionType,
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

export const login = (state: SessionType): SessionType => {
  return setFetchStatus(state, true, 'login')
}

export const loginSuccess = (
  state: SessionType,
  { token }: { token: IToken },
): SessionType => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['token'], token)
}

export const loginFailure = (
  state: SessionType,
  { error }: { error: string },
): SessionType => {
  return setFetchStatus(state, false, 'login', error)
}

export const logout = (state: SessionType): SessionType => {
  return setFetchStatus(state, true, 'logout')
}

export const logoutSuccess = (state: SessionType): SessionType => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['token'], undefined)
}

export const logoutFailure = (
  state: SessionType,
  { error }: { error: string },
): SessionType => {
  return setFetchStatus(state, false, 'logout', error)
}

export const refreshToken = (state: SessionType): SessionType => {
  return setFetchStatus(state, true, 'refreshToken')
}

export const refreshTokenSuccess = (
  state: SessionType,
  { token }: { token: IToken },
): SessionType => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['token'], token)
}

export const refreshTokenFailure = (
  state: SessionType,
  { error }: { error: string },
): SessionType => {
  return setFetchStatus(state, false, 'logout', error)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [SessionTypes.LOGIN]: login,
  [SessionTypes.LOGIN_SUCCESS]: loginSuccess,
  [SessionTypes.LOGIN_FAILURE]: loginFailure,
  [SessionTypes.LOGOUT]: logout,
  [SessionTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [SessionTypes.LOGOUT_FAILURE]: logoutFailure,
})
