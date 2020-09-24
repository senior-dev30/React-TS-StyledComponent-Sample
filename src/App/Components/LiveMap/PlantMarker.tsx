/*global google*/
import React, { Component } from 'react'
import { Marker } from 'react-google-maps'
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'

import styled, { withTheme } from 'styled-components'

import { ThemeInterface } from '../../Themes'
import { IEquipmentData } from '../../Redux/EquipmentRedux'
import { withRouter } from 'react-router'

/* global google */
declare var google: any

// styled components
const InfoBoxContent = styled.div`
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #222222;
  background-color: #222222;
  color: #ffffff;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 12px;
`

const InfoItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoItem = styled.div`
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 12px;
`

// types
interface IProps {
  theme: ThemeInterface
  plant: IEquipmentData
  onClick(equipmentID: number): void
}

class PlantMarker extends Component<IProps, any> {
  marker: any
  constructor(props: any) {
    super(props)
    this.marker = null
    this.state = {
      shouldOpen: false,
    }
  }

  handleHover = () => {
    this.setState({ shouldOpen: true })
  }

  handleLeave = () => {
    this.setState({ shouldOpen: false })
  }

  handleClick = () => {
    const {
      onClick,
      plant: { equipmentID },
    } = this.props
    if (equipmentID) onClick(equipmentID)
  }

  render = () => {
    const { plant, theme } = this.props
    const image = theme.images[`${plant.category}Working`] || theme.images.mapPoint

    return (
      <Marker
        onClick={this.handleClick}
        onMouseOver={this.handleHover}
        onMouseOut={this.handleLeave}
        key={plant.equipmentID}
        position={{ lat: Number(plant.latitude), lng: Number(plant.longitude) }}
        options={{
          icon: {
            url: image,
            scaledSize: new google.maps.Size(40, 40),
          },
          position: {
            lat: Number(plant.latitude),
            lng: Number(plant.longitude),
          },
        }}
      >
        {this.state.shouldOpen && (
          <InfoBox
            options={{
              pane: 'overlayLayer',
              pixelOffset: new google.maps.Size(-46, 55),
              alignBottom: true,
              boxStyle: {
                borderRadius: `3px`,
                boxShadow: `3px 3px 10px rgba(0,0,0,0.6)`,
              },
              closeBoxURL: '',
            }}
          >
            <InfoBoxContent>
              <InfoItemsContainer>
                <InfoItem>{plant.plantNumber}</InfoItem>
                <InfoItem>{`Utilization: ${plant.utilisation}%`}</InfoItem>
              </InfoItemsContainer>
            </InfoBoxContent>
          </InfoBox>
        )}
      </Marker>
    )
  }
}

export default withTheme(withRouter<any>(PlantMarker))
