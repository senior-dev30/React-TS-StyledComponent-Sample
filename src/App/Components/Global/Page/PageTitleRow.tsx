import React, { ReactNode } from 'react'
import styled from 'styled-components'

// styled components
const PageTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  & > * {
    margin-right: 18px;
  }
`

// types
interface PageTitleRowProps {
  children: ReactNode
}

export default (props: PageTitleRowProps) => (
  <PageTitleRow>{props.children}</PageTitleRow>
)
