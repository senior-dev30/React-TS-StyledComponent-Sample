import { call, put } from 'redux-saga/effects'
import download from 'js-file-download'

import ReportActions, { ICreateReportData } from '../Redux/ReportRedux'

// read
export function* loadReports(api: any) {
  const response = yield call(api.loadReports)

  if (response.ok) {
    yield put(ReportActions.loadReportsSuccess(response.data.data))
  } else {
    yield put(ReportActions.loadReportsFailure("Failed to load user's saved reports."))
  }
}

// create
export function* createReport(
  api: any,
  { reportData }: { reportData: ICreateReportData },
) {
  const response = yield call(api.createReport, reportData)

  if (response.ok) {
    yield put(ReportActions.createReportSuccess())
  } else {
    yield put(ReportActions.createReportFailure('Failed to create report.'))
  }
}

export function* createReportSuccess() {
  yield put(ReportActions.loadReports())
}

// update
export function* updateReport(
  api: any,
  { reportID, reportData }: { reportID: number; reportData: ICreateReportData },
) {
  const response = yield call(api.updateReport, reportID, reportData)

  if (response.ok) {
    yield put(ReportActions.updateReportSuccess())
  } else {
    yield put(ReportActions.updateReportFailure('Failed to update report.'))
  }
}

export function* updateReportSuccess() {
  yield put(ReportActions.loadReports())
}

// delete
export function* deleteReport(api: any, { reportID }: { reportID: number }) {
  const response = yield call(api.deleteReport, reportID)

  if (response.ok) {
    yield put(ReportActions.deleteReportSuccess())
  } else {
    yield put(ReportActions.deleteReportFailure('Failed to delete report.'))
  }
}

export function* deleteReportSuccess() {
  yield put(ReportActions.loadReports())
}

// misc
export function* downloadReport(api: any, { reportID }: { reportID: number }) {
  const response = yield call(api.downloadReport, reportID)

  if (response.ok) {
    // generate title of report from content-disposition header
    let suggestedFileName = response.headers['content-disposition']
    let effectiveFileName = 'attachment; filename=Report.xlsx'
    if (suggestedFileName)
      suggestedFileName = suggestedFileName.split('attachment; filename=')
    if (suggestedFileName.constructor === Array && suggestedFileName.length === 2) {
      effectiveFileName = suggestedFileName[1]
    }

    // initiate browser file download
    download(response.data, effectiveFileName)
  }
}
