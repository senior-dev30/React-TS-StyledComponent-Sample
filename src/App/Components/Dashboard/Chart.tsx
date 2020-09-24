import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

import { ChartHeader, KeyMetricRow } from '../Dashboard'
import { Bar } from '../Dashboard/Charts'
import useWindowWidth from '../../Effects/useWindowWidth'

interface DataProps {
  labels: string[]
  datasets: {
    backgroundColor: string
    borderColor: string
    borderWidth: number
    data: number[]
  }[]
}

const getMaxVal = (data: DataProps) =>
  Math.max(...data.datasets.map(dataset => dataset.data).map(data => Math.max(...data)))

// styled componentes
interface ChartContainerProps {
  size: string
  height?: string
}
const Chart = styled.div<ChartContainerProps>`
  grid-column: ${({ size }) => (size === 'full' ? '1 / 3' : 'auto')};
  display: flex;
  flex-direction: column;
  border-radius: 0 0 1px 1px;
  background-color: ${({ theme }) => theme.colors.white};
  @media screen and (max-width: 1210px) {
    grid-column: auto;
    width: 600px;
  }
`

interface ResponsiveContainerProps {
  responsiveWidth: number | null
}
const ResponsiveContainer = styled.div<ResponsiveContainerProps>`
  width: ${({ responsiveWidth }) => `${responsiveWidth}px` || `100%`};
  height: '100%';
`

// types
interface IDataset {
  backgroundColor: string
  borderColor: string
  borderWidth: number
  data: any[]
}

interface ChartProps {
  size: string
  title: string
  information?: string
  hideKeyMetrics?: boolean
  renderKeyMetric?(props: any): ReactNode
  keyMetric?: any
  keyMetricChanges?: boolean
  data?: any
  filterType?: string
  format?(value: number): string
  renderBody?(props: any): ReactNode
}

export default (props: ChartProps) => {
  const [keyMetric, setKeyMetric] = useState(props.keyMetric)

  const [selected, setSelected] = useState('')
  const width = useWindowWidth()
  const responsiveWidth = width < 1410 && width > 1210 ? width * 0.4255319149 - 20 : null

  const isBarChartData = props.data.labels && props.data.datasets

  const filteredData: DataProps = (() => {
    const { data, keyMetricChanges } = props
    let filteredData = data
    console.log('asdasd', data)
    // make keyMetrics multiplier changes
    if (keyMetricChanges) {
      filteredData = {
        labels: data.labels,
        datasets: data.datasets.map((dataset: IDataset) => ({
          ...dataset,
          data: dataset.data.map((metrics: number) =>
            !keyMetricChanges ? metrics : Number((metrics * keyMetric).toFixed(2)),
          ),
        })),
      }
    }

    if (!selected) return filteredData

    // make filtered label changes
    const selectedIdx = data.labels.indexOf(selected)
    return {
      labels: [selected],
      datasets: data.datasets.map((dataset: IDataset) => ({
        ...dataset,
        data: [dataset.data[selectedIdx]],
      })),
    }
  })()

  const formatDefault = (value: number) => value.toString()

  return (
    <Chart size={props.size}>
      <ChartHeader
        title={props.title}
        information={props.information}
        filterOptions={
          props.data.labels
            ? props.data.labels.map((label: string) => ({ name: label }))
            : []
        }
        selectPlaceholder={props.filterType && `All ${props.filterType}`}
        setSelected={setSelected}
      />
      {!props.hideKeyMetrics && (
        <KeyMetricRow>
          {props.renderKeyMetric &&
            props.renderKeyMetric({
              keyMetric: keyMetric || props.keyMetric,
              onChange: props.keyMetricChanges ? setKeyMetric : undefined,
            })}
        </KeyMetricRow>
      )}
      {props.data && isBarChartData && (
        <ResponsiveContainer responsiveWidth={responsiveWidth}>
          <Bar
            data={filteredData}
            format={props.format || formatDefault}
            maxVal={getMaxVal(filteredData)}
          />
        </ResponsiveContainer>
      )}
      {props.renderBody && props.renderBody({ data: props.data })}
    </Chart>
  )
}
