import React from 'react'
import styled, { withTheme } from 'styled-components'

import { Image } from '../Global'
import { ThemeInterface } from '../../Themes'

const KPICard = styled.div`
  position: relative;
  flex-grow: 0;
  flex-basis: 25%;
  height: 110px;
  padding: 15px;
  display: flex;
  align-items: center;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.bluishWhite};
`

const TextContainer = styled.div`
  flex-grow: 1;
  padding: 0 15px;
  color: ${({ theme }) => theme.colors.darkGray};
`

const KPICardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.3px;
  line-height: 21px;
`

const KPICardDescription = styled.div`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.26px;
  line-height: 18px;
`

interface ButtonProps {
  onClick(): void
}
const AddButton = styled.div<ButtonProps>`
  flex-shrink: 0;
  align-self: flex-start;
  height: 16px;
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.blue};
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
`

const RemoveButton = styled(AddButton)`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
`

interface KPICardProps {
  KPI: {
    name: string
    displayName: string
    description?: string
  }
  onClick(name: string): void
  added?: boolean
  hideRemove?: boolean
  theme: ThemeInterface
}

export default withTheme(
  ({ KPI, onClick, added, hideRemove, theme }: KPICardProps) => {
    const Button = added ? RemoveButton : AddButton
    const handleChange = () => onClick(KPI.name)

    return (
      <KPICard>
        <Image width={60} height={60} image={theme.images.assetSummary} />
        <TextContainer>
          <KPICardTitle>{KPI.displayName}</KPICardTitle>
          <KPICardDescription>{KPI.description}</KPICardDescription>
        </TextContainer>
        {!hideRemove && (
          <Button onClick={handleChange}>
            <Image
              width={10}
              height={10}
              image={added ? theme.images.close : theme.images.plus}
            />
          </Button>
        )}
      </KPICard>
    )
  },
)
