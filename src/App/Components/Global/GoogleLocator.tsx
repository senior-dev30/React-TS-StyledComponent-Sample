import React from 'react'

import PlacesAutocomplete, {
  getLatLng,
  geocodeByPlaceId,
  geocodeByAddress,
} from 'react-places-autocomplete'

export { getLatLng, geocodeByPlaceId, geocodeByAddress }

export interface RenderGoogleLocatorChildrenProps {
  getInputProps(props: any): void
  getSuggestionItemProps(suggestion: any): void
  suggestions: any[]
  loading?: boolean
}

interface GoogleLocatorProps {
  value: string
  onChange(address: string): void
  onSelect(address: string, placeId?: string): void
  searchOptions: {
    [key: string]: any
  }
  renderChildren(props: any): any
}

class GoogleLocator extends React.Component<GoogleLocatorProps> {
  render = () => {
    const { value, onChange, onSelect, searchOptions, renderChildren } = this.props

    return (
      <PlacesAutocomplete
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        searchOptions={searchOptions}
      >
        {renderChildren}
      </PlacesAutocomplete>
    )
  }
}

export default GoogleLocator
