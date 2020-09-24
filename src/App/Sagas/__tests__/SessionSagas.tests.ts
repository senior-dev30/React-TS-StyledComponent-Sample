import { expectSaga } from 'redux-saga-test-plan'

import SessionActions, { IToken, SessionTypes } from '../../Redux/SessionRedux'
import { login } from '../SessionSagas'

const dummyToken: IToken = {
  value: 'string',
}
const dispatchAction = SessionActions.login('username', 'password')

describe('Session sagas', () => {
  test('login success', () => {
    const api = {
      login: () => {
        return {
          ok: true,
          data: {
            token: dummyToken,
          },
        }
      },
    }

    return expectSaga(login, api, dispatchAction)
      .put({
        type: SessionTypes.LOGIN_SUCCESS,
        token: dummyToken,
      })
      .run()
  })

  test('login failure', () => {
    const api = {
      login: () => {
        return {
          ok: false,
        }
      },
    }

    return expectSaga(login, api, dispatchAction)
      .put({
        type: SessionTypes.LOGIN_FAILURE,
        error: 'Failed to Login. Please retry',
      })
      .run()
  })
})
