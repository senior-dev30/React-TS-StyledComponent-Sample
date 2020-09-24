import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components'
import { reduxForm, InjectedFormProps } from 'redux-form'

import { FormRows, PrimaryButton } from '../Global'
import { ThemeInterface } from '../../Themes'

const Form = styled.form`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  padding-bottom: 8px;
  padding-top: 8px;
`

interface IUser {
  email: string
  password: string
}
interface IProps {
  handleSubmit?(): void
  theme: ThemeInterface
}

class LoginForm extends Component<InjectedFormProps<IUser> & IProps> {
  render = () => {
    const { handleSubmit, pristine, submitting, theme } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <FormRows
          formRows={[
            {
              icon: theme.images.email,
              placeholder: 'Email',
              name: 'email',
              type: 'email',
            },
            {
              icon: theme.images.password,
              placeholder: 'Password',
              name: 'password',
              type: 'password',
            },
          ]}
        />
        <PrimaryButton type="submit" disabled={pristine || submitting}>
          Sign In
        </PrimaryButton>
        <ErrorMessage>
          Incorrect username or password. Please try again.
        </ErrorMessage>
      </Form>
    )
  }
}

export default withTheme(reduxForm<IUser, IProps>({ form: 'login' })(LoginForm))
