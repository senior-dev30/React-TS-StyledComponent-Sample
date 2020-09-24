import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Field, WrappedFieldProps } from 'redux-form'

// import images from '../../Themes/images'

const FormContainer = styled.div`
  width: 100%;
  border-radius: 6px;
`

const BorderRadius = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 3px 4px 0 rgba(0, 0, 0, 0.06),
    0 1px 5px 0 rgba(0, 0, 0, 0.1);
`

const FormRow = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
`

interface FormIconProps {
  icon: string
}
const FormIcon = styled.div<FormIconProps>`
  width: 35px;
  height: 24px;
  background-image: url(${({ icon }) => icon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

/* hidden until redux-form validation is written */
// const VerifiedIcon = styled(FormIcon)`
//   width: 12px;
// `

interface FormInputProps {
  [key: string]: any
}
const FormInput = styled.input<FormInputProps>`
  width: 100%;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  border: none;
  color: ${({ theme }) => theme.colors.darkGray};
  padding: 10px 5px;
  margin: 0 5px;
  font-family: ${({ theme }) => theme.fonts.base};
`

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`

const renderFormInput = (type: string, placeholder: string) => (
  props: WrappedFieldProps,
) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.input.onChange(event.target.value)
  }

  return (
    <FormInput
      value={props.input.value}
      onChange={handleChange}
      type={type}
      placeholder={placeholder}
      autoComplete={type === 'password' ? 'current-password' : 'off'}
    />
  )
}

const EmailInput = renderFormInput('email', 'Email')
const PasswordInput = renderFormInput('password', 'Password')
const UsernameInput = renderFormInput('text', 'Username')

const getTypedInput = (type: string) => {
  switch (type) {
    case 'email':
      return EmailInput
    case 'password':
      return PasswordInput
    case 'text':
    default:
      return UsernameInput
  }
}

interface IRow {
  icon: string
  placeholder: string
  name: string
  type: string
}

interface IProps {
  formRows: IRow[]
}
export default class Form extends Component<IProps> {
  render = () => {
    const { formRows } = this.props
    return (
      <FormContainer>
        <BorderRadius>
          {!!formRows &&
            !!formRows.length &&
            formRows.map((row, idx) => {
              return (
                <Fragment key={idx}>
                  <FormRow>
                    <FormIcon icon={row.icon} />
                    <Field component={getTypedInput(row.type)} name={row.name} />
                    {/* hidden until redux-form validation is written */}
                    {/* <VerifiedIcon icon={true ? images.checkmark : images.xmark} /> */}
                  </FormRow>
                  {idx !== formRows.length - 1 && <Divider />}
                </Fragment>
              )
            })}
        </BorderRadius>
      </FormContainer>
    )
  }
}
