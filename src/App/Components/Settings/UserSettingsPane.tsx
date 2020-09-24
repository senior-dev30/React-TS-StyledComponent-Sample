import React, { Component } from 'react'
import styled from 'styled-components'
import { Field as ReduxFormField, reduxForm, InjectedFormProps } from 'redux-form'
import { BlankTextInput as Input } from '../Global/Forms'

import PaneHeader from './PaneHeader'
import SaveButton from './SaveButton'

const Form = styled.form`
  margin: 50px 10px;
  width: 260px;
`

const InputPair = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin: 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.darkGray};
`

// @TODO: move VisibilityToggledInput to Global/Forms and make it depend on
// BlankTextInput instead of InputBase (same styles)
const InputBase = styled(ReduxFormField)<any>`
  padding: 6px 10px;
  height: 32px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.07);
`

//NB: may display erroenous lint errors
const VisibilityToggledInput = styled(InputBase)`
  background-repeat: no-repeat;
  background-size: 18px ${({ type }) => (type === 'input' ? 12 : 16)}px;
  background-position: right center;
  background-origin: content-box;
  background-image: url(${({ theme, type }) =>
    type === 'input' ? theme.images.visible : theme.images.hidden});
`

const VisibilityToggleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 32px;
  width: 32px;
  cursor: pointer;
`

const NoResults = styled.div`
  height: 32px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray};
`

// types
interface IAsset {
  category: string
  manufacturer: string
  plantNumber: string
}
interface IProps {
  handleSubmit?(): void
}

interface IState {
  visible: boolean
}

class UserSettingsPane extends Component<InjectedFormProps<IAsset> & IProps, IState> {
  state = { visible: false }

  handleVisibilityClick = () => this.setState({ visible: !this.state.visible })

  render = () => {
    const { visible } = this.state
    const { handleSubmit, pristine, submitting } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <PaneHeader title="User Settings" imageName="userSettings" />
        <InputPair>
          <Label>Username</Label>
          <Input
            name="username"
            placeholder="Username"
            autoComplete="username"
            disabled={true} // disabled until functionality exists
          />
        </InputPair>
        <InputPair>
          <Label>Password</Label>
          <VisibilityToggledInput
            name="password"
            component="input"
            type={visible ? 'input' : 'password'}
            placeholder="Password"
            autoComplete="current-password"
            disabled={true} // disabled until functionality exists
          />
          <VisibilityToggleOverlay onClick={this.handleVisibilityClick} />
        </InputPair>
        <InputPair>
          <Label>New password</Label>
          <VisibilityToggledInput
            name="newPassword"
            component="input"
            type={visible ? 'input' : 'password'}
            placeholder="Type new password"
            autoComplete="new-password"
            disabled={true} // disabled until functionality exists
          />
          <VisibilityToggleOverlay onClick={this.handleVisibilityClick} />
        </InputPair>
        <InputPair>
          <Label>Confirm password</Label>
          <VisibilityToggledInput
            name="confirmPassword"
            component="input"
            type={visible ? 'input' : 'password'}
            placeholder="Confirm new password"
            autoComplete="new-password"
            disabled={true} // disabled until functionality exists
          />
          <VisibilityToggleOverlay onClick={this.handleVisibilityClick} />
        </InputPair>
        <SaveButton disabled={pristine || submitting} />
        <NoResults>*This feature coming soon</NoResults>
      </Form>
    )
  }
}

export default reduxForm<IAsset, IProps>({
  form: 'userSettings',
})(UserSettingsPane)
