import React from 'react'
import styled from 'styled-components'

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`

export default () => <Divider />
