import React, { useState } from 'react'
import styled, { withTheme } from 'styled-components'

import { Image } from '../../Global'
import { TableHeader } from '../../Global/Table'

import { ThemeInterface } from '../../../Themes'
import { TableRow } from '../../Global/Table'

// constants
const MAX_ROWS = 4

const columnData = [
  '#',
  'Plant No.',
  'Machine Type',
  'Working',
  'Idle (%)',
  'Engine On',
  'Fuel (LTR/W)',
]

// styled components
const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const TableContainer = styled.div`
  flex: 1;
`

const Footer = styled.div`
  padding: 15px;
  height: 68px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > * {
    margin-left: 18px;
  }
`

const ItemRangeLocation = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
`

// types
interface ArrowIconProps {
  disabled: boolean
}
const ArrowIcon = styled(Image)<ArrowIconProps>`
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
`

interface OperationScoreboardProps {
  data?: any
  theme: ThemeInterface
}

export default withTheme((props: OperationScoreboardProps) => {
  const [page, setPage] = useState(0)

  const hasNextPages = page + MAX_ROWS < props.data.length
  const hasPrevPages = page - MAX_ROWS >= 0
  const pageText = `
    ${page + 1}-
    ${hasNextPages ? page + MAX_ROWS : props.data.length}
    of
    ${props.data.length}
  `

  const nextPage = () => hasNextPages && setPage(page + MAX_ROWS)
  const prevPage = () => hasPrevPages && setPage(page - MAX_ROWS)

  return (
    <Container>
      <TableContainer>
        <TableHeader columnData={columnData} fontSize={12} />
        {props.data
          .slice(page, page + MAX_ROWS)
          .map((row: { [key: string]: string }, idx: number) => (
            <TableRow key={idx} data={{ key: (page + idx + 1).toString(), ...row }} />
          ))}
      </TableContainer>
      <Footer>
        <ItemRangeLocation>{pageText}</ItemRangeLocation>
        <ArrowIcon
          width={6}
          height={12}
          image={
            hasPrevPages
              ? props.theme.images.arrowLeftActive
              : props.theme.images.arrowLeftInactive
          }
          disabled={!hasPrevPages}
          onClick={prevPage}
        />
        <ArrowIcon
          width={6}
          height={12}
          image={
            hasNextPages
              ? props.theme.images.arrowRightActive
              : props.theme.images.arrowRightInactive
          }
          disabled={!hasNextPages}
          onClick={nextPage}
        />
      </Footer>
    </Container>
  )
})
