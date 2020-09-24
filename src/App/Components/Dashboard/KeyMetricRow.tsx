import React, { ReactNode } from 'react'
import styled from 'styled-components'

// style
const KeyMetricRow = styled.div`
  height: 34px;
  padding-right: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`

// types
interface KeyMetricRowProps {
  children: ReactNode
}
export default (props: KeyMetricRowProps) => (
  <KeyMetricRow>{props.children}</KeyMetricRow>
)
