import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  Chart,
  ControlPanel,
  EditKPIs,
  EquipmentPerformance,
} from '../../Components/Dashboard'
import { OperationScoreBoard } from '../../Components/Dashboard/Charts'
import { CO2, CostPerLitre } from '../../Components/Dashboard/KeyMetrics'
import { Grid } from '../../Components/Global'
import {
  PageContainer,
  PageTitle,
  PageTitleRow,
  PageTitleRowButton,
} from '../../Components/Global/Page'
import { getDateRange } from '../../Lib/dateHelpers'
import {
  addCurrencyPrefix,
  addHours,
  addKilograms,
  addLitres,
  addThousandsSepartor,
  capitalizeStringArray,
} from '../../Lib/formatValues'
import AnalyticsActions, {
  AnalyticsType,
  IAnalyticsReport,
} from '../../Redux/AnalyticsRedux'
import {
  CustomerType,
  ICustomer,
  ImmutableICustomerArray,
} from '../../Redux/CustomerRedux'
import { ImmutableIProjectArray, IProject, ProjectType } from '../../Redux/ProjectRedux'
import { ImmutableISiteArray, ISite, SiteType } from '../../Redux/SiteRedux'

const keyMetrics = {
  co2: (props: any) => <CO2 {...props} />,
  costPerLitre: (props: any) => <CostPerLitre {...props} />,
}

const renderers = {
  equipmentPerformance: (props?: any) => <EquipmentPerformance {...props} />,
  operationScoreboard: (props: any) => <OperationScoreBoard {...props} />,
}

const dataParsers = {
  equipmentTotal: (data: any) => ({
    datasets: [
      {
        backgroundColor: '#2DBBCA',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 3,
        data: Object.keys(data).map(equipment => data[equipment].total),
      },
    ],
    labels: capitalizeStringArray(Object.keys(data)),
  }),
  fuelSpendByEquipment: (data: any, idx = 0) => ({
    datasets: [
      {
        backgroundColor: '#2DBBCA',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 3,
        data: Object.values(data[Object.keys(data)[idx]]),
      },
    ],
    labels: capitalizeStringArray(Object.keys(data[Object.keys(data)[idx]])),
  }),
  fuelSpendBySite: (data: any) => ({
    datasets: [
      {
        backgroundColor: '#2DBBCA',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 3,
        data: Object.keys(data).map(site => data[site].totalFuelUsedLitres),
      },
    ],
    labels: capitalizeStringArray(Object.keys(data)),
  }),
  workingHours: (data: any) => ({
    datasets: [
      {
        // label: "Idle",
        backgroundColor: '#2DBBCA',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 3,
        data: Object.keys(data).map(site => data[site].idleHours),
      },
      {
        // label: "Working",
        backgroundColor: '#3197D3',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 3,
        data: Object.keys(data).map(site => data[site].workingHours),
      },
      {
        // label: "Total",
        backgroundColor: '#F2BB7D',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 3,
        data: Object.keys(data).map(site => data[site].totalHours),
      },
    ],
    labels: Object.keys(data),
  }),
}

const yAxisFormatters = {
  co2Emissions: (value: number) => addKilograms(addThousandsSepartor(value)),
  workingHours: (value: number) => addHours(addThousandsSepartor(value)),
  fuelConsumption: (value: number) => addLitres(addThousandsSepartor(value)),
  fuelSpend: (value: number) => addCurrencyPrefix(addThousandsSepartor(value)),
}

const components = {
  co2Emissions: (reportData: IAnalyticsReport) => (
    <Chart
      size="half"
      title="CO2 Emissions"
      keyMetric={reportData.trend}
      data={dataParsers.equipmentTotal(reportData.categories)}
      format={yAxisFormatters.co2Emissions}
      filterType="equipment"
    />
  ),
  equipmentPerformance: (reportData: IAnalyticsReport) => (
    <Chart
      size="full"
      title="Equipment performance"
      renderBody={renderers.equipmentPerformance}
      data={reportData}
      hideKeyMetrics
      filterType="equipment"
    />
  ),
  fuelConsumption: (reportData: IAnalyticsReport) => (
    <Chart
      size="half"
      title="Fuel Consumption"
      data={dataParsers.equipmentTotal(reportData)}
      renderKeyMetric={keyMetrics.costPerLitre}
      format={yAxisFormatters.fuelConsumption}
      filterType="equipment"
    />
  ),
  fuelSpendByEquipment: (reportData: IAnalyticsReport) => (
    <Chart
      size="half"
      title="Fuel spend (by equipment)"
      keyMetric={1}
      keyMetricChanges
      renderKeyMetric={keyMetrics.costPerLitre}
      data={dataParsers.fuelSpendByEquipment(reportData)}
      format={yAxisFormatters.fuelSpend}
      filterType="equipment"
    />
  ),
  fuelSpendBySite: (reportData: IAnalyticsReport) => (
    <Chart
      size="half"
      title="Fuel spend (by site)"
      renderKeyMetric={keyMetrics.costPerLitre}
      keyMetricChanges
      keyMetric={1}
      data={dataParsers.fuelSpendBySite(reportData)}
      format={yAxisFormatters.fuelSpend}
      filterType="sites"
    />
  ),
  operationScoreboard: (reportData: IAnalyticsReport) => (
    <Chart
      size="half"
      title="Equipment Operation Scoreboard"
      data={reportData}
      renderBody={renderers.operationScoreboard}
      hideKeyMetrics
      filterType="sites"
    />
  ),
  workingHours: (reportData: IAnalyticsReport) => (
    <Chart
      size="half"
      title="Working hours"
      information="Some data is not captured by the telematics"
      data={dataParsers.workingHours(reportData)}
      format={yAxisFormatters.workingHours}
      filterType="sites"
    />
  ),
}

// styled components
const Loading = styled.div`
  height: 80%;
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
interface IControlsProps {
  selectedProject: IProject | undefined
  selectedSite: ISite | undefined
  selectedCustomer: ICustomer | undefined
  selectedToDate: string
  selectedDateRange: {
    dateFrom: string
    dateTo: string
    [key: string]: string
  }
}

interface IMapStateTypes {
  analytics: AnalyticsType
  projects: ProjectType
  sites: SiteType
  customers: CustomerType
}

interface IMapPropsTypes {
  analytics: AnalyticsType
  projects: ImmutableIProjectArray
  sites: ImmutableISiteArray
  customers: ImmutableICustomerArray
}

interface IDashboardProps {
  loadAnalytics(
    dateFrom: string,
    dateTo: string,
    projects: number[],
    sites: number[],
    customers: number[],
  ): void
}

const Dashboard = ({
  analytics,
  projects,
  sites,
  loadAnalytics,
  customers,
}: IDashboardProps & IMapPropsTypes) => {
  // modal state
  const [modalOpen, setModalOpen] = useState(false)
  const handleEditKPIsClick = () => setModalOpen(true)
  const handleOnClickClose = () => setModalOpen(false)

  // controls state
  const [controls, setControls] = useState<IControlsProps>({
    selectedCustomer: undefined,
    selectedDateRange: getDateRange('YTD'),
    selectedProject: undefined,
    selectedSite: undefined,
    selectedToDate: 'YTD',
  })
  const { selectedProject, selectedSite, selectedDateRange, selectedCustomer } = controls

  // data prep
  const projectsArray = selectedProject
    ? [selectedProject.projectID]
    : projects.asMutable().map(p => p.projectID)

  const sitesArray = selectedSite
    ? [selectedSite.siteID]
    : sites.asMutable().map(s => s.siteID)
  const customerArray = selectedCustomer
    ? [selectedCustomer.customerID]
    : customers.asMutable().map(s => s.customerID)

  useEffect(() => {
    loadAnalytics(
      selectedDateRange.dateFrom,
      selectedDateRange.dateTo,
      projectsArray,
      sitesArray,
      customerArray,
    )
  }, [controls])

  const {
    reports,
    fetchStatus: { fetching, error },
  } = analytics

  const hasData = (report: IAnalyticsReport) => report && !!Object.keys(report).length
  const hasCo2Data = (report: IAnalyticsReport) =>
    report && !!report.categories && !!Object.keys(report.categories).length

  return (
    <PageContainer>
      {!modalOpen && (
        <PageTitleRow>
          <PageTitle> Dashboard </PageTitle>
          <PageTitleRowButton onClick={handleEditKPIsClick}>Edit KPIs</PageTitleRowButton>
        </PageTitleRow>
      )}
      {!modalOpen && (
        <ControlPanel
          controls={controls}
          setControls={setControls}
          projects={projects}
          sites={sites}
          customers={customers}
        />
      )}
      {!modalOpen && fetching && <Loading>Refreshing data...</Loading>}
      {!modalOpen && error && <Loading>There was an issue fetching your data.</Loading>}
      {!modalOpen && reports && !fetching && !error && (
        <Grid columns={2} gap={10}>
          {hasData(reports.workingHours) && components.workingHours(reports.workingHours)}
          {hasData(reports.fuelConsumption) &&
            components.fuelConsumption(reports.fuelConsumption)}
          {hasData(reports.equipmentPerformance) &&
            components.equipmentPerformance(reports.equipmentPerformance)}
          {hasCo2Data(reports.co2Emissions) &&
            components.co2Emissions(reports.co2Emissions)}
          {hasData(reports.fuelSpendByEquipment) &&
            components.fuelSpendByEquipment(reports.fuelSpendByEquipment)}
          {hasData(reports.fuelSpendBySite) &&
            components.fuelSpendBySite(reports.fuelSpendBySite)}
          {hasData(reports.operationScoreboard) &&
            components.operationScoreboard(reports.operationScoreboard)}
        </Grid>
      )}
      {!modalOpen && !reports && (
        <div>
          There are no reports to show you. <br />
          <br />
          You may have removed all your KPIs, or there may be an issue with your internet
          connection.
        </div>
      )}
      {modalOpen && (
        <EditKPIs
          onClickClose={handleOnClickClose}
          dateFrom={selectedDateRange.dateFrom}
          dateTo={selectedDateRange.dateTo}
          selectedProjects={projectsArray}
          selectedSites={sitesArray}
        />
      )}
    </PageContainer>
  )
}

const mapState = (state: IMapStateTypes): IMapPropsTypes => {
  const { analytics, projects, sites, customers } = state

  return {
    analytics,
    projects: projects.entities,
    sites: sites.entities,
    customers: customers.entities,
  }
}
const mapDispatch = (dispatch: any) => ({
  loadAnalytics: (
    dateFrom: string,
    dateTo: string,
    projects: number[],
    sites: number[],
    customers: number[],
  ) =>
    dispatch(
      AnalyticsActions.loadAnalytics(dateFrom, dateTo, projects, sites, customers),
    ),
})

export default connect(
  mapState,
  mapDispatch,
)(Dashboard)
