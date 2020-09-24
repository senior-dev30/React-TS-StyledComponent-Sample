import React, { Component } from 'react'
import styled from 'styled-components'
import { reduxForm, InjectedFormProps } from 'redux-form'

import PaneHeader from './PaneHeader'
import { SectionTitle } from '../Global/Page'
import { SelectInput as Select, DeletableTextInput } from '../Global/Forms'
import SaveButton from './SaveButton'

import { ImmutableISiteArray } from '../../Redux/SiteRedux'
import { ImmutableIProjectArray } from '../../Redux/ProjectRedux'

const Form = styled.form`
  margin: 50px 10px;
  width: 400px;
`

const FormBody = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`

const InputRow = styled.div`
  margin-bottom: 18px;
  width: 260px;
`

const AddRow = styled.div`
  margin-bottom: 18px;
  width: 300px;
  display: flex;
  align-items: center;
`

const AddButton = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.blue};
  text-transform: uppercase;
  cursor: pointer;
  white-space: pre;
  ::before {
    content: '+ ';
  }
`

const ConfirmAddButton = styled(AddButton)`
  padding-left: 14px;
  ::before {
    content: '';
  }
  ::after {
    content: 'ADD';
  }
`

const ConfirmRow = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-right: 10px;
  }
`

const CancelButton = styled.div`
  margin-top: 30px;
  width: 80px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.darkGray};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(206, 206, 209, 0.25);
  cursor: pointer;
`

const NoResults = styled.div`
  height: 32px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray};
`

// types
interface ISiteToAdd {
  siteName: string
  projectID: number
}
interface IProjectSettingsProps {
  newProjectName: string
  newSiteName: string
}
interface IProps {
  projects: ImmutableIProjectArray
  projectsToAdd: string[]
  sites: ImmutableISiteArray
  sitesToAdd: ISiteToAdd[]
  sitesToRemove: number[]
  handleSubmit?(): void
  addProject(projectName: string): void
  removeAddedProject(idx: number): void
  openAddSiteModal(addSiteProjectID: number): void
  addSite({ siteName, projectID }: { siteName: string; projectID: number }): void
  removeAddedSite(idx: number): void
  removeExistingSite(siteID: number): void
  clearAll(): void
}

interface StateProps {
  addProjectActive: boolean
  addSiteActive: boolean
  selectedProject: string
}

class ProjectSettingsPane extends Component<
  InjectedFormProps<IProjectSettingsProps> & IProps,
  StateProps
> {
  newProjectRef: any
  newSiteRef: any
  state: StateProps = {
    addProjectActive: false,
    addSiteActive: false,
    selectedProject: '',
  }

  componentDidUpdate = (prevProps: InjectedFormProps<IProjectSettingsProps> & IProps) => {
    // if a site has been added manually add site name to form field
    if (prevProps.sites.length !== this.props.sites.length) {
      const prevSiteIDs = prevProps.sites.map(site => site.siteID)
      const addedSite = this.props.sites.find(
        site => prevSiteIDs.indexOf(site.siteID) === -1,
      )
      if (addedSite) this.props.change(`site-${addedSite.siteID}`, addedSite.name)
    }
  }

  // handlers to reveal text inputs
  onClickAddProject = () => this.setState({ addProjectActive: true })

  onClickAddSite = () => {
    this.props.openAddSiteModal(Number(this.state.selectedProject))
  }

  // hanlders to add entity to parent's state arrays for submission later
  handleConfirmAddProject = () => {
    const { change, addProject } = this.props
    if (this.newProjectRef.value) {
      addProject(this.newProjectRef.value)
      change('newProjectName', '')
      change(`project-${this.newProjectRef.value}`, this.newProjectRef.value)
    }
    this.setState({ addProjectActive: false })
  }

  handleConfirmAddSite = () => {
    const { change, addSite } = this.props
    if (this.newSiteRef.value) {
      addSite({
        siteName: this.newSiteRef.value,
        projectID: Number(this.state.selectedProject),
      })
      change('newSiteName', '')
      change(`site-${this.newSiteRef.value}`, this.newSiteRef.value)
    }
    this.setState({ addSiteActive: false })
  }

  // exit out of new site/project add mode
  handleClickUndoAdd = () => {
    this.setState({
      addProjectActive: false,
      addSiteActive: false,
    })
  }

  // change the view to show a project's sites
  handleProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    this.setState({ selectedProject: event.target.value })

    // fill site names into form fields
    this.props.sites
      .filter(site => site.projectID === Number(event.target.value))
      .forEach(site => this.props.change(`site-${site.siteID}`, site.name))
    this.props.change('projects', event.target.value)
  }

  // remove a project that has been added to the form but not the DB
  handleRemoveAddedProject = (idx: number) => () => {
    this.props.removeAddedProject(idx)
  }

  // remove a site that already existed on a selected project
  handleRemoveSite = (siteID: number) => () => this.props.removeExistingSite(siteID)

  // remove a site that has been added to the form but not the DB
  handleRemoveAddedSite = (idx: number) => () => this.props.removeAddedSite(idx)

  // reset the entire form
  handleClickCancel = () => {
    this.props.clearAll()
    this.setState(
      {
        addProjectActive: false,
        addSiteActive: false,
        selectedProject: 'Select a Project',
      },
      () => this.props.reset(),
    )
  }

  // clear the form after submitting its values
  handleClickSave = () => {
    this.props.handleSubmit()
    this.handleClickCancel()
  }

  // used to grab the values of newly added projects/sites before submitting form
  setupNewProjectRef = (ref: any) => (this.newProjectRef = ref)
  setupNewSiteRef = (ref: any) => (this.newSiteRef = ref)

  render = () => {
    const { addProjectActive, addSiteActive, selectedProject } = this.state
    const {
      handleSubmit,
      pristine,
      submitting,
      projects,
      projectsToAdd,
      sites,
      sitesToAdd,
      sitesToRemove,
    } = this.props

    const projectSites = sites.filter(
      site => site.projectID === Number(this.state.selectedProject),
    )

    const isEmptyQuery = !selectedProject || selectedProject === 'Select a Project'

    const isFormDisabled =
      pristine ||
      submitting ||
      addProjectActive ||
      addSiteActive ||
      (!sitesToRemove.length && !sitesToAdd.length && !projectsToAdd.length)

    return (
      <Form onSubmit={handleSubmit}>
        <PaneHeader title={'Projects & Sites'} imageName="siteListSettings" />
        <SectionTitle>Projects</SectionTitle>
        <FormBody>
          {!projectsToAdd.length && !addProjectActive && (
            <InputRow>
              <Select
                options={projects.asMutable()}
                placeholder="Select a Project"
                name="projects"
                id="projectID"
                displayName="name"
                onChange={this.handleProjectSelect}
                disabled={!!sitesToRemove.length || !!sitesToAdd.length}
              />
            </InputRow>
          )}
          {projectsToAdd.map((project, idx) => (
            <InputRow key={`project-${project}-${idx}`}>
              <DeletableTextInput
                name={`project-${project}`}
                onClickRemove={this.handleRemoveAddedProject(idx)}
              />
            </InputRow>
          ))}
          {!addProjectActive &&
            isEmptyQuery &&
            !sitesToRemove.length &&
            !sitesToAdd.length && (
              <AddButton onClick={this.onClickAddProject}>Add Project</AddButton>
            )}
          {(!!sitesToRemove.length || !!sitesToAdd.length) && (
            <NoResults>
              Finish making changes to your sites to make changes to projects.
            </NoResults>
          )}
          {addProjectActive && (
            <AddRow>
              <DeletableTextInput
                placeholder="Type Project Name"
                name="newProjectName"
                ref={this.setupNewProjectRef}
                onClickRemove={this.handleClickUndoAdd}
              />
              <ConfirmAddButton onClick={this.handleConfirmAddProject} />
            </AddRow>
          )}
        </FormBody>
        <SectionTitle>Sites</SectionTitle>
        <FormBody>
          {!projectsToAdd.length &&
            !isEmptyQuery &&
            projectSites &&
            projectSites
              .asMutable()
              .filter(site => sitesToRemove.indexOf(site.siteID) === -1)
              .map(site => (
                <InputRow key={site.siteID}>
                  <DeletableTextInput
                    name={`site-${site.siteID}`}
                    placeholder={site.name}
                    onClickRemove={this.handleRemoveSite(site.siteID)}
                  />
                </InputRow>
              ))}
          {!projectsToAdd.length &&
            !isEmptyQuery &&
            sitesToAdd.map((site, idx) => (
              <InputRow key={`site-${site.siteName}-${idx}`}>
                <DeletableTextInput
                  name={`site-${site.siteName}`}
                  onClickRemove={this.handleRemoveAddedSite(idx)}
                />
              </InputRow>
            ))}
          {!addSiteActive && !isEmptyQuery && !projectsToAdd.length && (
            <AddButton onClick={this.onClickAddSite}>Add Site</AddButton>
          )}
          {addSiteActive && !isEmptyQuery && !projectsToAdd.length && (
            <AddRow>
              <DeletableTextInput
                placeholder="Type Site Name"
                name="newSiteName"
                ref={this.setupNewSiteRef}
                onClickRemove={this.handleClickUndoAdd}
              />
              <ConfirmAddButton onClick={this.handleConfirmAddSite} />
            </AddRow>
          )}
          {!addProjectActive && !!isEmptyQuery && !projectsToAdd.length && (
            <NoResults>Select a project to edit its sites</NoResults>
          )}
          {(addProjectActive || !!projectsToAdd.length) && (
            <NoResults>Finish adding your projects to add or edit sites.</NoResults>
          )}
        </FormBody>
        <ConfirmRow>
          <SaveButton
            type="submit"
            disabled={isFormDisabled}
            onClick={this.handleClickSave}
          />
          {!pristine && !submitting && (
            <CancelButton onClick={this.handleClickCancel}>Cancel</CancelButton>
          )}
        </ConfirmRow>
      </Form>
    )
  }
}

export default reduxForm<IProjectSettingsProps, IProps>({
  form: 'projectSettings',
})(ProjectSettingsPane)
