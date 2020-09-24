import { call, put } from 'redux-saga/effects'

import CustomerActions from '../Redux/CustomerRedux'

export function* loadCustomers(api: any) {
  const response = yield call(api.loadCustomers)

  if (response.ok) {
    yield put(CustomerActions.loadCustomersSuccess(response.data.data))
  } else {
    yield put(CustomerActions.loadCustomersFailure("Failed to load user's customers."))
  }
}
