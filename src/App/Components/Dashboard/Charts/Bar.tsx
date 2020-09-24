import React from 'react'
import styled from 'styled-components'

import { Bar as BarChart } from 'react-chartjs-2'

const ChartBodyContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 28px;
  margin-bottom: 20px;
`

interface BarChartProps {
  data: object
  maxVal: number
  format(value: number): string
}

export default (props: BarChartProps) => {
  const maxWithPadding = props.maxVal + props.maxVal * 0.05

  const getNearestHundreds = () => props.maxVal - (props.maxVal % 100)

  return (
    <ChartBodyContainer>
      <BarChart
        data={props.data}
        redraw
        height={114}
        options={{
          responsive: true,
          legend: {
            display: false,
          },
          barValueSpacing: 10,
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                  drawTicks: false,
                },
                barThickness: 10, // additional width to support inset border
                ticks: {
                  padding: 10,
                  fontColor: '#7A818A',
                  fontFamily: 'Open Sans',
                  fontSize: 12,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawBorder: false,
                  color: [
                    'rgba(0,0,0,0',
                    '#EAEEF5',
                    '#EAEEF5',
                    '#EAEEF5',
                    '#EAEEF5',
                    '#EAEEF5',
                  ], // ensures the top-most gridline is not rendered
                  zeroLineColor: '#EAEEF5',
                },
                ticks: {
                  padding: 15,
                  beginAtZero: true,
                  maxTicksLimit: 6,
                  max: maxWithPadding, // cuts chart off beyond max val with some padding
                  stepSize:
                    props.maxVal < 6000 &&
                    (props.maxVal < 1000 ? getNearestHundreds() : 1000),
                  fontColor: '#7A818A',
                  fontFamily: 'Open Sans',
                  fontSize: 12,
                  callback: (value: number) =>
                    value === maxWithPadding ? '' : props.format(value), // removes top tick
                },
              },
            ],
          },
        }}
      />
    </ChartBodyContainer>
  )
}
