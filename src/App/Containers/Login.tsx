import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components'
import { connect } from 'react-redux'

// component imports
import {
  Container,
  LoginContainer,
  OnboardingTextEmphasized,
} from '../Components/LoginSignup/SharedStyles'
import { SecondaryButton } from '../Components/Global'
import { LoginForm } from '../Components/LoginSignup'

// redux imports
import SessionActions from '../Redux/SessionRedux'

// type imports
import { ThemeInterface } from '../Themes'
import { History } from 'history'

// styled components
const Logo = styled.img`
  width: 200px;
`

const PasswordLink = styled.div`
  padding: 15px 0;
`

// types
interface IProps {
  loginUser(email: string, password: string): void
  loginError: string | undefined
  authenticated: boolean
  theme: ThemeInterface
  history: History
}

class Login extends Component<IProps> {
  static navigationOptions = { header: null }

  componentDidMount = () => {
    if (this.props.authenticated) this.navToHome()
  }

  componentDidUpdate = (prevProps: any) => {
    if (!prevProps.authenticated && this.props.authenticated) this.navToHome()
  }

  submit = ({ email, password }: { email: string; password: string }) => {
    if (email && password) this.props.loginUser(email, password)
  }

  navToPasswordRecovery = () => {
    // @TODO: implement
  }

  navToSignup = () => {
    // @TODO: implement
  }

  navToHome = () => this.props.history.push('/')

  render = () => {
    return (
      <Container>
        <LoginContainer>
          <Logo src={this.props.theme.images.logo} />
          <OnboardingTextEmphasized>
            Please sign in to get started.
          </OnboardingTextEmphasized>
          <LoginForm onSubmit={this.submit} destroyOnUnmount />
          <PasswordLink>
            <SecondaryButton
              text="I forgot my password"
              backgrounColor="transparent"
              onPress={this.navToPasswordRecovery}
            />
          </PasswordLink>
          <SecondaryButton
            text="I do not have an account"
            onPress={this.navToSignup}
          />
        </LoginContainer>
      </Container>
    )
  }
}

const mapState = (state: any) => {
  return {
    loginError: state.session.fetchStatus.error,
    authenticated: !!state.session.token,
  }
}

const mapDispatch = (dispatch: any) => ({
  loginUser: (email: string, password: string) =>
    dispatch(SessionActions.login(email, password)),
})

export default connect(
  mapState,
  mapDispatch,
)(withTheme(Login))
