import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// relative imports
import { rentalColumnData, contractorColumnData } from '../Lib/equipmentTableColumns'

// component imports
import { PageContainer, PageTitleRow, PageTitle } from '../Components/Global/Page'
import { EquipmentTable, AssignTo } from '../Components/Equipment'
import { ReportIssue } from '../Components/EquipmentDetail'

// redux imports
import EquipmentActions, {
  EquipmentType,
  ImmutableIEquipmentArray,
} from '../Redux/EquipmentRedux'

// type imports
import { SiteType, ImmutableISiteArray } from '../Redux/SiteRedux'
import { WorkspaceType, IWorkspaceData } from '../Redux/WorkspaceRedux'

// styled componentns
const TableContainer = styled.div`
  margin-top: 26px;
  padding-bottom: 48px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`

// types
interface MapStateTypes {
  equipment: EquipmentType
  sites: SiteType
  workspace: WorkspaceType
}

interface MapPropsTypes {
  equipment: ImmutableIEquipmentArray
  sites: ImmutableISiteArray
  workspace: IWorkspaceData | undefined
}

interface EquipmentProps {
  loadEquipment(): void
  unassignEquipment(equipmentID: number): void
}

const Equipment = ({
  equipment,
  workspace,
  loadEquipment,
  unassignEquipment,
}: // sites,
EquipmentProps & MapPropsTypes) => {
  // selected equipment logic use to generate modals with equpiment data
  const [equipmentID, setEquipmentID] = useState<number | undefined>(undefined)

  // report issue state logic
  const [reportIssueModalOpen, setReportIssueModalOpen] = useState(false)
  const openReportIssueModal = () => setReportIssueModalOpen(true)
  const closeReportIssueModal = () => setReportIssueModalOpen(false)

  const reportAnIssue = (equipmentID: number) => () => {
    setEquipmentID(equipmentID)
    openReportIssueModal()
  }

  // assignTo state logic
  // report issue state logic
  const [assignToModalOpen, setAssignToModalOpen] = useState(false)
  const openAssignToModal = () => setAssignToModalOpen(true)
  const closeAssignToModal = () => setAssignToModalOpen(false)

  const assignEquipment = (equipmentID: number) => () => {
    setEquipmentID(equipmentID)
    openAssignToModal()
  }

  // add asset modal state logic
  /* Hidden until backend support for adding equipment is done */
  // const [addModalOpen, setAddModalOpen] = useState(false)
  // const openAddModal = () => setAddModalOpen(true)
  // const closeAddModal = () => {
  //   setAddModalOpen(false)
  // }

  /* Hidden until backend support for adding equipment is done */
  // const addAsset = () => {
  //   //@TODO: make post request to post data
  // }

  // load equipment on mount
  useEffect(() => {
    loadEquipment()
  }, [])

  const companyType = workspace && workspace.companyType

  // Commented out lines disable add equipment modal,
  // waiting to enable until  backend support for adding equipment is complete
  return (
    <PageContainer>
      {/* {!addModalOpen && ( */}
      <PageTitleRow>
        <PageTitle>Equipment</PageTitle>
        {/* <PageTitleRowButton onClick={openAddModal}>Add Asset</PageTitleRowButton> */}
      </PageTitleRow>
      {/* )} */}
      {/* {!addModalOpen && ( */}
      <TableContainer>
        {
          <EquipmentTable
            data={equipment}
            columnData={
              companyType === 'Rental' ? rentalColumnData : contractorColumnData
            }
            reportAnIssue={reportAnIssue}
            assignEquipment={assignEquipment}
            unassignEquipment={unassignEquipment}
            companyType={companyType}
          />
        }
      </TableContainer>
      {/* )} */}
      {/* {addModalOpen && (
        <AddAsset onClickClose={closeAddModal} onClickAdd={addAsset} sites={sites} />
      )} */}
      {reportIssueModalOpen && equipmentID && (
        <ReportIssue
          equipmentID={equipmentID}
          isOpen={reportIssueModalOpen}
          onRequestClose={closeReportIssueModal}
        />
      )}
      {assignToModalOpen && equipmentID && (
        <AssignTo
          equipmentID={equipmentID}
          isOpen={assignToModalOpen}
          onRequestClose={closeAssignToModal}
          equipment={equipment}
        />
      )}
    </PageContainer>
  )
}

const mapState = ({ equipment, sites, workspace }: MapStateTypes): MapPropsTypes => ({
  equipment: equipment.entities,
  sites: sites.entities,
  workspace: workspace.workspace,
})

const mapDispatch = (dispatch: any) => ({
  loadEquipment: () => dispatch(EquipmentActions.loadEquipment()),
  unassignEquipment: (equipmentID: number) =>
    dispatch(EquipmentActions.unassignEquipment(equipmentID)),
})

export default connect(
  mapState,
  mapDispatch,
)(Equipment)
