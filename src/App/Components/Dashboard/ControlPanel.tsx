import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// component imports
import { CalendarInput, CustomSelect, SteppedSelect } from '../Global/Forms'

// redux imports
import { ICustomer, ImmutableICustomerArray } from '../../Redux/CustomerRedux'
import { ImmutableIProjectArray, IProject } from '../../Redux/ProjectRedux'
import { ImmutableISiteArray, ISite } from '../../Redux/SiteRedux'

// utils
import { getDateRange } from '../../Lib/dateHelpers'
import { WorkspaceType } from '../../Redux/WorkspaceRedux'

const toDateRanges = ['WTD', 'MTD', 'QTD', 'YTD']

const Container = styled.div`
  margin: 23px 0;
  max-width: 1210px;
  display: flex;
  align-items: center;
  & > * {
    margin-left: 10px;
  }
  @media screen and (max-width: 1210px) {
    align-items: flex-start;
    flex-direction: column;
    & > * {
      margin: 10px 0;
    }
  }
`

const SelectContainer = styled.div`
  width: 200px;
`

const ToDateContainer = styled.div`
  margin: 0 20px 0 30px;
  @media screen and (max-width: 1210px) {
    margin: 10px 0;
  }
`

const DateRangePicker = styled.div`
  display: flex;
  align-items: center;
`

const Dash = styled.div`
  margin: 0 9px;
  display: flex;
  align-items: center;
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.26px;
  line-height: 18px;
`

interface IControlPanelProps {
  controls: {
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
  setControls: React.Dispatch<
    React.SetStateAction<{
      selectedProject: IProject | undefined
      selectedSite: ISite | undefined
      selectedCustomer: ICustomer | undefined
      selectedToDate: string
      selectedDateRange: {
        dateFrom: string
        dateTo: string
      }
    }>
  >
  projects: ImmutableIProjectArray
  sites: ImmutableISiteArray
  customers: ImmutableICustomerArray
  workspace: WorkspaceType
}

interface IMapStateTypes {
  workspace: WorkspaceType
}

interface IMapPropsTypes {
  workspace: WorkspaceType
}
export const USER_TYPES = {
  contractor: 'Contractor',
  rental: 'Rental',
}
const ControlPanel = ({
  controls,
  setControls,
  projects,
  sites,
  workspace,
  customers,
}: IControlPanelProps) => {
  const userType = workspace && workspace.workspace && workspace.workspace.companyType
  // onChange handlers
  const selectProject = (project: IProject) => {
    setControls({
      ...controls,
      selectedProject: project,
    })
  }

  const selectSite = (site: ISite) => {
    // also select the project to which the site belongs if it exist
    const project = site
      ? projects.find(project => project.projectID === site.projectID)
      : undefined
    setControls({
      ...controls,
      selectedProject: project,
      selectedSite: site,
    })
  }

  const selectCustomer = (customer: ICustomer) => {
    setControls({
      ...controls,
      selectedCustomer: customer,
    })
  }

  const selectToDateRange = (range: string) => () => {
    setControls({
      ...controls,
      selectedToDate: range,
      selectedDateRange: getDateRange(range),
    })
  }

  // @TODO use dateHelpers isStartOfRange to select a ToDate if it user happens to pick
  // a valid ToDate start date, instead of just always setting it to empty string as now
  const selectToFromDateRange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { selectedDateRange } = controls
    const { value } = event.target
    if (
      (key === 'dateTo' && value > selectedDateRange.dateFrom) ||
      (key === 'dateFrom' && value < selectedDateRange.dateTo)
    ) {
      setControls({
        ...controls,
        selectedDateRange: {
          ...selectedDateRange,
          [key]: value,
        },
        selectedToDate: '',
      })
    }
  }
  return (
    <Container>
      <SelectContainer>
        <CustomSelect
          options={projects.asMutable()}
          onSelect={selectProject}
          valueKey="projectID"
          displayKey="name"
          placeholder="All Projects"
          initialValue={controls.selectedProject}
        />
      </SelectContainer>
      <SelectContainer>
        {userType === USER_TYPES.rental && (
          <CustomSelect
            options={customers.asMutable()}
            onSelect={selectCustomer}
            valueKey="customerID"
            displayKey="name"
            placeholder="All Customers"
          />
        )}
        {userType === USER_TYPES.contractor && (
          <CustomSelect
            options={sites.asMutable()}
            onSelect={selectSite}
            valueKey="siteID"
            displayKey="name"
            placeholder="All Sites"
          />
        )}
      </SelectContainer>
      <ToDateContainer>
        <SteppedSelect
          steps={toDateRanges}
          selected={controls.selectedToDate}
          onSelect={selectToDateRange}
        />
      </ToDateContainer>
      <DateRangePicker>
        <CalendarInput
          id="start"
          value={controls.selectedDateRange.dateFrom}
          onChange={selectToFromDateRange('dateFrom')}
        />
        <Dash>—</Dash>
        <CalendarInput
          id="end"
          value={controls.selectedDateRange.dateTo}
          onChange={selectToFromDateRange('dateTo')}
        />
      </DateRangePicker>
    </Container>
  )
}

// export default ControlPanel
const mapState = (state: IMapStateTypes): IMapPropsTypes => {
  const { workspace } = state

  return {
    workspace,
  }
}

const mapDispatch = () => ({})

export default connect(
  mapState,
  mapDispatch,
)(ControlPanel)
