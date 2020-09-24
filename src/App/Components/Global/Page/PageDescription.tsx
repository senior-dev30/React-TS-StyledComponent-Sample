import React, { ReactNode } from 'react'
import styled from 'styled-components'

// styled components
interface PageDescriptionStyleProps {
  backButton?: boolean
}
const PageDescription = styled.h3<PageDescriptionStyleProps>`
  margin: 0;
  margin-left: ${({ backButton }) => (backButton ? 30 : 0)}px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.26px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
`

// types
interface PageDescriptionProps {
  children: ReactNode
  backButton?: boolean
}

export default ({ backButton, children }: PageDescriptionProps) => (
  <PageDescription backButton={backButton}>{children}</PageDescription>
)
