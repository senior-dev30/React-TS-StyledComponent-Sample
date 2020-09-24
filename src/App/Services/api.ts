import apisauce, { ApiResponse, ApisauceInstance } from 'apisauce'
import env from '../Config/Env'
import { ICreateReportData } from '../Redux/ReportRedux'
import { ICreateProjectData } from '../Redux/ProjectRedux'
import { ICreateIssue, IContractData } from '../Redux/EquipmentRedux'
import { ICreateSiteData } from '../Redux/SiteRedux'

interface IGenericSauceCall {
  func(...args: any[]): Promise<ApiResponse<{}>>
}

export interface IApi {
  [key: string]: IGenericSauceCall
}

export default class ApiCreator {
  public api: ApisauceInstance
  constructor() {
    this.api = apisauce.create({
      baseURL: env.API_URL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user') || ''}`,
      },
      timeout: 15000,
    })
  }

  // Analytics Routes
  public loadAnalytics = (
    dateFrom: string,
    dateTo: string,
    projects: number[],
    sites: number[],
    customers: number[],
    kpis = [],
  ) => this.api.post(`/analytics`, { dateFrom, dateTo, projects, sites, customers, kpis })

  // Customer Routers
  public loadCustomers = () => this.api.get(`/customers`)

  // Equipment Routes
  public loadEquipment = () => this.api.get(`/equipment`)

  public loadEquipmentDetail = (equipmentID: number) =>
    this.api.get(`/equipment/${equipmentID}`)

  public reportEquipmentIssue = (issue: ICreateIssue) => this.api.post(`/issues`, issue)

  public assignEquipment = (contract: IContractData) =>
    this.api.post(`/contract`, contract)

  public unassignEquipment = (equipmentID: number) =>
    this.api.put(`/contract/end`, equipmentID)

  // Map Routes
  public loadMap = (siteID: string) => this.api.post(`/map`, { siteID })

  // Project Routes
  public loadProjects = () => this.api.get(`/projects`)

  public addProject = (project: ICreateProjectData) => this.api.post(`/projects`, project)

  public updateProjectSites = (projectID: number, sites: number[]) =>
    this.api.put(`projects/${projectID}/sites`, { sites })

  // Report Routes
  public loadReports = () => this.api.get(`/reports`)

  public createReport = (reportData: ICreateReportData) =>
    this.api.post(`/reports`, reportData)

  public updateReport = (reportID: number, reportData: ICreateReportData) =>
    this.api.put(`/reports/${reportID}`, reportData)

  public deleteReport = (reportID: number) => this.api.delete(`/reports`, { reportID })

  public downloadReport = (id: number) =>
    this.api.get(`/reports/${id}`, {}, { responseType: 'blob' })

  // Site Routes
  public loadSites = () => this.api.get(`/sites`)

  public loadDetailedSites = () => this.api.get(`/sites/details`)

  public addSite = (site: ICreateSiteData) => this.api.post(`/sites`, site)

  // User Routes
  public login = (email: string, password: string) =>
    this.api.post(`/user/login`, {
      email,
      password,
    })

  public loadUser = () => this.api.get(`/user`)

  public refreshToken = () => this.api.get(`/user/refresh`)

  // Workspace Routes
  public loadWorkspace = () => this.api.get(`/workspace`)
}
