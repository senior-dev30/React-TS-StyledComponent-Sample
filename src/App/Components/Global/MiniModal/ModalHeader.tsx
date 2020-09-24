import React from 'react'
import styled, { withTheme } from 'styled-components'

import { Image } from '../../Global'

import { ThemeInterface } from '../../../Themes'

const TitleRow = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 68px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`

const IconContainer = styled.div`
  width: 55px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: auto;
`

const TextContainer = styled.div`
  flex: 1;
  border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
  align-items: center;
`

const Text = styled.p`
  padding: 0;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.76px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.darkGray};
`

const DeleteIconContainer = styled(IconContainer)`
  padding-top: 0;
  align-items: center;
  cursor: pointer;
`

interface IProps {
  title: string
  icon?: string
  onRequestClose(): void
  theme: ThemeInterface
}
export default withTheme(({ title, icon, onRequestClose, theme }: IProps) => (
  <TitleRow>
    <IconContainer>
      {icon && <Image width={16} height={16} image={theme.images[icon]} />}
    </IconContainer>
    <TextContainer>
      <Text>{title}</Text>
    </TextContainer>
    <DeleteIconContainer onClick={onRequestClose}>
      <Image width={10} height={10} image={theme.images.close} />
    </DeleteIconContainer>
  </TitleRow>
))
