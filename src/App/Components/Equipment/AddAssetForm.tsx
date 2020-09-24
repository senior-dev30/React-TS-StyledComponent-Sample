import React, { Component } from 'react'
import styled from 'styled-components'
import { reduxForm, InjectedFormProps, Field as ReduxFormField } from 'redux-form'

import { SectionTitle } from '../Global/Page'
import { ImmutableISiteArray } from '../../Redux/SiteRedux'

const Form = styled.form`
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const PanesContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 100%;
  display: flex;
`

const Pane = styled.div`
  width: 400px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
`

const FormBody = styled.div`
  margin: 21px 0 3px;
`

//@TODO -- make a global form field shared in Settings, Here, future pages
const Field = styled.div`
  height: 32px;
  width: 260px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.07);
`

const FormRow = styled.div`
  margin-bottom: 18px;
  display: flex;
  align-items: center;
`

const Input = styled(ReduxFormField)<any>`
  flex: 1;
  padding: 6px 10px;
  height: 100%;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  background-color: ${({ theme }) => theme.colors.transparent};
  color: ${({ theme }) => theme.colors.darkGray};
  border: none;
`

const Select = styled(ReduxFormField)<any>`
  flex: 1;
  padding: 6px 10px;
  height: 100%;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  background-color: ${({ theme }) => theme.colors.transparent};
  color: ${({ theme }) => theme.colors.darkGray};
  border: none;
`

const RequiredText = styled.div`
  padding-left: 16px;
  font-weight: 600;
  font-size: 12px;
  font-style: italic;
  font-weight: 500;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
`

const OptionalText = styled(RequiredText)`
  font-weight: 500;
  opacity: 0.5;
`

const AddButton = styled.button<any>`
  width: 100px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  text-transform: uppercase;
  color: ${({ theme, disabled }) => !disabled && theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  border: none;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(206, 206, 209, 0.25);
  cursor: pointer;
  :disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
  }
`

interface IAsset {
  category: string
  manufacturer: string
  plantNumber: string
}
interface IProps {
  sites?: ImmutableISiteArray
  handleSubmit?(): void
}

class AddAssetForm extends Component<InjectedFormProps<IAsset> & IProps> {
  render = () => {
    const { handleSubmit, pristine, submitting, sites } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <PanesContainer>
          <Pane>
            <SectionTitle>Asset Details</SectionTitle>
            <FormBody>
              <FormRow>
                <Field>
                  <Select name="category" component="select" type="select" placeholder="">
                    <option>Select Category</option>
                  </Select>
                </Field>
                <RequiredText>Required</RequiredText>
              </FormRow>
              <FormRow>
                <Field>
                  <Select name="manufacturer" component="select">
                    <option>Select Manufacturer</option>
                  </Select>
                </Field>
                <RequiredText>Required</RequiredText>
              </FormRow>
              <FormRow>
                <Field>
                  <Input
                    name="plantNumber"
                    component="input"
                    type="text"
                    placeholder="Enter Registry Number"
                  />
                </Field>
                <OptionalText>Optional</OptionalText>
              </FormRow>
            </FormBody>
            <AddButton type="submit" disabled={pristine || submitting}>
              Add Asset
            </AddButton>
          </Pane>
          <Pane>
            <SectionTitle>Assign to Site</SectionTitle>
            <FormBody>
              <FormRow>
                <Field>
                  <Select name="site" component="select">
                    <option>Select Site</option>
                    {sites &&
                      sites.asMutable().map(site => (
                        <option value={site.siteID} key={site.siteID}>
                          {site.name}
                        </option>
                      ))}
                  </Select>
                </Field>
              </FormRow>
            </FormBody>
          </Pane>
        </PanesContainer>
      </Form>
    )
  }
}

export default reduxForm<IAsset, IProps>({ form: 'addAsset' })(AddAssetForm)
