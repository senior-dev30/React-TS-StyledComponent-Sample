import React from 'react'
import styled from 'styled-components'
import { Input } from './BlankTextInput'

const Select = styled(Input)``

// types
interface SelectProps {
  name: string
  placeholder?: string
  options: any[]
  id: string // property name to set option key and value with
  displayName: string // property name set user-visible name in select box
  disabled?: boolean
  onChange?(event: React.ChangeEvent<HTMLSelectElement>): void
}

export default ({
  name,
  placeholder,
  options,
  id,
  displayName,
  disabled,
  onChange,
}: SelectProps) => (
  <Select name={name} component="select" onChange={onChange} disabled={disabled}>
    <option>{placeholder || ''}</option>
    {options.map(option => (
      <option key={option[id]} value={option[id]}>
        {option[displayName]}
      </option>
    ))}
  </Select>
)
