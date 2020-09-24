import React from 'react'
import styled from 'styled-components'

import Hello from './Hello'

const Instructions = styled.h1`
  color: #333333;
  margin-bottom: 5px;
  text-align: center;
`

const Welcome = styled.h1`
  font-size: 20;
  margin: 10px;
  text-align: center;
`

export default class Intro extends React.Component {
  public render() {
    return (
      <>
        <Welcome>Welcome to React!</Welcome>
        <Instructions>This is a React snapshot test.</Instructions>
        <Hello enthusiasmLevel={1} name={'World'} />
      </>
    )
  }
}
