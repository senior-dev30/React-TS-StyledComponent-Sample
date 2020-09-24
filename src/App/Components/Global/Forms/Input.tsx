import React from 'react'
import styled from 'styled-components'

// styled components
const Input = styled.input`
  flex-shrink: 0;
  height: 32px;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.07);
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`

export default (props: any) => <Input {...props} />
