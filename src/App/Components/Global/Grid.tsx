import React, { ReactNode } from 'react'
import styled from 'styled-components'

// styled componentes
interface GridContainerProps {
  columns: number
  gap?: number
  padding?: string
}
const Grid = styled.div<GridContainerProps>`
  padding-bottom: 50px;
  ${({ padding }) => padding && `padding : ${padding}`}; /* can resolve shadow issues */
  max-width: 1210px;
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: ${({ gap }) => gap || 20}px;
  @media screen and (max-width: 1210px) {
    grid-template-columns: repeat(${({ columns }) => columns - 1 || 1}, 1fr);
  }
  @media screen and (max-width: 880px) {
    grid-template-columns: repeat(${({ columns }) => columns - 2 || 1}, 1fr);
  }
`

// types
interface GridProps {
  columns: number
  children: ReactNode
  gap?: number
  padding?: string
}

export default (props: GridProps) => (
  <Grid columns={props.columns} padding={props.padding} gap={props.gap}>
    {props.children}
  </Grid>
)
