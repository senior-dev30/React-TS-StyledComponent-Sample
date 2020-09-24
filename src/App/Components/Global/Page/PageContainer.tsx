import React, { ReactNode } from 'react'
import styled from 'styled-components'

// styled components
const PageContainer = styled.div`
  position: relative;
  padding: 20px;
  padding-bottom: 0;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  & > * {
    flex-shrink: 0;
  }
`

// types
interface PageContainerProps {
  children: ReactNode
}

export default (props: PageContainerProps) => (
  <PageContainer>{props.children}</PageContainer>
)
