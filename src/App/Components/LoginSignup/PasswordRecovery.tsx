import React, { Component } from 'react'

// component imports
import { Container, OnboardingTitle, OnboardingText } from './SharedStyles'
import { FormRows, PrimaryButton } from '../Global'

// type imports
import { ThemeInterface } from '../../Themes'

// types
type Props = {
  theme: ThemeInterface
}

export default class ForgotPassword extends Component<Props> {
  handleClick = () => null

  render = () => (
    <Container>
      <OnboardingTitle>Password Recovery</OnboardingTitle>
      <OnboardingText>
        Please enter your account's email address and we will send you a
        password recovery link right away.
      </OnboardingText>
      <FormRows
        formRows={[
          {
            icon: this.props.theme.images.email,
            placeholder: 'Email',
            name: 'email',
            type: 'email',
          },
        ]}
      />
      <PrimaryButton type="submit" disabled={false}>
        Submit
      </PrimaryButton>
    </Container>
  )
}
