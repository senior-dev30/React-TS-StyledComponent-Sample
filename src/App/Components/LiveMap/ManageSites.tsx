import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled, { withTheme } from 'styled-components'

// relative imports
import env from '../../Config/Env'

// component imports
import { FullScreenModal, Image } from '../Global'
import { PageTitleRow, PageTitle, PageTitleRowButton } from '../../Components/Global/Page'

// redux imports
import SiteActions, { SiteType, ImmutableISiteArray, ISite } from '../../Redux/SiteRedux'

// type imports
import { ThemeInterface } from '../../Themes'
import AddSite from './AddSite'

// styled components
const SitesContainer = styled.div`
  margin: 40px 0;
`

const SingleSiteContainer = styled.div`
  padding: 15px 10px;
  margin-bottom: 6px;
  height: 150px;
  display: flex;
  align-items: center;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.bluishWhite};
`

const MapContainer = styled.div`
  position: relative;
  height: 120px;
  width: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const InformationContainer = styled.div`
  flex: 1;
  padding: 15px 0;
  padding: 0 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const InformationIconContainer = styled.div`
  height: 100%;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NameRow = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.23px;
  line-height: 23px;
  color: ${({ theme }) => theme.colors.darkGray};
`

const OtherDetailsRow = styled.div`
  display: flex;
  padding-left: 36px;
`

const DetailItem = styled.div`
  flex-basis: 200px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Label = styled.div`
  color: #9fa5b0;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`

const Metric = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.3px;
  line-height: 21px;
`

const ActiveButtonContainer = styled.div`
  padding: 0 37px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

interface ActiveButtonProps {
  active: boolean
}
const ActiveButton = styled.button<ActiveButtonProps>`
  height: 38px;
  width: 100px;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  color: ${({ theme, active }) => (active ? theme.colors.operating : theme.colors.white)};
  border: ${({ theme, active }) =>
    active ? `1px solid ${theme.colors.operating}` : 'none'};
  border-radius: 2px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.blue};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(206, 206, 209, 0.25);
  text-transform: uppercase;
  cursor: pointer;
`

// types
interface MapStateTypes {
  sites: SiteType
}

interface MapPropsTypes {
  sites: ImmutableISiteArray
}

interface IProps {
  onClickClose(): void
  loadDetailedSites(): void
  theme: ThemeInterface
}

const ManageSites = ({
  sites,
  onClickClose,
  loadDetailedSites,
  theme,
}: IProps & MapPropsTypes) => {
  const [modalOpen, setModalOpen] = useState(false)

  // load details on mount
  useEffect(() => {
    loadDetailedSites()
  }, [])

  const handleAddSiteClick = () => setModalOpen(true)

  const handleCloseAddSite = () => setModalOpen(false)

  const getStaticImage = (site: ISite) => {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${site.latitude}%2c%20${
      site.longitude
    }&zoom=12&size=190x165&key=${
      env.GOOGLE_API_KEY
    }&style=feature:all|element:labels|visibility:off&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=480x360`
  }
  return (
    <>
      {!modalOpen && (
        <FullScreenModal onClickClose={onClickClose} hideBackground>
          <PageTitleRow>
            <PageTitle>Manage Sites</PageTitle>
            <PageTitleRowButton onClick={handleAddSiteClick}>
              Add New Site
            </PageTitleRowButton>
          </PageTitleRow>
          <SitesContainer>
            {sites.map(site => (
              <SingleSiteContainer key={site.siteID}>
                <MapContainer>
                  <Image width={190} height={120} image={getStaticImage(site)} cover />
                  <MapOverlay>
                    <Image width={61} height={61} image={theme.images.mapPoint} />
                  </MapOverlay>
                </MapContainer>
                <InformationContainer>
                  <NameRow>
                    <InformationIconContainer>
                      <Image width={15} height={15} image={theme.images.siteList} />
                    </InformationIconContainer>
                    {site.name}
                  </NameRow>
                  <OtherDetailsRow>
                    <DetailItem>
                      <Label>Assets</Label>
                      <Metric>{site.assets ? `${site.assets} Active` : '-'}</Metric>
                    </DetailItem>
                    <DetailItem>
                      <Label>Site Manager</Label>
                      {site.manager && <Metric>{site.manager}</Metric>}
                    </DetailItem>
                    <DetailItem>
                      <Label>Average Utilization</Label>
                      <Metric>{site.utilisation ? `${site.utilisation}%` : '-'}</Metric>
                    </DetailItem>
                  </OtherDetailsRow>
                </InformationContainer>
                <ActiveButtonContainer>
                  <ActiveButton active>Active</ActiveButton>
                </ActiveButtonContainer>
              </SingleSiteContainer>
            ))}
          </SitesContainer>
        </FullScreenModal>
      )}
      {modalOpen && <AddSite onClickClose={handleCloseAddSite} />}
    </>
  )
}

const mapState = ({ sites }: MapStateTypes): MapPropsTypes => ({
  sites: sites.entities,
})

const mapDispatch = (dispatch: any) => ({
  loadDetailedSites: () => dispatch(SiteActions.loadDetailedSites()),
  // updateSite: (siteID: number, updateData: IUpdateData) =>
  //   SiteActions.updateSite(siteID, updateData),
})

export default withTheme(
  connect(
    mapState,
    mapDispatch,
  )(ManageSites),
)
