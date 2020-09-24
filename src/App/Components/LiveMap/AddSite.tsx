import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// component imports
import { FullScreenModal, GoogleLocator } from '../Global'
import { PageTitleRow, PageTitle, SectionTitle } from '../Global/Page'
import { Input, CustomSelect } from '../Global/Forms'

// redux imports
import SiteActions, { ICreateSiteData } from '../../Redux/SiteRedux'

// type imports
import { IProject, ProjectType, ImmutableIProjectArray } from '../../Redux/ProjectRedux'

// utils
import {
  RenderGoogleLocatorChildrenProps,
  getLatLng,
  geocodeByPlaceId,
} from '../Global/GoogleLocator'

// styled components
const Pane = styled.div`
  margin-top: 30px;
  margin-right: 40px;
  width: 400px;
  display: flex;
  flex-direction: column;
`

const FormBody = styled.div`
  margin: 21px 0 3px;
`

//@TODO -- make a global form field shared in Settings, Here, future pages
const Field = styled.div`
  position: relative;
  width: 260px;
`

const FormRow = styled.div`
  margin-bottom: 18px;
  display: flex;
  align-items: center;
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

// dropdown styled copmonents
const DropdownContainer = styled.div`
  position: absolute;
  top: 35px;
  left: 0px;
  background-color: white;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 3px 4px 0 rgba(0, 0, 0, 0.06),
    0 1px 5px 0 rgba(0, 0, 0, 0.1);
  width: 260px;
  z-index: 100;
  margin: 10px 0px;
`

const InactiveAutocompleteItemContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  transition: all 0.5s ease-out;
  cursor: pointer;
`

const ActiveAutocompleteItemContainer = styled(InactiveAutocompleteItemContainer)`
  background-color: ${({ theme }) => theme.colors.bluishWhite};
`

const AutocompleteItem = styled.div`
  padding: 10px;
`

const StyledLocation = styled.p`
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.2px;
  color: ${props => props.theme.colors.darkGray};
  margin: 0px;
`

const StyledAddress = styled.p`
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 0.2px;
  color: ${props => props.theme.colors.grey};
  margin: 0px;
`

// passed to GoogleLocator
const renderAutocomplete = ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
}: RenderGoogleLocatorChildrenProps) => (
  <Field>
    <Input
      {...getInputProps({
        placeholder: 'Add location',
      })}
    />
    <DropdownContainer>
      {suggestions.map(suggestion => {
        const AutocompleteContainer = suggestion.active
          ? ActiveAutocompleteItemContainer
          : InactiveAutocompleteItemContainer
        return (
          <AutocompleteContainer
            key={suggestion.placeId}
            {...getSuggestionItemProps(suggestion)}
          >
            <AutocompleteItem>
              <StyledLocation>{suggestion.formattedSuggestion.mainText}</StyledLocation>
              <StyledAddress>
                {suggestion.formattedSuggestion.secondaryText}
              </StyledAddress>
            </AutocompleteItem>
          </AutocompleteContainer>
        )
      })}
    </DropdownContainer>
  </Field>
)

// types
interface MapStateTypes {
  projects: ProjectType
}

interface MapPropsTypes {
  projects: ImmutableIProjectArray
}

interface AddSiteProps {
  propProjectID?: number
  createSite(site: ICreateSiteData): void
  onClickClose(): void
}

const AddSite = ({
  projects,
  propProjectID,
  createSite,
  onClickClose,
}: AddSiteProps & MapPropsTypes) => {
  // text input state logic
  const [name, setName] = useState('')
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  const [manager, setManager] = useState('')
  const handleManagerChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setManager(event.target.value)

  // select input logic
  const [projectID, setProjectID] = useState<number | undefined>(propProjectID)
  const handleProjectSelect = (project: IProject) => {
    project && project.projectID && setProjectID(project.projectID)
  }

  // Google places autocomplete state logic
  const [address, setAddress] = useState('')
  const handleAddressChange = (address: string) => {
    setAddress(address)
  }

  const [placeID, setPlaceID] = useState('')
  const handleAddressSelect = (address: string, placeID: string) => {
    setAddress(address)
    setPlaceID(placeID)
  }

  const handleSubmit = async () => {
    try {
      const geocode = await geocodeByPlaceId(placeID)
      const { lat, lng } = await getLatLng(geocode[0])
      if (lat && lng && projectID) {
        createSite({
          name,
          address,
          projectID,
          latitude: lat.toString(),
          longitude: lng.toString(),
          manager,
        })
        onClickClose()
      } else {
        throw new Error(`Couldn't generate latLng.`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const projectFromProps = projects.find(project => project.projectID === propProjectID)

  return (
    <FullScreenModal onClickClose={onClickClose} noPadding hideBackground>
      <PageTitleRow>
        <PageTitle>Add Site</PageTitle>
      </PageTitleRow>
      <Pane>
        <SectionTitle>Site Details</SectionTitle>
        <FormBody>
          <FormRow>
            <Field>
              <Input
                name="name"
                type="text"
                placeholder="Enter Site Name"
                value={name}
                onChange={handleNameChange}
              />
            </Field>
            <RequiredText>Required</RequiredText>
          </FormRow>
          <FormRow>
            <GoogleLocator
              value={address}
              onChange={handleAddressChange}
              onSelect={handleAddressSelect}
              searchOptions={{}}
              renderChildren={renderAutocomplete}
            />
            <RequiredText>Required</RequiredText>
          </FormRow>
          {propProjectID && projectFromProps && (
            <FormRow>
              <Field>
                <Input
                  name="project"
                  type="text"
                  value={projectFromProps.name}
                  disabled={true}
                />
              </Field>
            </FormRow>
          )}
          {!propProjectID && (
            <FormRow>
              <Field>
                <CustomSelect
                  placeholder="Add to Project"
                  options={projects.asMutable()}
                  onSelect={handleProjectSelect}
                  valueKey="projectID"
                  displayKey="name"
                />
              </Field>
              <RequiredText>Required</RequiredText>
            </FormRow>
          )}
          <FormRow>
            <Field>
              <Input
                name="manager"
                type="text"
                placeholder="Enter Site Manager"
                value={manager}
                onChange={handleManagerChange}
              />
            </Field>
            <OptionalText>Optional</OptionalText>
          </FormRow>
        </FormBody>
        <AddButton disabled={!name || !placeID || !projectID} onClick={handleSubmit}>
          Add Now
        </AddButton>
      </Pane>
    </FullScreenModal>
  )
}

const mapState = ({
  projects: { entities: projects },
}: MapStateTypes): MapPropsTypes => ({
  projects,
})

const mapDispatch = (dispatch: any) => ({
  createSite: (site: ICreateSiteData) => dispatch(SiteActions.createSite(site)),
})

export default connect(
  mapState,
  mapDispatch,
)(AddSite)
