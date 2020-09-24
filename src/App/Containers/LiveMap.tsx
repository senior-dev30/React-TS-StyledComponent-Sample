import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components'
import { connect } from 'react-redux'

// component imports
import { Image, SearchInput, FullScreenModal } from '../Components/Global'
import { CustomSelect } from '../Components/Global/Forms'
import GoogleMap from '../Components/LiveMap/GoogleMap'
import ManageSites from '../Components/LiveMap/ManageSites'
import { EquipmentDetail } from '../Components/EquipmentDetail'
import { IssueLog } from '../Components/EquipmentDetail'

// redux imports
import MapActions, { IWeather, IFetchStatus } from '../Redux/MapRedux'

// type imports
import { ThemeInterface } from '../Themes'
import { ISite, ImmutableISiteArray, SiteType } from '../Redux/SiteRedux'
import { IEquipmentData } from '../Redux/EquipmentRedux'

const Container = styled.div`
  position: relative;
  height: 100vh;
  overflow-y: scroll;
`

const OverlayBox = styled.div`
  position: fixed;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 3px 4px 0 rgba(0, 0, 0, 0.06),
    0 1px 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const SiteSelectOverlayContainer = styled(OverlayBox)`
  top: 16px;
  left: 176px;
  height: 49px;
  z-index: 2;
`

const PlantSearchOverlayContainer = styled(OverlayBox)`
  top: 16px;
  right: 16px;
  width: 280px;
  height: 49px;
  transition: all 0.1s ease-out;
  @media screen and (max-width: 900px) {
    opacity: 0;
    visibility: hidden;
  }
`

interface PlantSearchResultsProps {
  visible: boolean
}
const PlantSearchResultsOverlayContainer = styled(OverlayBox)<PlantSearchResultsProps>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  top: ${({ visible }) => (visible ? 73 : 49)}px;
  top: 73px;
  right: 16px;
  width: 280px;
  max-height: 75vh;
  overflow-y: scroll;
  padding: 10px;
  border: 0;
  flex-wrap: wrap;
  transition: all 0.1s ease-out;
`

interface PlantResultProps {
  selected: boolean
}
const PlantResult = styled.div<PlantResultProps>`
  height: 36px;
  margin-bottom: 5px;
  flex-basis: 49.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  letter-spacing: 0.5px;
  line-height: 17px;
  text-transform: uppercase;
  color: ${({ theme, selected }) => (selected ? theme.colors.white : theme.colors.gray)};
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.blue : theme.colors.bluishWhite};
  border-radius: 2px;
  border: 1px solid ${({ theme, selected }) => (selected ? 'none' : theme.colors.gray)};
  cursor: pointer;
`

const SiteSelectContinaer = styled.div`
  height: 28px;
  width: 260px;
`

const ManageSitesFooter = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 7px 23px 0;
  height: 39px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.2px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.blue};
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid #dddddd;
`

const FooterImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

const FooterText = styled.div``

const WeatherContainer = styled.div`
  display: flex;
  padding-left: 45px;
`

const WeatherItem = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`

const WeatherImage = styled(Image)`
  margin-right: 5px;
`

const WeatherDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TitleMetric = styled.div`
  height: 18px;
  width: 31px;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`

const SecondaryMetric = styled.div`
  height: 12px;
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 9px;
  font-weight: bold;
  line-height: 12px;
`

const MapContainer = styled.div`
  height: 100%;
  width: calc(100% - 160px);
  position: fixed;
  top: 0;
`

const Loading = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray};
  z-index: 2;
`

const NoResults = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray};
`

// types
interface MapStateTypes {
  sites: SiteType
  map: {
    site: ISite
    equipment: IEquipmentData[]
    weather: IWeather
    fetchStatus: IFetchStatus
  }
}

interface MapPropsTypes {
  sites: ImmutableISiteArray
  site: ISite
  equipment: IEquipmentData[]
  weather: IWeather
  fetchStatus: IFetchStatus
}

interface IProps {
  loadMap(siteID: number): void
  location: any
  theme: ThemeInterface
}

interface StateProps {
  selectedSite?: ISite
  selectedEquipmentID?: number
  equipmentModalIsOpen: boolean
  issueLogModalIsOpen: boolean
  manageSitesModalIsOpen: boolean
  initialLoad: boolean
  currentLat?: number
  currentLong?: number
  query: string
}

class LiveMap extends Component<IProps & MapPropsTypes, StateProps> {
  searchInputRef: any
  state: StateProps = {
    selectedSite: !!this.props.sites.length ? this.props.sites[0] : undefined,
    selectedEquipmentID: undefined,
    equipmentModalIsOpen: false,
    issueLogModalIsOpen: false,
    manageSitesModalIsOpen: false,
    initialLoad: true,
    currentLat: undefined,
    currentLong: undefined,
    query: '',
  }

  componentDidMount = () => {
    // load the map data for the default site
    if (this.state.selectedSite && this.state.selectedSite.siteID) {
      this.props.loadMap(this.state.selectedSite.siteID)
    }
  }

  componentDidUpdate = (prevProps: IProps & MapPropsTypes, prevState: any) => {
    const { sites, loadMap } = this.props
    const { selectedSite, currentLat, currentLong } = this.state

    if (
      this.state.initialLoad &&
      prevProps.fetchStatus.fetching &&
      !this.props.fetchStatus.fetching
    ) {
      this.setState({ initialLoad: false })
    }
    // reload map if sites change
    if (sites !== prevProps.sites && !!sites.length) {
      if (sites[0].hasOwnProperty('siteID')) return loadMap(sites[0].siteID)
    }
    // reload map if selectedSite changes
    if (selectedSite && selectedSite !== prevState.selectedSite) {
      // and close the equipment modal from previous site equipment if open
      this.setState({ equipmentModalIsOpen: false })
      return loadMap(selectedSite.siteID)
    }

    // move the map to a given plant if routed via a history.push
    const equipmentID = this.props.location.state
      ? this.props.location.state.equipmentID
      : null
    if (!currentLat && !currentLong && equipmentID)
      this.handleMoveMapFromSite(equipmentID)
  }

  handleSiteSelection = (selectedSite: ISite) => {
    if (selectedSite)
      this.setState({
        selectedSite,
        currentLat: undefined,
        currentLong: undefined,
      })
  }

  handleMoveMapFromSite = (selectedEquipmentID: number, openModal = false) => {
    const selectedEquipment = this.props.equipment.find(
      item => item.equipmentID === selectedEquipmentID,
    )
    if (selectedEquipment)
      this.setState({
        equipmentModalIsOpen: openModal,
        selectedEquipmentID: selectedEquipment.equipmentID,
        currentLat: selectedEquipment.latitude,
        currentLong: selectedEquipment.longitude,
      })
  }

  // search handlers
  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    this.setState({ query: event.target.value.toUpperCase() })
  }

  handleSearchResultClick = (plant: IEquipmentData) => () => {
    this.handleMoveMapFromSite(plant.equipmentID)
    this.clearSearch()
    this.searchInputRef.value = plant.plantNumber
  }

  clearSearch = () => this.setState({ query: '' })

  clearSearchAndSearchField = () => {
    this.clearSearch()
    if (this.searchInputRef) this.searchInputRef.value = ''
  }

  // modal open/close handlers
  handleOpenEquipmentModal = (selectedEquipmentID: number) => {
    this.handleMoveMapFromSite(selectedEquipmentID, true)
  }

  handleCloseEquipmentModal = () => {
    this.setState({ equipmentModalIsOpen: false, selectedEquipmentID: undefined })
  }

  handleOpenIssueLogModal = () => this.setState({ issueLogModalIsOpen: true })

  handleCloseIssueLogModal = () =>
    this.setState({ issueLogModalIsOpen: false, equipmentModalIsOpen: true })

  handleOpenManageSitesModal = () => {
    this.setState({ manageSitesModalIsOpen: true })
  }

  handleCloseManageSitesModal = () => {
    this.setState({ manageSitesModalIsOpen: false })
  }

  // render props
  renderFooter = () => (
    <ManageSitesFooter onClick={this.handleOpenManageSitesModal}>
      <FooterImageContainer>
        <Image width={12} height={12} image={this.props.theme.images.accentGear} />
      </FooterImageContainer>
      <FooterText>Manage Sites</FooterText>
    </ManageSitesFooter>
  )

  // refs
  setupSearchInputRef = (ref: any) => (this.searchInputRef = ref)

  render = () => {
    const {
      selectedEquipmentID,
      initialLoad,
      currentLat,
      currentLong,
      query,
      equipmentModalIsOpen,
      issueLogModalIsOpen,
      manageSitesModalIsOpen,
    } = this.state
    const { sites, site, weather, equipment, theme, fetchStatus } = this.props
    const displayLatitude = currentLat && currentLong ? currentLat : site.latitude
    const displayLongitude = currentLat && currentLong ? currentLong : site.longitude

    return (
      <Container>
        {!manageSitesModalIsOpen && !issueLogModalIsOpen && (
          <SiteSelectOverlayContainer>
            <SiteSelectContinaer>
              <CustomSelect
                options={sites.asMutable()}
                onSelect={this.handleSiteSelection}
                valueKey="siteID"
                displayKey="name"
                initialValue={sites.asMutable()[0]}
                height={28}
                width={270}
                offset={-12}
                renderFooter={this.renderFooter}
              />
            </SiteSelectContinaer>
            {!!weather.temp && !!weather.status && (
              <WeatherContainer>
                <WeatherItem>
                  <WeatherImage height={21} width={32} image={theme.images.cloudy} />
                  <WeatherDataContainer>
                    <TitleMetric>{weather.temp}°</TitleMetric>
                    <SecondaryMetric>{weather.status}</SecondaryMetric>
                  </WeatherDataContainer>
                </WeatherItem>
              </WeatherContainer>
            )}
          </SiteSelectOverlayContainer>
        )}
        {!equipmentModalIsOpen && !manageSitesModalIsOpen && !issueLogModalIsOpen && (
          <>
            <PlantSearchOverlayContainer>
              <SearchInput
                placeholder="Search Assets"
                onChange={this.handleSearch}
                ref={this.setupSearchInputRef}
              />
            </PlantSearchOverlayContainer>
            <PlantSearchResultsOverlayContainer visible={!!query}>
              {query &&
                equipment
                  .filter(plant => plant.plantNumber && plant.plantNumber.includes(query))
                  .map(plant => (
                    <PlantResult
                      key={plant.equipmentID}
                      onClick={this.handleSearchResultClick(plant)}
                      selected={
                        plant.latitude === currentLat && plant.longitude === currentLong
                      }
                    >
                      {plant.plantNumber}
                    </PlantResult>
                  ))}
              {!equipment.filter(
                plant => plant.plantNumber && plant.plantNumber.includes(query),
              ).length && <NoResults>No results</NoResults>}
            </PlantSearchResultsOverlayContainer>
          </>
        )}
        {(fetchStatus.fetching || initialLoad) && (
          <Loading>Loading map data for your sites</Loading>
        )}
        {!initialLoad && site.latitude && site.longitude && (
          <MapContainer onClick={this.clearSearchAndSearchField}>
            <GoogleMap
              latitude={displayLatitude.toString()}
              longitude={displayLongitude.toString()}
              equipment={equipment}
              onClickMarker={this.handleOpenEquipmentModal}
            />
          </MapContainer>
        )}
        {equipmentModalIsOpen &&
          !manageSitesModalIsOpen &&
          selectedEquipmentID &&
          !issueLogModalIsOpen && (
            <FullScreenModal
              onClickClose={this.handleCloseEquipmentModal}
              hideBackground
              top={70}
            >
              <EquipmentDetail
                equipmentID={selectedEquipmentID}
                showOnMap={this.handleCloseEquipmentModal}
                showIssueLog={this.handleOpenIssueLogModal}
              />
            </FullScreenModal>
          )}
        {issueLogModalIsOpen && selectedEquipmentID && (
          <IssueLog
            equipmentID={selectedEquipmentID}
            onClickClose={this.handleCloseIssueLogModal}
          />
        )}
        {manageSitesModalIsOpen && (
          <ManageSites onClickClose={this.handleCloseManageSitesModal} />
        )}
      </Container>
    )
  }
}

const mapState = ({
  map: { site, equipment, weather, fetchStatus },
  sites,
}: MapStateTypes): MapPropsTypes => {
  return {
    sites: sites.entities,
    site,
    equipment,
    weather,
    fetchStatus,
  }
}

const mapDispatch = (dispatch: any) => ({
  loadMap: (siteID: number) => dispatch(MapActions.loadMap(siteID)),
})

export default withTheme(
  connect(
    mapState,
    mapDispatch,
  )(LiveMap),
)
