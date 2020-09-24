import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// relative imports
import { capitalizeString } from '../../Lib/formatValues'

// component imports
import { FullScreenModal } from '../Global'
import {
  PageTitleRow,
  PageTitle,
  PageDescription,
  SectionTitle,
} from '../../Components/Global/Page'
import { TableHeader, TableRow } from '../Global/Table'

// redux imports
import EquipmentActions, {
  ImmutableIEquipmentArray,
  EquipmentType,
} from '../../Redux/EquipmentRedux'

// constants
const columnData = ['Description', 'Error Code', 'Impact', 'Created By']

// styled components
const TableContainer = styled.div`
  margin: 40px 30px;
`

const SectionHeader = styled.div`
  margin-bottom: 11.5px;
`

const ImpactItemContainer = styled.div`
  display: flex;
  align-items: center;
`

// @TODO abtract to its own component
const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high':
      return 'engineOff'
    case 'medium':
      return 'idling'
    case 'low':
    default:
      return 'operating'
  }
}

interface ImpactIndicatorProps {
  color: string
}
const ImpactIndicator = styled.div<ImpactIndicatorProps>`
  margin-right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, color }) => theme.colors[color]};
`

// types
interface MapStateTypes {
  equipment: EquipmentType
}

interface MapPropsType {
  equipment: ImmutableIEquipmentArray
  loading: boolean
}

interface IssueLogProps {
  equipmentID: number
  onClickClose(): void
  loadEquipmentDetail?(equipmentID: number): void
}

// renderFns
const renderImpactItem = (impact: string) => (
  <ImpactItemContainer>
    <ImpactIndicator color={getImpactColor(impact)} />
    {capitalizeString(impact)}
  </ImpactItemContainer>
)

const IssueLog = ({
  equipment: equipmentArray,
  equipmentID,
  loadEquipmentDetail,
  onClickClose,
}: IssueLogProps & MapPropsType) => {
  // load equipment data on mount
  useEffect(() => {
    if (equipmentID && loadEquipmentDetail) loadEquipmentDetail(equipmentID)
  }, [])

  const equipment = equipmentArray
    ? equipmentArray.find(item => item.equipmentID === equipmentID)
    : null

  const issueCount = equipment && equipment.issues ? equipment.issues.length : 0

  return (
    <FullScreenModal onClickClose={onClickClose} hideBackground>
      <PageTitleRow>
        <PageTitle onBack={onClickClose}>Issue Log</PageTitle>
      </PageTitleRow>
      {equipment && (
        <PageTitleRow>
          <PageDescription backButton>
            {`${equipment.manufacturer || ''}
              ${equipment.plantNumber || ''}
              ${capitalizeString(equipment.category || '')}`}
          </PageDescription>
        </PageTitleRow>
      )}
      <TableContainer>
        <SectionHeader>
          <SectionTitle>Current Issues</SectionTitle>
        </SectionHeader>
        <TableHeader columnData={columnData} height={48} />
        {equipment &&
          equipment.issues &&
          equipment.issues.map(({ description, errorCode, impact, author }, idx) => (
            <TableRow
              data={{
                description,
                errorCode: errorCode || '—',
                impact: renderImpactItem(impact),
                author,
              }}
              checkered
              hideBorder={idx === issueCount - 1}
            />
          ))}
      </TableContainer>
    </FullScreenModal>
  )
}

const mapState = ({
  equipment: { entities, fetchStatus },
}: MapStateTypes): MapPropsType => ({
  equipment: entities,
  loading: Object.keys(fetchStatus).length <= 1 || fetchStatus.fetching,
})

const mapDispatch = (dispatch: any) => ({
  loadEquipmentDetail: (equipmentID: number) =>
    dispatch(EquipmentActions.loadEquipmentDetail(equipmentID)),
})

export default connect(
  mapState,
  mapDispatch,
)(IssueLog)
