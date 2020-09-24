import { ActionCreators, createActions } from 'reduxsauce'

export const enum Types {
  APP_START = 'APP_START',
}

interface C extends ActionCreators {
  appStart: () => { type: Types.APP_START }
}

const CreatedActions = createActions({
  appStart: null,
})

export const Creators = CreatedActions.Creators as C
