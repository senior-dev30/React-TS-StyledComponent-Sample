import { AnyAction } from 'redux'
import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
export interface ICustomerTypes {
  LOAD_CUSTOMERS: 'LOAD_CUSTOMERS'
  LOAD_CUSTOMERS_SUCCESS: 'LOAD_CUSTOMERS_SUCCESS'
  LOAD_CUSTOMERS_FAILURE: 'LOAD_CUSTOMERS_SUCCESS'
}

export interface ILoadCustomers extends AnyAction {
  type: ICustomerTypes['LOAD_CUSTOMERS']
}

export interface ILoadCustomersSuccess extends AnyAction {
  type: ICustomerTypes['LOAD_CUSTOMERS_SUCCESS']
  entities: ICustomer[]
}

export interface ILoadCustomersFailure extends AnyAction {
  type: ICustomerTypes['LOAD_CUSTOMERS_SUCCESS']
  error: string
}

interface ICustomerActions {
  loadCustomers(): ILoadCustomers
  loadCustomersSuccess(entities: ICustomer[]): ILoadCustomersSuccess
  loadCustomersFailure(error: string): ILoadCustomersFailure
}

const { Types, Creators } = createActions<ICustomerActions, ICustomerTypes>({
  loadCustomers: null,
  loadCustomersSuccess: ['entities'],
  loadCustomersFailure: ['error'],
})

export const CustomerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

interface IFetchStatus {
  fetching: boolean
  error: string | undefined
  method: string | undefined
}

export interface ICustomer {
  customerID: number
  name: string
}

interface ICustomers {
  fetchStatus: IFetchStatus
  entities: ICustomer[]
}

export type CustomerType = Immutable.Immutable<ICustomers>
export type ImmutableICustomerArray = Immutable.Immutable<ICustomer[]>

export const INITIAL_STATE: CustomerType = Immutable({
  fetchStatus: {
    fetching: false,
    error: undefined,
    method: undefined,
  },
  entities: [],
})

function resetFetchStatus(state: CustomerType) {
  return state.setIn(['fetchStatus'], INITIAL_STATE.fetchStatus)
}

function setFetchStatus(
  state: CustomerType,
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

export const loadCustomers = (state: CustomerType) => {
  return setFetchStatus(state, true, 'loadCustomers')
}

export const loadCustomersSuccess = (
  state: CustomerType,
  { entities }: { entities: ICustomers[] },
) => {
  const updatedState = resetFetchStatus(state)
  return updatedState.setIn(['entities'], entities)
}

export const loadCustomersFailure = (
  state: CustomerType,
  { error }: { error: string },
) => {
  return setFetchStatus(state, false, 'loadCustomers', error)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [CustomerTypes.LOAD_CUSTOMERS]: loadCustomers,
  [CustomerTypes.LOAD_CUSTOMERS_SUCCESS]: loadCustomersSuccess,
  [CustomerTypes.LOAD_CUSTOMERS_FAILURE]: loadCustomersFailure,
})
