import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { FullScreenModal, Grid } from '../Global'
import { PageTitleRow, PageTitle, PageDescription } from '../Global/Page'
import { ActionButton } from '../Global/Buttons'
import KPICard from './KPICard'

import AnalyticsActions, { AnalyticsType } from '../../Redux/AnalyticsRedux'

const kpis: { [key: string]: string } = {
  workingHours: 'Working Hours',
  fuelConsumption: 'Fuel Consumption',
  equipmentPerformance: 'Equipment Performance',
  co2Emissions: 'CO2 Emissions',
  fuelSpendByEquipment: 'Fuel Spend (by Equipment)',
  fuelSpendBySite: 'Fuel Spend (by Site)',
  operationScoreboard: 'Equipment Operation Scoreboard',
}

const removeBlacklist = ['workingHours', 'fuelConsumption', 'equipmentPerformance']

const SectionTitle = styled.div`
  padding: 30px 0 0;
  font-size: 14px;
  font-weight: 300;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.lightGray};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`

const SelectedKPIsContainer = styled(Grid)``

const DeselectedKPIsContainer = styled(Grid)``

// types
interface MapStateTypes {
  analytics: AnalyticsType
}

interface MapPropsTypes {
  analytics: AnalyticsType
}

interface EditKPIsProps {
  dateFrom: string
  dateTo: string
  onClickClose(): void
  updateKpis: (
    dateFrom: string,
    dateTo: string,
    projects: number[],
    sites: number[],
    kpis: string[],
  ) => any
  selectedProjects: number[]
  selectedSites: number[]
}

const EditKPIs = (props: EditKPIsProps & MapPropsTypes) => {
  const currentKpis = Object.keys(props.analytics.reports)

  // selected KPIs array state
  const [selected, setSelected] = useState(currentKpis || [])
  const addKPI = (KPIToAdd: string) => setSelected([...selected, KPIToAdd])
  const removeKPI = (KPIToRemove: string) => {
    if (removeBlacklist.indexOf(KPIToRemove) !== -1) return
    setSelected([...selected.filter(KPI => KPI !== KPIToRemove)])
  }

  // deselectedKpis
  const deselectedKpis = Object.keys(kpis).filter(KPI => selected.indexOf(KPI) === -1)

  // submission handlers
  const handleSubmitEdit = () => {
    props.updateKpis &&
      props.updateKpis(
        props.dateFrom,
        props.dateTo,
        props.selectedProjects,
        props.selectedSites,
        selected,
      )
    props.onClickClose()
  }

  return (
    <FullScreenModal onClickClose={props.onClickClose}>
      <PageTitleRow>
        <PageTitle>EDIT KPIs</PageTitle>
      </PageTitleRow>
      <PageTitleRow>
        <PageDescription>
          Select a KPI from the list below to add your dashboard
        </PageDescription>
      </PageTitleRow>
      <SectionTitle>On Your Dashboard</SectionTitle>
      <SelectedKPIsContainer columns={3} gap={10} padding={'30px 0 0 0'}>
        {selected.map(KPI => (
          <KPICard
            key={KPI}
            KPI={{
              name: KPI,
              displayName: kpis[KPI],
              description: 'Lorem Ipsum',
            }}
            onClick={removeKPI}
            added
            hideRemove={removeBlacklist.indexOf(KPI) !== -1}
          />
        ))}
      </SelectedKPIsContainer>
      {!!deselectedKpis.length && (
        <>
          <SectionTitle>Available to Add</SectionTitle>
          <DeselectedKPIsContainer columns={3} gap={10} padding={'30px 0 0 0'}>
            {deselectedKpis.map(KPI => (
              <KPICard
                key={KPI}
                KPI={{
                  name: KPI,
                  displayName: kpis[KPI],
                  description: 'Lorem Ipsum',
                }}
                onClick={addKPI}
              />
            ))}
          </DeselectedKPIsContainer>
        </>
      )}
      <ActionButton onClick={handleSubmitEdit} width={100}>
        Add Now
      </ActionButton>
    </FullScreenModal>
  )
}

const mapState = ({ analytics }: MapStateTypes): MapPropsTypes => {
  return {
    analytics,
  }
}

const mapDispatch = (dispatch: any) => ({
  updateKpis: (
    dateFrom: string,
    dateTo: string,
    projects: number[],
    sites: number[],
    kpis: string[],
  ) => dispatch(AnalyticsActions.updateKpis(dateFrom, dateTo, projects, sites, kpis)),
})

export default connect(
  mapState,
  mapDispatch,
)(EditKPIs)
