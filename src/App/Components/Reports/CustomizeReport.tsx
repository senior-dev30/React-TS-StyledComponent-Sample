import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Modal from 'react-modal'

// component imports
import SaveButton from '../Settings/SaveButton'
import {
  customModalStyles,
  ModalHeader as Header,
  ModalForm as Form,
} from '../Global/MiniModal'
import { CustomSelect, Input, SteppedSelect, CalendarInput } from '../Global/Forms'

// redux imports
import ReportActions from '../../Redux/ReportRedux'

// type imports
import { IReport, ICreateReportData } from '../../Redux/ReportRedux'
import { ImmutableIProjectArray, ProjectType, IProject } from '../../Redux/ProjectRedux'
import { ImmutableISiteArray, SiteType, ISite } from '../../Redux/SiteRedux'

// utils
// import { capitalizeStringArray } from '../../Lib/formatValues'

// required to enable screen reader accessibility & stop react-modal warnings
Modal.setAppElement('#root')

// constants
const frequencyRanges = ['daily', 'weekly', 'monthly']

// styled components
const ScheduledSelectContainer = styled.div`
  display: flex;
`

const FrequencySelect = styled.div`
  width: 238px;
`

const DatePicker = styled(ScheduledSelectContainer)``

const Dash = styled.div`
  margin: 0 5px;
  display: flex;
  align-items: center;
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.26px;
  line-height: 18px;
`

const ScheduledText = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
`

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

// types
interface MapStateTypes {
  projects: ProjectType
  sites: SiteType
}

interface MapPropsTypes {
  projects: ImmutableIProjectArray
  sites: ImmutableISiteArray
}

interface IProps {
  isOpen: boolean
  report: IReport
  createReport(reportData: ICreateReportData): any
  updateReport(reportID: number, reportData: ICreateReportData): any
  onRequestClose(): void
}

const CustomizeReport = ({
  projects,
  sites,
  isOpen,
  report,
  onRequestClose,
  createReport,
  updateReport,
}: IProps & MapPropsTypes) => {
  // mode
  const [mode, setMode] = useState('update')

  // name
  const [name, setName] = useState(report.name || '')
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setName(event.target.value)
  }

  // projects
  const initialProject = (() => {
    if (!report.projects || !report.projects.length) return null
    return projects.find(project => report.projects[0] === project.projectID) || null
  })()
  const [project, setProject] = useState<IProject | null>(initialProject)
  const selectProject = (project: IProject) => setProject(project)

  // sites
  const initialSite = (() => {
    if (!report.sites || !report.sites.length) return null
    return sites.find(site => report.sites[0] === site.siteID) || null
  })()
  const [site, setSite] = useState<ISite | null>(initialSite)
  const selectSite = (site: ISite) => {
    // also select the project to which the site belongs if it exist
    let project
    if (site && site.projectID) {
      project = projects.find(project => project.projectID === site.projectID)
    }

    setSite(site)
    setProject(project ? project : null)
  }

  // date range
  const [dateFrom, setDateFrom] = useState(report.dateFrom || '')
  const [dateTo, setDateTo] = useState(report.dateTo || '')
  const changeDate = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
    type === 'dateTo' ? setDateTo(event.target.value) : setDateFrom(event.target.value)

  // scheduled
  const [scheduled, setScheduled] = useState(!!report.frequency)
  const toggleScheduled = () => setScheduled(!scheduled)

  // frequency
  const [frequency, setFrequency] = useState(report.frequency || 'daily')
  const selectFrequency = (range: string) => () => setFrequency(range)

  // on mount
  useEffect(() => {
    if (!name) setMode('create')
  }, [])

  // data prep
  const projectsArray = project
    ? [project.projectID]
    : projects.asMutable().map(p => p.projectID)

  const sitesArray = site ? [site.siteID] : sites.asMutable().map(s => s.siteID)

  //submit handlers
  const handleSubmit = () => {
    mode === 'create' ? handleCreate() : handleUpdate()
    onRequestClose()
  }

  const handleCreate = () => {
    const reportData = {
      ...report,
      dateFrom,
      dateTo,
      name,
      image: 'base64',
      projects: projectsArray,
      sites: sitesArray,
      scheduled,
      frequency,
    }
    if (scheduled) delete reportData.dateTo
    if (!scheduled) delete reportData.frequency
    if (!reportData.sites.length) delete reportData.sites
    createReport(reportData)
  }

  const handleUpdate = () => {
    const reportData = {
      dateFrom,
      dateTo,
      name,
      projects: projectsArray,
      sites: sitesArray,
      customers: [0],
      frequency,
    }
    if (!scheduled) delete reportData.frequency
    updateReport(report.reportID, reportData)
  }

  const styles = {
    content: { ...customModalStyles.content, height: mode === 'create' ? 440 : 360 },
    overlay: customModalStyles.overlay,
  }

  return (
    <Modal
      isOpen={isOpen}
      style={styles}
      contentLabel="Customize Report"
      onRequestClose={onRequestClose}
    >
      <Header
        title={`${name ? 'Customize' : 'New '} report`}
        icon="customize"
        onRequestClose={onRequestClose}
      />
      <Form>
        <Input
          type="text"
          placeholder={'Enter the name of your report'}
          value={name}
          onChange={handleNameChange}
        />
        <CustomSelect
          options={projects.asMutable()}
          onSelect={selectProject}
          valueKey="projectID"
          displayKey="name"
          placeholder="All Projects"
          initialValue={project}
        />
        <CustomSelect
          options={sites.asMutable()}
          onSelect={selectSite}
          valueKey="siteID"
          displayKey="name"
          placeholder="All Sites"
          initialValue={site}
        />
        {mode === 'create' && (
          <ScheduledSelectContainer>
            <input type="checkbox" checked={scheduled} onChange={toggleScheduled} />
            <ScheduledText>Scheduled Report</ScheduledText>
          </ScheduledSelectContainer>
        )}
        {/* Only allow setting frequency on create until backend supports it */}
        {(report.frequency || scheduled) && mode === 'create' && (
          <FrequencySelect>
            <SteppedSelect
              steps={frequencyRanges}
              selected={frequency}
              onSelect={selectFrequency}
            />
          </FrequencySelect>
        )}
        {!(mode === 'update' && report.frequency) && (
          <DatePicker>
            <CalendarInput
              id="start"
              value={dateFrom}
              onChange={changeDate('dateFrom')}
            />
            {!report.frequency && !scheduled && <Dash>—</Dash>}
            {!report.frequency && !scheduled && (
              <CalendarInput id="end" value={dateTo} onChange={changeDate('dateTo')} />
            )}
          </DatePicker>
        )}
        <SaveButtonContainer>
          <SaveButton
            disabled={!name || !dateFrom || (!scheduled && !dateTo)}
            onClick={handleSubmit}
          />
        </SaveButtonContainer>
      </Form>
    </Modal>
  )
}

const mapState = (state: MapStateTypes): MapPropsTypes => {
  const { projects, sites } = state

  return {
    projects: projects.entities,
    sites: sites.entities,
  }
}

const mapDispatch = (dispatch: any) => ({
  createReport: (reportData: ICreateReportData) =>
    dispatch(ReportActions.createReport(reportData)),
  updateReport: (reportID: number, reportData: ICreateReportData) =>
    dispatch(ReportActions.updateReport(reportID, reportData)),
})

export default connect(
  mapState,
  mapDispatch,
)(CustomizeReport)
