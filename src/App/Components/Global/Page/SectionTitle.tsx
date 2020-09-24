import React, { ReactNode } from 'react'
import styled from 'styled-components'

const SectionTitle = styled.div`
  padding-bottom: 12px;
  color: #cfd7df;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  border-bottom: 1px solid #cfd7df;
`

interface SectionTitleProps {
  children: ReactNode
}

export default ({ children }: SectionTitleProps) => (
  <SectionTitle>{children}</SectionTitle>
)
