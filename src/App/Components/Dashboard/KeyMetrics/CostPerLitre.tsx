import React from 'react'
import styled, { withTheme } from 'styled-components'

import { Image } from '../../Global'
import { ThemeInterface } from '../../../Themes'

const Container = styled.div`
  width: 167px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Text = styled.div`
  margin: 0;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
`

const Input = styled.input`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  height: 18px;
  width: 45px;
  border: none;
  font-family: ${({ theme }) => theme.fonts.base};
  color: ${({ theme }) => theme.colors.darkGray};
`

interface MetricProps {
  keyMetric: number
  onChange(value: string): void
  theme: ThemeInterface
}
export default withTheme(({ keyMetric, onChange, theme }: MetricProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onChange', onChange)
    event.preventDefault()
    onChange && onChange(event.target.value)
  }

  return (
    <Container>
      <Image width={17} height={18} image={theme.images.gas} />
      <Text>
        Cost per litre: £
        <Input
          onChange={handleChange}
          type="number"
          min="0.01"
          step="0.01"
          value={Number(keyMetric).toFixed(2)}
        />
      </Text>
    </Container>
  )
})
