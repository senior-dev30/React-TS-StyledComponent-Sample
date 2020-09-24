import React, { useState } from 'react'
import styled, { withTheme } from 'styled-components'
import dayjs from 'dayjs'

import { IReport, IChildReport } from '../../Redux/ReportRedux'
import { CustomSelect } from '../Global/Forms'

const getDurationInticatorColor = (timeInterval: string) => {
  switch (timeInterval) {
    case 'daily':
      return 'lightSlate'
    case 'weekly':
      return 'aquamarine'
    case 'monthly':
    default:
      return 'grassGreen'
  }
}

const ReportCard = styled.div`
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 3px 4px 0 rgba(0, 0, 0, 0.06),
    0 1px 5px 0 rgba(0, 0, 0, 0.1);
`

const TitleRow = styled.div`
  width: 100%;
  height: 78px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`

const CustomizeIconContainer = styled.div`
  width: 55px;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`

const DeleteIconContainer = styled(CustomizeIconContainer)`
  padding-top: 0;
  align-items: center;
  cursor: pointer;
`

interface IconProps {
  icon: string
}
const CustomizeIcon = styled.div<IconProps>`
  width: 16px;
  height: 16px;
  background-image: url(${({ icon }) => icon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`

const DeleteIcon = styled(CustomizeIcon)`
  width: 10px;
  height: 10px;
`

const TypeIcon = styled(CustomizeIcon)`
  margin: 16px 0;
  width: 93px;
  height: 93px;
`

const ReportInformation = styled.div`
  flex: 1;
  padding: 20px 5px 0;
  border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
`

const ReportInformationRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const ReportName = styled.p`
  margin: -2px 0 0;
  padding: 0;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.76px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.darkGray};
`

const PeriodSelectContainer = styled.div`
  width: 150px;
  margin-right: 10px;
`

const PreselectedText = styled.div`
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`

interface DurationIndicatorProps {
  timeInterval: string
}
const DurationIndicator = styled.div<DurationIndicatorProps>`
  width: 60px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 500;
  line-height: 12px;
  text-transform: uppercase;
  border-radius: 11px;
  background-color: ${({ theme, timeInterval }) =>
    theme.colors[getDurationInticatorColor(timeInterval)]};
`

const DownloadButton = styled.button`
  width: 160px;
  height: 36px;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.2px;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  border: none;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.white};
  background-color: #3197d3;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.06), 0 1px 1px 0 rgba(0, 0, 0, 0.12),
    0 0 2px 0 rgba(0, 0, 0, 0.06), 0 2px 2px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
`

const NoResults = styled.div`
  height: 32px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray};
`

// types
interface ReportCardProps {
  report: IReport
  onClickCustomize(reportID: number | null): void
  downloadReport(reportID: number): void
  deleteReport(reportID: number): void
  theme: { images: { [key: string]: string } }
}

// data formatting
const formatDate = (date: string) => dayjs(date).format('MM/DD/YY')

export default withTheme(
  ({
    report: { name, children, frequency, dateFrom, dateTo, reportID },
    onClickCustomize,
    downloadReport,
    deleteReport,
    theme,
  }: ReportCardProps) => {
    // select scheduled report state logic
    const initialSelection = children && !!children.length ? children[0].reportID : null
    const [selectedReportID, setSelectedReportID] = useState(initialSelection)
    const handleSelect = (selected: IChildReport) => {
      if (!selected) return
      setSelectedReportID(selected.reportID ? selected.reportID : null)
    }

    // select the report and open customize modal
    const handleCustomizeClick = (_: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
      onClickCustomize(reportID)

    // download handler, either selected scheduled report or one-time report
    const onClickDownload = () =>
      frequency && children && selectedReportID
        ? downloadReport(selectedReportID)
        : downloadReport(reportID)

    const onClickRemove = () => deleteReport(reportID)

    return (
      <ReportCard>
        <TitleRow>
          <CustomizeIconContainer onClick={handleCustomizeClick}>
            <CustomizeIcon icon={theme.images.customize} />
          </CustomizeIconContainer>
          <ReportInformation>
            <ReportName>{name || ''}</ReportName>
            {frequency && (
              <ReportInformationRow>
                {!!children.length && (
                  <PeriodSelectContainer>
                    <CustomSelect
                      options={children}
                      onSelect={handleSelect}
                      valueKey="reportID"
                      displayKey="dateTo"
                      displayFn={(report: IChildReport) =>
                        `${formatDate(report.dateFrom)} - ${formatDate(report.dateTo)}`
                      }
                      initialValue={children[0]}
                      height={24}
                      width={165}
                    />
                  </PeriodSelectContainer>
                )}
                {!children.length && <NoResults>No dates available</NoResults>}
                <DurationIndicator timeInterval={frequency}>
                  {frequency}
                </DurationIndicator>
              </ReportInformationRow>
            )}
            {!frequency && !!dateFrom && !!dateTo && (
              <PreselectedText>
                {`${formatDate(dateFrom)} - ${formatDate(dateTo)}`}
              </PreselectedText>
            )}
          </ReportInformation>
          <DeleteIconContainer onClick={onClickRemove}>
            <DeleteIcon icon={theme.images.close} />
          </DeleteIconContainer>
        </TitleRow>
        <TypeIcon icon={theme.images.telematics} />
        {frequency && !children.length && (
          <NoResults>Your report is being generated and will appear shortly.</NoResults>
        )}
        {(!frequency || !!children.length) && (
          <DownloadButton onClick={onClickDownload}>Download Report</DownloadButton>
        )}
      </ReportCard>
    )
  },
)
