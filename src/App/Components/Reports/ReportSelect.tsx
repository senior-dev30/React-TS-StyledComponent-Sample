import React from 'react'
import styled, { withTheme } from 'styled-components'

import { Image } from '../Global'
import { ThemeInterface } from '../../Themes'

const ReportSelect = styled.div`
  flex-grow: 0;
  flex-basis: 25%;
  height: 110px;
  padding: 15px;
  display: flex;
  align-items: center;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.bluishWhite};
`

const ReportSelectText = styled.div`
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.3px;
  line-height: 21px;
`

const Input = styled.input`
  height: 16px;
  width: 16px;
  border-radius: 0px;
`

interface ReportSelectProps {
  report: {
    name: string
    id: string
  }
  onSelect(name: string): void
  onDeselect(name: string): void
  selected: string
  theme: ThemeInterface
}

export default withTheme((props: ReportSelectProps) => {
  const {
    report: { name, id },
    selected,
  } = props
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? props.onSelect(props.report.id)
      : props.onDeselect(props.report.id)
  }

  return (
    <ReportSelect>
      <Image width={60} height={60} image={props.theme.images.assetSummary} />
      <ReportSelectText>{name}</ReportSelectText>
      <Input type="checkbox" checked={selected === id} onChange={handleChange} />
    </ReportSelect>
  )
})
