import React, { Component, ReactNode } from 'react'
import styled from 'styled-components'

// styled components
interface PopoverBodyProps {
  backgroundColor?: string
  padding?: number
  marginLeft?: number
}
const PopoverBody = styled.span<PopoverBodyProps>`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 100%;
  left: -75%;
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : 0)}px;
  padding: ${({ padding }) => (padding ? padding : 0)}px;
  border-radius: 4px;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? theme.colors[backgroundColor] : theme.colors.white};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12),
    0 1px 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 100;
  transition: opacity 0.1s ease-out;

  &:after {
    content: ' ';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent
      ${({ theme, backgroundColor }) =>
        backgroundColor ? theme.colors[backgroundColor] : theme.colors.white}
      transparent;
  }
`

interface HoverProps {
  textColor?: string
}
const HoverText = styled.div<HoverProps>`
  position: relative;
  padding: 5px 0;
  width: 111.02px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.26px;
  line-height: 18px;
  color: ${({ theme, textColor }) =>
    textColor ? theme.colors[textColor] : theme.colors.blue};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:hover ${PopoverBody} {
    visibility: visible;
    opacity: 1;
  }
`

//types
interface PopoverProps {
  text?: string
  renderFn?: any
  backgroundColor?: string
  textColor?: string
  padding?: number
  marginLeft?: number
  children: ReactNode
}

class Popover extends Component<PopoverProps> {
  render = () => (
    <HoverText textColor={this.props.textColor}>
      {this.props.text && this.props.text}
      {this.props.renderFn && this.props.renderFn({})}
      <PopoverBody
        backgroundColor={this.props.backgroundColor}
        padding={this.props.padding}
        marginLeft={this.props.marginLeft}
      >
        {this.props.children}
      </PopoverBody>
    </HoverText>
  )
}

export default Popover
