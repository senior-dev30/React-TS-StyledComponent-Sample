import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled, { withTheme } from 'styled-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Image, VerticalDivider } from '../Global'
import { SectionTitle } from '../Global/Page'
import KeyDetailsHeader from './KeyDetailsHeader'
import { Utilization } from './Charts'
import ReportIssue from './ReportIssue'

import { ThemeInterface } from '../../Themes'
import EquipmentActions, {
  ImmutableIEquipmentArray,
  EquipmentType,
} from '../../Redux/EquipmentRedux'
import { Redirect } from 'react-router'

dayjs.extend(relativeTime)

// constants
const DISPLAYED_ISSUE_COUNT = 2

// styled components
const Container = styled.div`
  display: flex;
  min-height: 670px;
  @media screen and (max-width: 1230px) {
    flex-direction: column;
  }
`

const InformationContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 646px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1230px) {
    flex-shrink: 1;
  }
`

const IssuesContainer = styled.div`
  flex-grow: 1;
  padding-top: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
`

const SectionContainer = styled.div``

const UtilzationContainer = styled.div`
  margin-top: 13px;
  display: flex;
`

const IssuesList = styled.div`
  padding-top: 40px;
`

const Issue = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
`

const IssueImageContainer = styled.div`
  flex-shrink: 0;
`

const IssueInformationContainer = styled.div`
  padding-left: 24px;
  display: flex;
  flex-direction: column;
`

const IssueDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
`

const IssueDescription = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.3px;
  line-height: 21px;
`

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
  margin-left: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, color }) => theme.colors[color]};
`

const IssueText = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.26px;
  line-height: 18px;
`

const TimeStamp = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
  margin: 12px 0;
`

const TimeStampTime = styled.div`
  padding-left: 4px;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`

const IssueAttributionText = styled.span`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`

const MoreIssues = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 0 10px;
  height: 32px;
  width: 180px;
  display: flex;
  align-items: center;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.bluishWhite};
  cursor: pointer;
`

const MoreIssueText = styled.div`
  padding-left: 10px;
  color: ${({ theme }) => theme.colors.blue};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`

const IssueArrow = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`

const ReportIssueButton = styled.div`
  height: 48px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.magenta};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(206, 206, 209, 0.25);
  cursor: pointer;
`

const Loading = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray};
  z-index: 2;
`

// types
interface MapStateTypes {
  equipment: EquipmentType
}

interface MapPropsType {
  equipment: ImmutableIEquipmentArray
  loading: boolean
}

interface EquipmentDetailProps {
  equipmentID: number
  loadEquipmentDetail?(equipmentID: number): void
  showOnMap(): void
  showIssueLog(): void
  theme: ThemeInterface
}

const EquipmentDetail = ({
  equipment,
  equipmentID,
  loadEquipmentDetail,
  theme,
  loading,
  showOnMap,
  showIssueLog,
}: EquipmentDetailProps & MapPropsType) => {
  // report issue state logic
  const [reportIssueModalOpen, setReportIssueModalOpen] = useState(false)
  const openReportIssueModal = () => setReportIssueModalOpen(true)
  const closeReportIssueModal = () => setReportIssueModalOpen(false)

  // load equipment data on mount
  useEffect(() => {
    if (equipmentID && loadEquipmentDetail) loadEquipmentDetail(equipmentID)
  }, [])

  // data prep
  const equipmentItem = equipment
    ? equipment.find(item => item.equipmentID === equipmentID)
    : null
  const issues = equipmentItem && equipmentItem.issues ? equipmentItem.issues : []
  const displayIssues = issues.slice(0, DISPLAYED_ISSUE_COUNT)

  return (
    <Container>
      {!equipmentItem && <Redirect to="/" />}
      {!loading && equipmentItem && (
        <InformationContainer>
          <KeyDetailsHeader equipmentItem={equipmentItem} showOnMap={showOnMap} />
          {!!equipmentItem && (
            <SectionContainer>
              <SectionTitle>Utilization (past 24 hours)</SectionTitle>
              <UtilzationContainer>
                <Utilization
                  metrics={{
                    engineWorking: equipmentItem.engineWorkingTime
                      ? equipmentItem.engineWorkingTime
                      : 0,
                    engineIdling: equipmentItem.engineIdleTime
                      ? equipmentItem.engineIdleTime
                      : 0,
                    engineOff: equipmentItem.engineOff ? equipmentItem.engineOff : 0,
                    utilization: equipmentItem.utilisation
                      ? equipmentItem.utilisation
                      : 0,
                  }}
                />
              </UtilzationContainer>
            </SectionContainer>
          )}
        </InformationContainer>
      )}
      {!loading && <VerticalDivider />}
      {!loading && (
        <IssuesContainer>
          <SectionContainer>
            <SectionTitle>Current Issues</SectionTitle>
          </SectionContainer>
          <IssuesList>
            {displayIssues.map(issue => (
              <Issue key={issue.created_at}>
                <IssueImageContainer>
                  <Image height={40} width={40} image={theme.images.issue} />
                </IssueImageContainer>
                <IssueInformationContainer>
                  <IssueDescriptionContainer>
                    <IssueDescription>{issue.description}</IssueDescription>
                    {issue.impact && (
                      <ImpactIndicator color={getImpactColor(issue.impact)} />
                    )}
                  </IssueDescriptionContainer>
                  {issue.errorCode && (
                    <IssueText>{`Error Code: ${issue.errorCode}`}</IssueText>
                  )}
                  <TimeStamp>
                    <Image height={12} width={12} image={theme.images.clock} />
                    <TimeStampTime>
                      {`${dayjs(issue.created_at).fromNow()} by `}
                      <IssueAttributionText>{issue.author}</IssueAttributionText>
                    </TimeStampTime>
                  </TimeStamp>
                </IssueInformationContainer>
              </Issue>
            ))}
            {issues.length > 2 && (
              <MoreIssues onClick={showIssueLog}>
                <Image height={16} width={16} image={theme.images.warning} />
                <MoreIssueText>{`${issues.length - 2} more issues`}</MoreIssueText>
                <IssueArrow>
                  <Image height={14} width={8} image={theme.images.arrowRightBlue} />
                </IssueArrow>
              </MoreIssues>
            )}
            <ReportIssueButton onClick={openReportIssueModal}>
              Report Issue
            </ReportIssueButton>
          </IssuesList>
        </IssuesContainer>
      )}
      {loading && <Loading />}
      {reportIssueModalOpen && (
        <ReportIssue
          equipmentID={equipmentID}
          isOpen={reportIssueModalOpen}
          onRequestClose={closeReportIssueModal}
        />
      )}
    </Container>
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
)(withTheme(EquipmentDetail))
