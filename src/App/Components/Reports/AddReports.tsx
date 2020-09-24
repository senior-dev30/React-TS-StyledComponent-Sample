import React, { useState } from 'react'

import { FullScreenModal, Grid as ReportSelectContainer } from '../Global'
import { PageTitleRow, PageTitle, PageDescription } from '../Global/Page'
import { ActionButton } from '../Global/Buttons'
import ReportSelect from './ReportSelect'

const reports: { [key: string]: string } = {
  // operator: 'Operator Scoreboard',
  // assetSummary: 'Asset Summary Report',
  // fuel: 'Fuel Report',
  // maintainence: 'Maintainence Report',
  // speed: 'Speed Report',
  telematics: 'Telematics Report', // currently the only supported report type
}

interface AddReportsProps {
  onClickClose(): void
  onClickAdd(category: string): void
}
export default (props: AddReportsProps) => {
  const [selected, setSelected] = useState('')
  const selectReport = (name: string) => setSelected(name)
  const deselectReport = () => setSelected('')

  const handleAddReports = () => props.onClickAdd(selected)

  return (
    <FullScreenModal onClickClose={props.onClickClose}>
      <PageTitleRow>
        <PageTitle>Add Report</PageTitle>
      </PageTitleRow>
      <PageTitleRow>
        <PageDescription>
          Select a report from the list below to add it to your reports page
        </PageDescription>
      </PageTitleRow>
      <ReportSelectContainer columns={4} gap={10} padding="30px 0 0">
        {Object.keys(reports).map(report => (
          <ReportSelect
            key={report}
            report={{ name: reports[report], id: report }}
            onSelect={selectReport}
            onDeselect={deselectReport}
            selected={selected}
          />
        ))}
      </ReportSelectContainer>
      <ActionButton onClick={handleAddReports} width={100}>
        Add Now
      </ActionButton>
    </FullScreenModal>
  )
}
