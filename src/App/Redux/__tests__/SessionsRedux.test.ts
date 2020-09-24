import configureStore from 'redux-mock-store'

import SessionActions, {
  INITIAL_STATE,
  IToken,
  reducer,
  SessionTypes,
} from '../SessionRedux'

const mockStore = configureStore()
const store = mockStore()

const dummyToken: IToken = {
  value: 'string',
}

describe('Session actions', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions()
  })

  test('login', () => {
    store.dispatch(SessionActions.login('identifier', 'password'))
    expect(store.getActions()).toMatchSnapshot()
  })

  test('loginSuccess', () => {
    store.dispatch(SessionActions.loginSuccess(dummyToken))
    expect(store.getActions()).toMatchSnapshot()
  })

  test('loginFailure', () => {
    store.dispatch(SessionActions.loginFailure('loginFailure error message'))
    expect(store.getActions()).toMatchSnapshot()
  })

  test('logout', () => {
    store.dispatch(SessionActions.logout(dummyToken))
    expect(store.getActions()).toMatchSnapshot()
  })

  test('logoutSuccess', () => {
    store.dispatch(SessionActions.logoutSuccess())
    expect(store.getActions()).toMatchSnapshot()
  })

  test('logoutFailure', () => {
    store.dispatch(SessionActions.logoutFailure('logoutFailure error message'))
    expect(store.getActions()).toMatchSnapshot()
  })
})

describe('Session Reducer', () => {
  test('initial state', () => {
    const action = { type: 'DUMMY_ACTION' }
    expect(reducer(undefined, action)).toEqual(INITIAL_STATE)
  })

  test('returns correct state on login request', () => {
    const action = {
      type: SessionTypes.LOGIN,
    }
    const expectedState = INITIAL_STATE.setIn(['fetchStatus'], {
      fetching: true,
      error: undefined,
      method: 'login',
    })
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on login success', () => {
    const action = {
      type: SessionTypes.LOGIN_SUCCESS,
      token: dummyToken,
    }
    const expectedState = INITIAL_STATE.setIn(['token'], dummyToken)
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on login failure', () => {
    const action = {
      type: SessionTypes.LOGIN_FAILURE,
      error: 'Login Failure error',
    }
    const expectedState = INITIAL_STATE.setIn(['fetchStatus'], {
      fetching: false,
      error: action.error,
      method: 'login',
    })
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on logout request', () => {
    const action = {
      type: SessionTypes.LOGOUT,
    }
    const expectedState = INITIAL_STATE.setIn(['fetchStatus'], {
      fetching: true,
      error: undefined,
      method: 'logout',
    })
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on logout success', () => {
    const action = {
      type: SessionTypes.LOGOUT_SUCCESS,
      token: dummyToken,
    }
    const expectedState = INITIAL_STATE.setIn(['token'], undefined)
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  test('returns correct state on logout failure', () => {
    const action = {
      type: SessionTypes.LOGOUT_FAILURE,
      error: 'Logout Failure error',
    }
    const expectedState = INITIAL_STATE.setIn(['fetchStatus'], {
      fetching: false,
      error: action.error,
      method: 'logout',
    })
    expect(reducer(undefined, action)).toEqual(expectedState)
  })
})
