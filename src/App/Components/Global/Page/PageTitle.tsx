import React, { ReactNode } from 'react'
import styled, { withTheme } from 'styled-components'

import Image from '../Image'

import { ThemeInterface } from '../../../Themes'

// styled components
interface PageTitleProps {
  backButton?: boolean
}
const PageTitle = styled.div<PageTitleProps>`
  padding-top: ${({ backButton }) => (backButton ? 18 : 0)}px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.3px;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.darkGray};
  text-transform: uppercase;
`

const BackButton = styled(Image)`
  margin-right: 14px;
  cursor: pointer;
`

// types
interface PageTitleProps {
  children: ReactNode
  onBack?(): void
  theme: ThemeInterface
}

export default withTheme(({ onBack, children, theme }: PageTitleProps) => (
  <PageTitle backButton={!!onBack}>
    {!!onBack && (
      <BackButton
        width={16}
        height={14}
        image={theme.images.arrowBack}
        onClick={onBack}
      />
    )}
    {children}
  </PageTitle>
))
