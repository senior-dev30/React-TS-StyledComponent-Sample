declare module 'react-minimal-pie-chart' {
  import * as React from 'react'

  // used to create custom SVG labels
  // to use, pass a function to the label prop that takes labelProps as a param
  export interface PieChartLabelProps {
    key: string
    x: number
    y: number
    dx: number
    dy: number
    textAnchor: string
    data: {
      degrees: number
      percentage: number
      value: number
      [key: string]: number
    }[]
    dataIndex: number
    color: string
    style: { [key: string]: string | number }
  }

  export interface PieChartDatum {
    title?: string
    value: number
    color: string
    percentage?: number
    type?: string
  }

  export interface PieChartProps {
    data: PieChartDatum[]
    style?: React.CSSProperties
    lineWidth?: number
    label?: any
    labelStyle?: React.CSSProperties
    radius?: number
    labelPosition?: number
    startAngle?: number
    totalValue?: number
    rounded?: boolean
    animate?: boolean
    lengthAngle?: number
    injectSvg?: any
  }

  export default class PieChart extends React.Component<PieChartProps, any> {}
}
