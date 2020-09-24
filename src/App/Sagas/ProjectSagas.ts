import { call, put } from 'redux-saga/effects'

import ProjectsActions, { ICreateProjectData } from '../Redux/ProjectRedux'
import SiteActions from '../Redux/SiteRedux'

export function* loadProjects(api: any) {
  const response = yield call(api.loadProjects)

  if (response.ok) {
    yield put(ProjectsActions.loadProjectsSuccess(response.data.data))
  } else {
    yield put(ProjectsActions.loadProjectsFailure("Failed to load user's projects."))
  }
}

export function* addProject(api: any, { project }: { project: ICreateProjectData }) {
  const response = yield call(api.addProject, project)

  if (response.ok) {
    yield put(ProjectsActions.addProjectSuccess())
  } else {
    yield put(ProjectsActions.addProjectFailure('Failed to add project.'))
  }
}

export function* addProjectSuccess() {
  yield put(ProjectsActions.loadProjects())
}

export function* updateProjectSites(
  api: any,
  { projectID, sites }: { projectID: number; sites: number[] },
) {
  const response = yield call(api.updateProjectSites, projectID, sites)

  if (response.ok) {
    yield put(ProjectsActions.updateProjectSitesSuccess())
  } else {
    yield put(
      ProjectsActions.updateProjectSitesFailure('Failed to update project sites.'),
    )
  }
}

export function* updateProjectSitesSuccess() {
  yield put(SiteActions.loadSites())
}
