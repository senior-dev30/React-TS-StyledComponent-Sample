import React, { Component, Fragment, ReactNode } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// relative imports
import images from '../../Themes/images'

// redux imports
import { UserType, IUserData } from '../../Redux/UserRedux'
import SessionActions from '../../Redux/SessionRedux'

// data
const pages = [
  { title: 'Live map', name: 'map' },
  { title: 'Equipment', name: 'equipment' },
  {
    title: 'Analytics',
    name: 'analytics',
    subPages: [
      { title: 'Dashboard', name: 'dashboard' },
      { title: 'Reports', name: 'reports' },
    ],
  },
  { title: 'Settings', name: 'settings' },
]

// styled components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.colors.bluishWhite};
`

const PageContentContainer = styled.div`
  flex: 1;
`

const SidebarContainer = styled.div`
  width: 160px;
  height: 100%;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.darkBlue};
`

const LogoContainer = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Logo = styled.img`
  width: 120px;
  margin-left: 11px; /* corrects centering for Pro superscript */
`

const CompanyImageSection = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.navy};
  border-bottom: 1px solid ${({ theme }) => theme.colors.navy};
`

const AddCompanyImageContainer = styled.div`
  height: 40px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.navy};
`

const WelcomeText = styled.span`
  padding: 7px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.2px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.colors.offWhite};
`

const PageLinkContainer = styled.div`
  width: 100%;
  flex: 0;
`

// Carrot CSS adapted from Ben Weiser: https://benweiser.com/css-triangles-within-a-div/
interface PageLinkRowProps {
  selected: boolean
}
const PageLinkRow = styled.div<PageLinkRowProps>`
  position: relative;
  height: 38px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.blue : theme.colors.transparent};
  ${({ selected, theme }) =>
    selected
      ? `&:after {
        content:''; /* Required to display content */
        position: absolute; /* Sets the position absolute to the top div */
        top: 12px;
        right: 0;
        margin-left: -10px; /* Set margin equal to border px */
        width: 0;
        z-index:1;
        height: 0;
        border-right: solid 8px ${theme.colors.bluishWhite}; /* Creates the notch */
        border-top: solid 8px transparent; /* Creates triangle effect */
        border-bottom: solid 8px transparent; /* Creates triangle effect */
      };`
      : ''}
`

const PageLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.2px;
  line-height: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.offWhite};
`

const SubpageLinkRow = styled(PageLinkRow)`
  padding-left: 36px;
  background-color: ${({ theme }) => theme.colors.navy};
  &:after {
    content: unset;
  }
`

const SubpageLink = styled(PageLink)``

interface SubpageLinkTextProps {
  selected: boolean
}
const SubpageLinkText = styled.span<SubpageLinkTextProps>`
  font-size: 13px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.offWhite};
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
`

const FooterContainer = styled.div`
  margin-bottom: 46px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const FooterLink = styled(PageLink)`
  background-color: ${({ theme }) => theme.colors.transparent};
  height: 30px;
  padding-left: 36px;
  display: flex;
  align-items: center;
`

const FooterPseudoLink = styled.div`
  background-color: ${({ theme }) => theme.colors.transparent};
  height: 30px;
  padding-left: 36px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`

interface IconProps {
  icon: string
}
const Icon = styled.div<IconProps>`
  width: 36px;
  height: 15px;
  background-image: url(${({ icon }) => icon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const AddCompanyImageIcon = styled(Icon)`
  height: 20px;
`

// types
interface MapStateTypes {
  user: UserType
}

interface MapPropsTypes {
  user?: IUserData
}

interface SidebarProps {
  children: ReactNode
  logoutUser(): void
  location?: { [key: string]: string }
}

class Sidebar extends Component<SidebarProps & MapPropsTypes> {
  state = { selectedPageIdx: 0, selectedSubpageIdx: 0 }

  componentDidMount = () => {
    this.setSidebarActiveTab()
  }

  setSidebarActiveTab = () => {
    const { location } = this.props
    const routeParts = location ? location.pathname.split('/') : null
    let selectedPageIdx = 0
    let selectedSubpageIdx = 0

    // nested
    if (pages && routeParts && routeParts.length === 3) {
      selectedPageIdx = pages.findIndex(
        page =>
          !!page.subPages &&
          page.subPages.findIndex(subPage => subPage.name === routeParts[2]) >= 0,
      )
      // @TODO: add explicit history.push('/map') redirect to change URI
      if (!pages[selectedPageIdx]) return

      const { subPages } = pages[selectedPageIdx]
      if (!!subPages) {
        selectedSubpageIdx = subPages.findIndex(subPage => subPage.name === routeParts[2])
        return this.setState({ selectedPageIdx, selectedSubpageIdx })
      }
    }

    // top-level
    if (pages && routeParts && routeParts.length == 2) {
      selectedPageIdx = pages.findIndex(page => page.name === routeParts[1])
      if (selectedPageIdx >= 0) return this.setState({ selectedPageIdx })
    }

    // @TODO: add explicit history.push('/map') redirect to change URI
    return
  }

  handlePageClick = (selectedPageIdx: number) => () => {
    this.setState({ selectedPageIdx, selectedSubpageIdx: 0 })
  }

  handleSubpageClick = (selectedSubpageIdx: number) => () =>
    this.setState({ selectedSubpageIdx })

  // @TODO: implement
  handleUploadPhotoClick = () => alert('Upload photo clicked')

  render() {
    const companyLogo = null // @TODO: implement
    const username = this.props.user ? this.props.user.firstName : null

    return (
      <Container>
        <SidebarContainer>
          <LogoContainer onClick={this.handleUploadPhotoClick}>
            <Logo src={images.sidebarLogo} />
          </LogoContainer>
          <CompanyImageSection>
            {companyLogo && <img src={`my-company-logo.png`} />}
            {!companyLogo && (
              <AddCompanyImageContainer>
                <AddCompanyImageIcon icon={images.addCompanyLogo} />
              </AddCompanyImageContainer>
            )}
            {/* @TODO: get Morning/Afternoon/Evening from System clock/dayjs */}
            <WelcomeText>{`Hello ${username ? ` ${username}` : ''}!`}</WelcomeText>
          </CompanyImageSection>
          <PageLinkContainer>
            {pages.map((page, idx) => {
              const selected = idx === this.state.selectedPageIdx
              return (
                <Fragment key={page.name}>
                  <PageLink
                    to={`/${page.name}${
                      page.subPages
                        ? `/${page.subPages[this.state.selectedSubpageIdx].name}`
                        : ''
                    }`}
                  >
                    <PageLinkRow selected={selected} onClick={this.handlePageClick(idx)}>
                      <Icon icon={images[`${page.name + (selected ? 'Active' : '')}`]} />
                      {page.title}
                    </PageLinkRow>
                  </PageLink>
                  {selected && page.subPages && (
                    <PageLinkContainer>
                      {page.subPages.map((subpage, idx) => (
                        <SubpageLink
                          to={`/${page.name}/${subpage.name}`}
                          key={`${page.name}-${subpage.name}`}
                        >
                          <SubpageLinkRow onClick={this.handleSubpageClick(idx)} selected>
                            <SubpageLinkText
                              selected={idx === this.state.selectedSubpageIdx}
                            >
                              {subpage.title}
                            </SubpageLinkText>
                          </SubpageLinkRow>
                        </SubpageLink>
                      ))}
                    </PageLinkContainer>
                  )}
                </Fragment>
              )
            })}
          </PageLinkContainer>
          <FooterContainer>
            <FooterPseudoLink onClick={this.props.logoutUser}>Logout</FooterPseudoLink>
            <FooterLink to="/privacy">Privacy</FooterLink>
            <FooterLink to="/help">Help</FooterLink>
          </FooterContainer>
        </SidebarContainer>
        <PageContentContainer>{this.props.children}</PageContentContainer>
      </Container>
    )
  }
}

const mapState = ({ user: { user } }: MapStateTypes): MapPropsTypes => ({ user })

const mapDispatch = (dispatch: any) => ({
  logoutUser: () => dispatch(SessionActions.logout()),
})

export default connect(
  mapState,
  mapDispatch,
)(Sidebar)
