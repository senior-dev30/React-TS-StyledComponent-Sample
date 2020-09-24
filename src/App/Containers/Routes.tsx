import React, { Component, Suspense, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// serve app-wide architecture components in initial bundle
import PrivateRoute from './PrivateRoute'
import { Loading } from '../Components/Global'
import Sidebar from '../Components/Global/Sidebar'

// lazy load pages if a user might not go to it during a session
const Login = lazy(() => import('./Login'))
const LiveMap = lazy(() => import('./LiveMap'))
const Equipment = lazy(() => import('./Equipment'))
const EquipmentDetail = lazy(() => import('./IndividualEquipment'))
const Dashboard = lazy(() => import('./Analytics/Dashboard'))
const Reports = lazy(() => import('./Analytics/Reports'))
const Settings = lazy(() => import('./Settings'))

// Suspense causes `react-router` to throw a warning due to underlying `react-is` package;
// will be fixed in `react-router` folowing the next release of `react-is`
// The immediate fix is to use render instead of component props
//
// see: https://github.com/ReactTraining/react-router/issues/6471
// issue: https://github.com/ReactTraining/react-router/issues/6420
class AppRoot extends Component<any> {
  render() {
    return (
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/login" render={props => <Login {...props} />} />
          <Sidebar>
            <Suspense fallback={<Loading />}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/equipment/:equipmentID"
                  component={EquipmentDetail}
                />
                <PrivateRoute path="/equipment" component={Equipment} />
                <PrivateRoute path="/analytics/dashboard" component={Dashboard} />
                <PrivateRoute path="/analytics/reports" component={Reports} />
                <PrivateRoute path="/settings" component={Settings} />
                <PrivateRoute exact path="/" component={LiveMap} />
                <Redirect to="/" />
              </Switch>
            </Suspense>
          </Sidebar>
        </Switch>
      </Suspense>
    )
  }
}

export default AppRoot
