import React from 'react'
import styled, { withTheme } from 'styled-components'
import PieChart, { PieChartDatum } from 'react-minimal-pie-chart'
import { ThemeInterface } from '../../../Themes'

const Container = styled.div`
  flex-shrink: 1;
  position: relative;
  height: 300px;
  flex-basis: 646px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1px;
  border: 1px solid #e7ebef;
`

const Legend = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 140px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.blueGray};
  background-color: ${({ theme }) => theme.colors.bluishWhite};
  z-index: 2;
`

interface LegendRowProps {
  bottomBorder?: boolean
}
const LegendRow = styled.div<LegendRowProps>`
  padding: 0 10px;
  height: 32px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  ${({ bottomBorder, theme }) =>
    bottomBorder && `border-bottom: 1px solid ${theme.colors.blueGray}`};
`

interface LegendColorProps {
  color: string
}
const LegendColor = styled.div<LegendColorProps>`
  height: 10px;
  width: 16px;
  background-color: ${({ color }) => color};
`

const LegendText = styled.div`
  padding-left: 7px;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`

const UtilizationLabel = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface ChartLabelMetricProps {
  color: string
}
const ChartLabelMetric = styled.div<ChartLabelMetricProps>`
  color: ${({ theme, color }) => theme.colors[color]};
  font-size: 38px;
  font-weight: 300;
  letter-spacing: -3px;
  line-height: 50px;
`

const ChartLabelType = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-transform: uppercase;
`

const NoDataContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray};
`

// types
interface IProps {
  metrics: {
    engineWorking: number
    engineIdling: number
    engineOff: number
    utilization: number
  }
  theme: ThemeInterface
}

export default withTheme(
  ({
    metrics: { engineWorking, engineIdling, engineOff, utilization },
    theme,
  }: IProps) => {
    const hasData = engineWorking + engineIdling + engineOff + utilization > 0

    const data = []

    if (engineWorking) {
      data.push({
        title: 'Operating',
        value: Number(engineWorking.toFixed(2)),
        color: theme.colors.operating,
      })
    }

    if (engineIdling) {
      data.push({
        title: 'Idling',
        value: Number(engineIdling.toFixed(2)),
        color: theme.colors.idling,
      })
    }

    if (engineOff) {
      data.push({
        title: 'Engine Off',
        value: Number(engineOff.toFixed(2)),
        color: theme.colors.engineOff,
      })
    }

    return (
      <Container>
        {!!hasData && (
          <PieChart
            data={data}
            style={{ height: '300px', width: '100%' }}
            lineWidth={40}
            label={({ data, dataIndex }: { data: PieChartDatum[]; dataIndex: number }) =>
              data[dataIndex].value + 'h'
            }
            labelStyle={{
              fontSize: 13,
              fontWeight: 300,
              fontFamily: 'Open Sans',
              letterSpacing: -1,
            }}
            radius={30}
            labelPosition={122}
            startAngle={270}
          />
        )}
        {!!hasData && (
          <Legend>
            {data.map((datum, idx) => (
              <LegendRow bottomBorder={idx !== data.length - 1} key={datum.title}>
                <LegendColor color={datum.color} />
                <LegendText>{`${datum.title} - ${datum.value.toFixed(2)}`}</LegendText>
              </LegendRow>
            ))}
          </Legend>
        )}
        {!!utilization && (
          <UtilizationLabel>
            <ChartLabelMetric color="blue">{`${Math.round(
              utilization,
            )}%`}</ChartLabelMetric>
            <ChartLabelType>Utilization</ChartLabelType>
          </UtilizationLabel>
        )}
        {!hasData && <NoDataContainer>No data at this time.</NoDataContainer>}
      </Container>
    )
  },
)
