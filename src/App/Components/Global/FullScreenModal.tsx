import React, { ReactNode } from 'react'
import styled, { withTheme } from 'styled-components'

import { Image } from '../Global'
import { ThemeInterface } from '../../Themes'

interface StyledModalProps {
  hideBackground?: boolean
  top?: number
}
const FullScreenModal = styled.div<StyledModalProps>`
  position: absolute;
  top: ${({ top }) => top || 0}px;
  left: 0;
  width: 100%;
  background-color: ${({ theme, hideBackground }) =>
    hideBackground ? theme.colors.transparent : theme.colors.bluishWhite};
  z-index: 1;
`

const Container = styled.div`
  position: relative;
  margin: 20px;
  padding: 20px;
  max-width: 1210px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 1px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 3px 4px 0 rgba(0, 0, 0, 0.06),
    0 1px 5px 0 rgba(0, 0, 0, 0.1);
`

const CloseIcon = styled(Image)`
  position: absolute;
  top: 33px;
  right: 20px;
`

interface FullScreenModalProps {
  children: ReactNode
  onClickClose(): void
  hideBackground?: boolean
  top?: number
  noPadding?: boolean
  theme: ThemeInterface
}
export default withTheme((props: FullScreenModalProps) => (
  <FullScreenModal hideBackground={props.hideBackground} top={props.top}>
    <Container>
      <CloseIcon
        width={10}
        height={10}
        image={props.theme.images.close}
        onClick={props.onClickClose}
      />
      {props.children}
    </Container>
  </FullScreenModal>
))
