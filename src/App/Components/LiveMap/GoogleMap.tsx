import React, { Component } from 'react'
import { GoogleMap, withGoogleMap } from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { withTheme } from 'styled-components'

// component imports
import PlantMarker from './PlantMarker'

// type imports
import { IEquipmentData } from '../../Redux/EquipmentRedux'
import { ThemeInterface } from '../../Themes'

// custom map style
import styles from './GoogleMapSilverStyles.json'

const defaultOptions: any = {
  styles,
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
}

interface IProps {
  latitude: string
  longitude: string
  equipment: IEquipmentData[]
  onClickMarker(equipmentID: number): void
  theme: ThemeInterface
}

class MyGoogleMap extends Component<IProps> {
  shouldComponentUpdate(nextProps: IProps) {
    return (
      this.props.latitude !== nextProps.latitude ||
      this.props.longitude !== nextProps.longitude
    )
  }

  render = () => {
    const { latitude, longitude, equipment, onClickMarker, theme } = this.props
    const MyGoogleMap = withGoogleMap(() => (
      <GoogleMap
        defaultCenter={{
          lat: Number(latitude) || 40.756795,
          lng: Number(longitude) || -73.954298,
        }}
        defaultZoom={12}
        defaultOptions={defaultOptions}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
          minimumClusterSize={5}
          maxZoom={20}
          styles={[
            {
              url: theme.images.mapGroup1,
              height: 53,
              lineHeight: 53,
              width: 53,
            },
            {
              url: theme.images.mapGroup2,
              height: 56,
              lineHeight: 56,
              width: 56,
            },
            {
              url: theme.images.mapGroup3,
              height: 66,
              lineHeight: 66,
              width: 66,
            },
            {
              url: theme.images.mapGroup4,
              height: 78,
              lineHeight: 78,
              width: 78,
            },
            {
              url: theme.images.mapGroup5,
              height: 90,
              lineHeight: 90,
              width: 90,
            },
          ]}
        >
          {equipment.map(plant => (
            <PlantMarker key={plant.equipmentID} plant={plant} onClick={onClickMarker} />
          ))}
        </MarkerClusterer>
      </GoogleMap>
    ))

    const containerElement = <div style={{ height: '100%' }} />
    const mapElement = <div style={{ height: '100%' }} />

    return <MyGoogleMap containerElement={containerElement} mapElement={mapElement} />
  }
}

export default withTheme(MyGoogleMap)
