import React from 'react'
import styled, { withTheme } from 'styled-components'

import { Image } from '../../Global'
import { ThemeInterface } from '../../../Themes'

const Container = styled.div`
  width: 90px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
`

interface MetricProps {
  keyMetric: string | undefined
  theme: ThemeInterface
}
export default withTheme((props: MetricProps) => (
  <Container>
    <Image width={24} height={18} image={props.theme.images.co2} />
    <Text>Trend</Text>
    <Image
      width={7}
      height={18}
      image={
        props.keyMetric === 'up'
          ? props.theme.images.arrowTrendUp
          : props.theme.images.arrowTrendDown
      }
    />
  </Container>
))
