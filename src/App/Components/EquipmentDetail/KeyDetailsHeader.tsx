import React from 'react'
import styled, { withTheme } from 'styled-components'

import { Image } from '../Global'
import { ActionButton } from '../Global/Buttons'

import { ThemeInterface } from '../../Themes'
import { IEquipmentData } from '../../Redux/EquipmentRedux'

const InformationSection = styled.div`
  padding: 5px 0 20px;
  width: 450px;
  display: flex;
`

const ImageContainer = styled.div`
  width: 210px;
  display: flex;
  align-items: flex-start;
`

const InformationSectionTextContainer = styled.div`
  margin-left: 34px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const InformationSectionTitle = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.3px;
  line-height: 21px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const InformationSectionDetailsContainer = styled.div``

const InformationSectionDetailsRow = styled.div`
  display: flex;
  margin: 5px 0;
`

const InformationSectionDetailsRowImageContainer = styled.div`
  flex-shrink: 0;
  margin-right: 10px;
  width: 25px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const InformationSectionDetailsRowTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const InformationSectionDetailsRowLabel = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
`

const InformationSectionDetailsRowText = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.3px;
  line-height: 21px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

// types
interface IProps {
  equipmentItem: IEquipmentData
  hideActionButton?: boolean
  wideAspectRatio?: boolean
  showOnMap?(): void
  theme: ThemeInterface
  location?: any
}

export default withTheme(
  ({ equipmentItem, hideActionButton, wideAspectRatio, showOnMap, theme }: IProps) => {
    const hanldleShowOnMapClick = () => showOnMap && showOnMap()

    return (
      <InformationSection>
        <ImageContainer>
          <Image
            height={wideAspectRatio ? 135 : 210}
            width={210}
            image={theme.images.catHero}
            cover
          />
        </ImageContainer>
        <InformationSectionTextContainer>
          <InformationSectionTitle>
            {`${equipmentItem.manufacturer || ''} ${equipmentItem.plantNumber ||
              ''} ${equipmentItem.category || ''}`}
          </InformationSectionTitle>
          <InformationSectionDetailsContainer>
            {equipmentItem.owner && (
              <InformationSectionDetailsRow>
                <InformationSectionDetailsRowImageContainer>
                  <Image height={20} width={24} image={theme.images.lender} />
                </InformationSectionDetailsRowImageContainer>
                <InformationSectionDetailsRowTextContainer>
                  <InformationSectionDetailsRowLabel>
                    Owner
                  </InformationSectionDetailsRowLabel>
                  <InformationSectionDetailsRowText>
                    {equipmentItem.owner}
                  </InformationSectionDetailsRowText>
                </InformationSectionDetailsRowTextContainer>
              </InformationSectionDetailsRow>
            )}
            {equipmentItem.serialNumber && (
              <InformationSectionDetailsRow>
                <InformationSectionDetailsRowImageContainer>
                  <Image height={24} width={23} image={theme.images.gear} />
                </InformationSectionDetailsRowImageContainer>
                <InformationSectionDetailsRowTextContainer>
                  <InformationSectionDetailsRowLabel>
                    Vehicle Serial No
                  </InformationSectionDetailsRowLabel>
                  <InformationSectionDetailsRowText>
                    {equipmentItem.serialNumber}
                  </InformationSectionDetailsRowText>
                </InformationSectionDetailsRowTextContainer>
              </InformationSectionDetailsRow>
            )}
            {equipmentItem.site && (
              <InformationSectionDetailsRow>
                <InformationSectionDetailsRowImageContainer>
                  <Image height={26} width={16} image={theme.images.location} />
                </InformationSectionDetailsRowImageContainer>
                <InformationSectionDetailsRowTextContainer>
                  <InformationSectionDetailsRowLabel>
                    Location
                  </InformationSectionDetailsRowLabel>
                  <InformationSectionDetailsRowText>
                    {equipmentItem.site}
                  </InformationSectionDetailsRowText>
                </InformationSectionDetailsRowTextContainer>
              </InformationSectionDetailsRow>
            )}
          </InformationSectionDetailsContainer>
          {!hideActionButton && (
            <ActionButton width={110} onClick={hanldleShowOnMapClick} keepCase noMargin>
              Show on Map
            </ActionButton>
          )}
        </InformationSectionTextContainer>
      </InformationSection>
    )
  },
)
