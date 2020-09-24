import React, { CSSProperties } from 'react'
import styled, { withTheme } from 'styled-components'
import PercentChart from 'react-minimal-pie-chart'
import { ThemeInterface } from '../../../Themes'

const UtilizationCircle = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`

const UtilizationMetric = styled.div`
  position: relative;
  font-size: 36px;
  font-weight: 300;
  line-height: 47px;
`

const UtilizationPercentSign = styled.div`
  position: absolute;
  right: -20px;
  bottom: -5px;
  font-size: 22px;
  &:after {
    content: '%';
  }
`

const UtilizationText = styled.p`
  margin: 0;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 1.6px;
  line-height: 13px;
  text-transform: uppercase;
`

const chartStyles: CSSProperties = { position: 'absolute', transform: 'scale(1.04)' }

interface IProps {
  utilization: number
  theme: ThemeInterface
}

export default withTheme(({ utilization, theme }: IProps) => (
  <UtilizationCircle>
    <UtilizationMetric>
      {utilization}
      <UtilizationPercentSign />
    </UtilizationMetric>
    <UtilizationText>Utilization</UtilizationText>
    <PercentChart
      data={[
        {
          value: utilization,
          color: 'url(#gradient1)',
        },
      ]}
      totalValue={100}
      lineWidth={8}
      startAngle={(utilization / 100) * 360 + 270}
      style={chartStyles}
      rounded
      // animate @FIXME: currently stuttering on some values
      lengthAngle={-360}
      injectSvg={() => (
        <defs>
          <linearGradient id="gradient1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.colors.blue} />
            <stop offset="100%" stopColor={theme.colors.aquamarineDark} />
          </linearGradient>
        </defs>
      )}
    />
  </UtilizationCircle>
))
