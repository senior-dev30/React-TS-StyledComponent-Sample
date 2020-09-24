import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" push />
      )
    }
  />
)

function mapState(state: any) {
  return {
    authenticated: !!state.session.token,
  }
}

export default connect(mapState)(PrivateRoute)
