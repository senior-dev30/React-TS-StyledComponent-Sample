import React, { useState } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'

import { PageContainer } from '../Components/Global/Page'
import { EquipmentDetail, IssueLog } from '../Components/EquipmentDetail'

// styled components
const DetailContainer = styled.div`
  padding: 20px;
  max-width: 1210px;
  background-color: ${({ theme }) => theme.colors.white};
`

// types
interface IndividualEquipment {
  match: any
  history: any
}

export default withRouter(({ match, history }: IndividualEquipment) => {
  const equipmentID = Number(match.params.equipmentID)

  // modal state logic
  const [issueLogModalIsOpen, setIssueLogModalIsOpen] = useState(false)

  // navigation handlers
  const showOnMap = () =>
    history.push({
      pathname: `/`,
      state: { equipmentID },
    })

  const showIssueLog = () => setIssueLogModalIsOpen(true)

  // click handlers
  const handleCloseIssueLogModal = () => setIssueLogModalIsOpen(false)

  return (
    <PageContainer>
      {!issueLogModalIsOpen && (
        <DetailContainer>
          <EquipmentDetail
            equipmentID={equipmentID}
            showOnMap={showOnMap}
            showIssueLog={showIssueLog}
          />
        </DetailContainer>
      )}
      {issueLogModalIsOpen && equipmentID && (
        <IssueLog equipmentID={equipmentID} onClickClose={handleCloseIssueLogModal} />
      )}
    </PageContainer>
  )
})
