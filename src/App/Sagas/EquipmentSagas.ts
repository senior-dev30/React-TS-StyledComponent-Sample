import { call, put, all } from 'redux-saga/effects'

import EquipmentActions, { ICreateIssue, IContractData } from '../Redux/EquipmentRedux'

export function* loadEquipment(api: any) {
  const response = yield call(api.loadEquipment)

  if (response.ok) {
    yield put(EquipmentActions.loadEquipmentSuccess(response.data.data))
  } else {
    yield put(EquipmentActions.loadEquipmentFailure("Failed to load user's equipment."))
  }
}

export function* loadEquipmentDetail(api: any, { equipmentID }: { equipmentID: number }) {
  const response = yield call(api.loadEquipmentDetail, equipmentID)

  if (response.ok) {
    yield put(EquipmentActions.loadEquipmentDetailSuccess(response.data.data))
  } else {
    yield put(
      EquipmentActions.loadEquipmentDetailFailure('Failed to load equipment detail.'),
    )
  }
}

export function* reportEquipmentIssue(api: any, { issue }: { issue: ICreateIssue }) {
  const response = yield call(api.reportEquipmentIssue, issue)

  if (response.ok) {
    yield all([
      put(EquipmentActions.reportEquipmentIssueSuccess()),
      put(EquipmentActions.loadEquipmentDetail(issue.equipmentID)),
    ])
  } else {
    yield put(EquipmentActions.reportEquipmentIssueFailure('Failed to create issue.'))
  }
}

export function* assignEquipment(api: any, { contract }: { contract: IContractData }) {
  const response = yield call(api.assignEquipment, contract)

  if (response.ok) {
    yield put(EquipmentActions.assignEquipmentSuccess())
  } else {
    yield put(EquipmentActions.assignEquipmentFailure('Failed to create contract.'))
  }
}

export function* assignEquipmentSuccess() {
  yield put(EquipmentActions.loadEquipment())
}

export function* unassignEquipment(api: any, { equipmentID }: { equipmentID: number }) {
  const response = yield call(api.unassignEquipment, { equipmentID })

  if (response.ok) {
    yield put(EquipmentActions.unassignEquipmentSuccess())
  } else {
    yield put(EquipmentActions.unassignEquipmentFailure('Failed to end contract.'))
  }
}

export function* unassignEquipmentSuccess() {
  yield put(EquipmentActions.loadEquipment())
}
