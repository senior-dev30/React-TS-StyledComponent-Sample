import React from 'react'
import styled from 'styled-components'

// component imports
import { Popover } from '../Global'
import { IEquipmentData } from '../../Redux/EquipmentRedux'

const PopoverButtonContainer = styled.div`
  margin: 16px 10px;
`

interface PopoverButtonProps {
  color: string
}
const PopoverButton = styled.div<PopoverButtonProps>`
  margin-top: 6px;
  height: 24px;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  border-radius: 2px;
  background-color: ${({ color, theme }) => theme.colors[color]};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0), 0 1px 0 0 rgba(206, 206, 209, 0.25);
`

interface PopoverProps {
  equipment: IEquipmentData
  openAssignModal(): void
  navToEquipmentPage(): void
  openReportProblemModal(): void
  offHireEquipment(equipmentID: number): void
}

export default (props: PopoverProps) => {
  const offHire = (equipmentID: number) => () => props.offHireEquipment(equipmentID)
  return (
    <Popover text={'Select Action'} marginLeft={60}>
      <PopoverButtonContainer>
        <PopoverButton color={'blue'} onClick={props.openAssignModal}>
          Assign to...
        </PopoverButton>
        <PopoverButton color={'blue'} onClick={props.navToEquipmentPage}>
          Equipment Page
        </PopoverButton>
        <PopoverButton color={'magenta'} onClick={props.openReportProblemModal}>
          Report a Problem
        </PopoverButton>
        {props.equipment.status === 'On hire' && (
          <PopoverButton color={'magenta'} onClick={offHire(props.equipment.equipmentID)}>
            Off Hire
          </PopoverButton>
        )}
      </PopoverButtonContainer>
    </Popover>
  )
}
