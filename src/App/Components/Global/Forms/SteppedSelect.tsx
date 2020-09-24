import React from 'react'
import styled from 'styled-components'

const Stepper = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  border-radius: 2px;
  border: 1px solid #cccccc;
  box-shadow: 0 1px 0 0 #e5e5e5;
  background-color: #f7f7f7;
  cursor: pointer;
`

interface StepProps {
  idx: number
  selected: boolean
  itemCount: number
}
const Step = styled.div<StepProps>`
  padding: 0 10px;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  border-right: ${({ idx, itemCount }) =>
    idx < itemCount - 1 ? '1px solid #CCCCCC' : 'none'};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.transparent};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.blue : theme.colors.darkGray};
  text-transform: uppercase;
`

interface StepperProps {
  steps: string[]
  selected: string
  onSelect(step: string): () => void
}

export default ({ steps, selected, onSelect }: StepperProps) => (
  <Stepper>
    {steps.map((step: string, idx: number) => (
      <Step
        idx={idx}
        key={idx}
        selected={selected === step}
        onClick={onSelect(step)}
        itemCount={steps.length}
      >
        {step}
      </Step>
    ))}
  </Stepper>
)
