import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// styled components
interface SelectProps {
  height?: number
}
const Select = styled.div<SelectProps>`
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;
  padding: 0 10px;
  width: 100%;
  height: ${({ height }) => (height ? height : 32)}px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-image: url(${({ theme }) => theme.images.dropdownArrows});
  background-repeat: no-repeat;
  background-size: 8px 16px;
  background-position: right center;
  background-origin: content-box;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.07);
  cursor: pointer;
`

interface SelectOptionsDropdownProps {
  visible: boolean
  width?: number
  offset?: number
}
const SelectOptionsDropdown = styled.div<SelectOptionsDropdownProps>`
  position: absolute;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  top: ${({ visible }) => (visible ? 45 : 32)}px;
  left: ${({ offset }) => (offset ? offset : -1)}px;
  width: ${({ width }) => (width ? `${width}px` : `101%`)};
  max-height: 300px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 3px 4px 0 rgba(0, 0, 0, 0.06),
    0 1px 5px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 5;
  transition: all 0.1s ease-out;
`

const DropdownContent = styled.div`
  position: relative;
  width: 100%;
`

interface BodyProps {
  footerSpacer: boolean
}
const SelectOptionsDropdownBody = styled.div<BodyProps>`
  margin: 7px 0;
  padding-bottom: ${({ footerSpacer }) =>
    footerSpacer ? 46 : 0}px; // footer height + margin
  max-height: 288px;
  overflow-y: scroll;
`

interface SelectOptionRowProps {
  selected?: boolean
}
const SelectOptionRow = styled.div<SelectOptionRowProps>`
  padding: 0 20px;
  height: 38px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.2px;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.darkGray};
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.bluishWhite : theme.colors.white};
  :hover {
    background-color: ${({ theme }) => theme.colors.bluishWhite};
  }
`

interface CustomSelectProps {
  placeholder?: string
  initialValue?: any
  options: any[]
  valueKey: string
  displayKey: string
  displayFn?(option: any): any
  renderFooter?(): any
  height?: number
  width?: number
  offset?: number
  onSelect(selected: any): void
  reset?: boolean
}

export default ({
  placeholder,
  initialValue,
  options,
  valueKey,
  displayKey,
  displayFn,
  height,
  width,
  offset,
  onSelect,
  renderFooter,
  reset,
}: CustomSelectProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const closeDropdown = () => setDropdownVisible(false)
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible)

  const [selected, setSelected] = useState<any>(initialValue || null)

  const handleSelect = (selected: any) => (event: React.MouseEvent) => {
    event.stopPropagation()
    onSelect(selected)
    setSelected(selected)
    closeDropdown()
  }

  useEffect(() => {
    onSelect(initialValue)
    setSelected(initialValue)
  }, [initialValue, reset])

  const rowSelected = (option: any) =>
    selected ? option[valueKey] === selected[valueKey] : false

  // a placeholder or initialValue MUST be supplied
  if (!initialValue && !placeholder) return null

  const displayedText = (option: any) =>
    displayFn ? displayFn(option) : option[displayKey]

  return (
    <Select onClick={toggleDropdown} height={height}>
      <SelectOptionsDropdown
        visible={dropdownVisible}
        onMouseLeave={closeDropdown}
        width={width}
        offset={offset}
      >
        <DropdownContent>
          <SelectOptionsDropdownBody footerSpacer={!!renderFooter}>
            {placeholder && (
              <SelectOptionRow onClick={handleSelect('')}>{placeholder}</SelectOptionRow>
            )}
            {options.map((option, idx) => (
              <SelectOptionRow
                onClick={handleSelect(option)}
                key={`${option[valueKey]}-${idx}`}
                selected={rowSelected(option)}
              >
                {displayedText(option)}
              </SelectOptionRow>
            ))}
          </SelectOptionsDropdownBody>
          {renderFooter && renderFooter()}
        </DropdownContent>
      </SelectOptionsDropdown>
      {selected ? displayedText(selected) : placeholder}
    </Select>
  )
}
