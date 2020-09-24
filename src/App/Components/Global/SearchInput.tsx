import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { ThemeInterface } from '../../Themes'

const Search = styled.input`
  width: 100%;
  height: 28px;
  display: flex;
  flex-wrap: nowrap;
  border-radius: 4px;
  border: 1px solid #dddddd;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.07);
  padding: 0 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkGray};
  text-transform: uppercase;
  background-image: url(${({ theme }) => theme.images.search});
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: right center;
  background-origin: content-box;
  ::placeholder {
    text-transform: none;
    color: ${({ theme }) => theme.colors.gray};
  }
`

interface IProps {
  onChange?: any
  onBlur?: any
  placeholder: string
  theme?: ThemeInterface
}

export default forwardRef(({ onChange, onBlur, placeholder }: IProps, ref: any) => (
  <Search onChange={onChange} onBlur={onBlur} placeholder={placeholder} ref={ref} />
))
