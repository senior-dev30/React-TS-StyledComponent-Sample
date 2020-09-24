// TODO - Work out better reduxsauce definitions
type END = { type: '@@redux-saga/CHANNEL_END' }
interface Channel<T> {
  take(cb: (message: T | END) => void): void
  put(message: T | END): void
  flush(): void
  close(): void
  type: string
}

declare module 'reduxsauce' {
  import { AnyAction, Reducer } from 'redux'

  export interface Actions {
    [action: string]: string[] | null
  }

  export interface ActionTypes {
    [action: string]: string
  }

  export interface ActionCreators {
    [action: string]: (...args: any[]) => AnyAction
  }

  export interface Handlers<S> {
    [type: string]: (state: S, action: AnyAction) => S
  }

  /**
   * Custom options for created types and actions
   *
   * prefix - prepend the string to all created types
   */
  interface Options {
    prefix: string
  }

  interface CreatedActions<T, U> {
    Types: U
    Creators: T
  }

  export function createReducer<S>(
    initialState: S,
    handlers: Handlers<S> | any,
  ): Reducer<S>
  export function createTypes(types: string, options?: Options): ActionTypes
  export function createActions<T, U>(
    actions: Actions,
    options?: Options,
  ): CreatedActions<T, U>
  export function createActions(
    actions: Actions,
    options?: Options,
  ): CreatedActions<ActionCreators, ActionTypes>
}
