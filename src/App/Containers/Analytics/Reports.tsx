import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Grid } from '../../Components/Global/'
import {
  PageContainer,
  PageTitleRow,
  PageTitle,
  PageTitleRowButton,
} from '../../Components/Global/Page'
import { AddReports, CustomizeReport, ReportCard } from '../../Components/Reports'

import ReportActions, { ReportType, ImmutableIReportArray } from '../../Redux/ReportRedux'

//types
interface MapStateTypes {
  reports: ReportType
}

interface MapPropsTypes {
  reports: ImmutableIReportArray
}

interface ReportProps {
  loadReports(): any
  deleteReport(reportID: number): void
  downloadReport(reportID: number): void
}

const Reports = ({
  reports,
  loadReports,
  deleteReport,
  downloadReport,
}: ReportProps & MapPropsTypes) => {
  // Customize modal state logic
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false)
  const closeCustomizeModal = () => {
    setCategory('')
    setCustomizeModalOpen(false)
  }

  // AddReport modal state logic
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [category, setCategory] = useState('')
  const openAddModal = () => {
    setReportToCustomize(null)
    setAddModalOpen(true)
  }
  const closeAddModal = () => {
    setAddModalOpen(false)
  }
  const selectNewReport = (category: string) => {
    setCategory(category)
    closeAddModal()
    setCustomizeModalOpen(true)
  }

  // customize new/existing report state logic
  const [reportToCustomize, setReportToCustomize] = useState<number | null>(null)
  const handleCustomizeClick = (reportID: number) => {
    setReportToCustomize(reportID)
    setCustomizeModalOpen(true)
  }
  const report = reports.filter(report => reportToCustomize === report.reportID)[0] || {
    category,
  }

  //load reports
  useEffect(() => {
    if (!reports.length) loadReports()
  }, [])

  return (
    <PageContainer>
      {!addModalOpen && (
        <PageTitleRow>
          <PageTitle>Reports</PageTitle>
          <PageTitleRowButton onClick={openAddModal}>Add Report</PageTitleRowButton>
        </PageTitleRow>
      )}
      {!addModalOpen && (
        <Grid columns={3} padding={'20px 5px'}>
          {reports.map(report => (
            <ReportCard
              key={report.reportID}
              report={report}
              downloadReport={downloadReport}
              deleteReport={deleteReport}
              onClickCustomize={handleCustomizeClick}
            />
          ))}
        </Grid>
      )}
      {addModalOpen && (
        <AddReports onClickClose={closeAddModal} onClickAdd={selectNewReport} />
      )}
      {customizeModalOpen && (
        <CustomizeReport
          isOpen={customizeModalOpen}
          onRequestClose={closeCustomizeModal}
          report={report}
        />
      )}
    </PageContainer>
  )
}

const mapState = ({ reports }: MapStateTypes): MapPropsTypes => ({
  reports: reports.entities,
})

const mapDispatch = (dispatch: any) => ({
  loadReports: () => dispatch(ReportActions.loadReports()),
  deleteReport: (reportID: number) => dispatch(ReportActions.deleteReport(reportID)),
  downloadReport: (reportID: number) => dispatch(ReportActions.downloadReport(reportID)),
})

export default connect(
  mapState,
  mapDispatch,
)(Reports)
