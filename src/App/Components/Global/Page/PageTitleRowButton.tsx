import React, { ReactNode } from 'react'
import styled from 'styled-components'

// styled components
const PageTitleRowButton = styled.div`
  padding: 4px 10px;
  height: 24px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  background-color: #3197d3;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 0 0 rgba(206, 206, 209, 0.25);
  cursor: pointer;
`

// types
interface PageTitleRowButtonProps {
  children: ReactNode
  onClick(): void
}

export default (props: PageTitleRowButtonProps) => (
  <PageTitleRowButton onClick={props.onClick}>
    {props.children}
  </PageTitleRowButton>
)
