import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import { reducer as formReducer } from 'redux-form'
import createSagaMiddleware from 'redux-saga'
import Immutable from 'seamless-immutable'

import { persistConfig } from '../Config/persistConfig'
import sagas from '../Sagas'

import { AnalyticsType } from './AnalyticsRedux'
import { CustomerType } from './CustomerRedux'
import { EquipmentType } from './EquipmentRedux'
import { MapType } from './MapRedux'
import { ProjectType } from './ProjectRedux'
import { ReportType } from './ReportRedux'
import { SessionType } from './SessionRedux'
import { SiteType } from './SiteRedux'
import { UserType } from './UserRedux'
import { WorkspaceType } from './WorkspaceRedux'

interface IRootStateRaw {
  analytics: AnalyticsType
  customer: CustomerType
  equipment: EquipmentType
  map: MapType
  projects: ProjectType
  reports: ReportType
  session: SessionType
  sites: SiteType
  user: UserType
  workspace: WorkspaceType
}

export type RootState = Immutable.Immutable<IRootStateRaw>

export default () => {
  const rootReducer = combineReducers({
    analytics: require('./AnalyticsRedux').reducer,
    customers: require('./CustomerRedux').reducer,
    equipment: require('./EquipmentRedux').reducer,
    map: require('./MapRedux').reducer,
    projects: require('./ProjectRedux').reducer,
    reports: require('./ReportRedux').reducer,
    session: require('./SessionRedux').reducer,
    sites: require('./SiteRedux').reducer,
    user: require('./UserRedux').reducer,
    workspace: require('./WorkspaceRedux').reducer,
    // redux-form
    form: formReducer,
  })

  const middleware = []
  const enhancers = []

  if (process.env.REACT_APP_ENVIRONMENT === 'development') {
    middleware.push(createLogger({ collapsed: true }))
  }

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware({})
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer, compose(...enhancers))
  const persistor = persistStore(store)

  sagaMiddleware.run(sagas)

  return {
    store,
    persistor,
  }
}
