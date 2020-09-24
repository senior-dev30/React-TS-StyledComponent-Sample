import React, { Component } from 'react'
import styled from 'styled-components'

interface ButtonProps {
  backgroundColor?: string
}
const Button = styled.div<ButtonProps>`
  width: 100%;
  height: 38px;
  display: fless;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.colors[backgroundColor] : theme.colors.white};
  cursor: pointer;
`

const ButtonText = styled.span`
  color: ${({ theme }) => theme.colors.lightBlue};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
`

type Props = {
  text: string
  backgrounColor?: string
  onPress(): void
}

export default class SecondaryButton extends Component<Props> {
  render = () => (
    <Button
      onClick={this.props.onPress}
      backgroundColor={this.props.backgrounColor}
    >
      <ButtonText> {this.props.text}</ButtonText>
    </Button>
  )
}
