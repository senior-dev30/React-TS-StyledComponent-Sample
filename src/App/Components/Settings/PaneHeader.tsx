import React from 'react'
import styled, { withTheme } from 'styled-components'
import { ThemeInterface } from '../../Themes'

import { Image } from '../Global'

const Container = styled.div`
  margin: 0 0 25px 10px;
  height: 22px;
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
  padding: 0 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.3px;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.darkGray};
`

// types
interface PaneHeaderProps {
  title: string
  imageName: string
  theme: ThemeInterface
}

export default withTheme((props: PaneHeaderProps) => (
  <Container>
    <Image height={16} width={15} image={props.theme.images[props.imageName]} />
    <Title>{props.title}</Title>
  </Container>
))
