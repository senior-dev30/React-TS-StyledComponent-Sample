import React from 'react'
import styled from 'styled-components'

// styled components
const Input = styled.input`
  height: 32px;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.07);
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: ${({ theme }) => theme.fonts.base};
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  background-image: url(${({ theme }) => theme.images.calendar});
  background-repeat: no-repeat;
  background-size: 16px 17.5px;
  background-position: right center;
  background-origin: content-box;
`

export default (props: any) => <Input type="date" {...props} />
