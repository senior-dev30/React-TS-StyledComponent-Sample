import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { VerticalDivider as DefaultVerticalDivider } from '../Components/Global'
import { PageContainer, PageTitleRow, PageTitle } from '../Components/Global/Page'
import { UserSettingsPane, ProjectSettingsPane } from '../Components/Settings'

import { ImmutableISiteArray, SiteType } from '../Redux/SiteRedux'
import ProjectActions, {
  ImmutableIProjectArray,
  ProjectType,
} from '../Redux/ProjectRedux'
import AddSite from '../Components/LiveMap/AddSite'

const PanesContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
`

const VerticalDivider = styled(DefaultVerticalDivider)`
  margin-top: 50px;
`

// types
interface ISiteToAdd {
  siteName: string
  projectID: number
}

interface MapStateTypes {
  projects: ProjectType
  sites: SiteType
}

interface MapPropsTypes {
  projects: ImmutableIProjectArray
  sites: ImmutableISiteArray
}

interface IProps {
  addProject(name: string): void
  updateProjectSites(projectID: number, sites: number[]): void
}

interface StateProps {
  projectsToAdd: any
  sitesToAdd: ISiteToAdd[]
  sitesToRemove: number[]
  addSiteModalIsOpen: boolean
  addSiteProjectID?: number
}

class Settings extends Component<IProps & MapPropsTypes, StateProps> {
  state: StateProps = {
    projectsToAdd: [],
    sitesToAdd: [],
    sitesToRemove: [],
    addSiteModalIsOpen: false,
    addSiteProjectID: undefined,
  }

  // modal logic
  openAddSiteModal = (addSiteProjectID: number) => {
    this.setState({ addSiteModalIsOpen: true, addSiteProjectID })
  }

  closeAddSiteModal = () => this.setState({ addSiteModalIsOpen: false })

  //@TODO: implement
  handleUserSettingsSubmit = (data: any) => {
    console.log('submitted', data)
  }

  handleProjectSitesSettingsSubmit = (data: any) => {
    // an existing project was selected, meaning sites were changed
    if (!data.projects || data.projects === 'Select a Project') {
      return this.handleProjectSubmit(data)
    }
    this.handleSiteSubmit(data)
  }

  handleSiteSubmit = (data: any) => {
    const { sitesToRemove } = this.state
    const { sites, updateProjectSites } = this.props

    // 1. Handle removed sites
    // @FIXME: PUT route for projects/{id}/sites doesn't change any values in DB
    // the route should also remove the projectID from each individual site
    const projectID = Number(data.projects)
    if (projectID && !isNaN(projectID)) {
      updateProjectSites(
        projectID,
        sites
          .asMutable()
          .filter(
            site =>
              site.projectID === projectID && sitesToRemove.indexOf(site.siteID) === -1,
          )
          .map(site => site.siteID),
      )
    }
    // 2. @TODO: Update sites whose names changed.
    // No `PUT /sites` route available

    this.clearState()
  }

  handleProjectSubmit = (data: any) => {
    const projectKeys = Object.keys(data).filter(
      key =>
        key.indexOf('project-') !== -1 &&
        this.state.projectsToAdd.indexOf(key.split('-')[1]) !== -1,
    )
    projectKeys.forEach(project => this.props.addProject(project.split('-')[1]))
  }

  // logic for adding new probjects/sites and removing them prior to submission
  addProject = (projectName: string) => {
    this.setState({ projectsToAdd: [...this.state.projectsToAdd, projectName] })
  }

  removeAddedProject = (idx: number) => {
    this.setState({
      projectsToAdd: [
        ...this.state.projectsToAdd.slice(0, idx),
        ...this.state.projectsToAdd.slice(idx + 1),
      ],
    })
  }

  addSite = (site: ISiteToAdd) => {
    this.setState({ sitesToAdd: [...this.state.sitesToAdd, site] })
  }

  removeAddedSite = (idx: number) => {
    this.setState({
      sitesToAdd: [
        ...this.state.sitesToAdd.slice(0, idx),
        ...this.state.sitesToAdd.slice(idx + 1),
      ],
    })
  }

  removeExistingSite = (siteID: number) =>
    this.setState({ sitesToRemove: [...this.state.sitesToRemove, siteID] })

  clearState = () =>
    this.setState({ projectsToAdd: [], sitesToAdd: [], sitesToRemove: [] })

  render = () => (
    <PageContainer>
      <PageTitleRow>
        <PageTitle>Settings</PageTitle>
      </PageTitleRow>
      <PanesContainer>
        <UserSettingsPane onSubmit={this.handleUserSettingsSubmit} destroyOnUnmount />
        <VerticalDivider />
        <ProjectSettingsPane
          onSubmit={this.handleProjectSitesSettingsSubmit}
          destroyOnUnmount
          // project props
          projects={this.props.projects}
          projectsToAdd={this.state.projectsToAdd}
          addProject={this.addProject}
          removeAddedProject={this.removeAddedProject}
          // site props
          openAddSiteModal={this.openAddSiteModal}
          sites={this.props.sites}
          sitesToAdd={this.state.sitesToAdd}
          addSite={this.addSite}
          sitesToRemove={this.state.sitesToRemove}
          removeAddedSite={this.removeAddedSite}
          removeExistingSite={this.removeExistingSite}
          // state
          clearAll={this.clearState}
        />
      </PanesContainer>
      {this.state.addSiteModalIsOpen && this.state.addSiteProjectID && (
        <AddSite
          onClickClose={this.closeAddSiteModal}
          propProjectID={this.state.addSiteProjectID}
        />
      )}
    </PageContainer>
  )
}

const mapState = ({ projects, sites }: MapStateTypes): MapPropsTypes => ({
  projects: projects.entities,
  sites: sites.entities,
})

const mapDispatch = (dispatch: any) => ({
  addProject: (name: string) => dispatch(ProjectActions.addProject({ name, sites: [] })),
  updateProjectSites: (projectID: number, sites: number[]) =>
    dispatch(ProjectActions.updateProjectSites(projectID, sites)),
})

export default connect(
  mapState,
  mapDispatch,
)(Settings)
