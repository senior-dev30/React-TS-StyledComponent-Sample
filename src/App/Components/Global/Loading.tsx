import React from 'react'
import styled from 'styled-components'

const Loading = styled.div`
  margin: 0 auto;
  width: 100vh;
  height: 100vh;
  color: ${({ theme }) => theme.colors.bluishWhite};
`

//@TODO: add a spinner/animated loader UI?
export default () => <Loading />
