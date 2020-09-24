import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components'

// relative imports
import { capitalizeString } from '../../Lib/formatValues'

// component imports
import { Image } from '../Global'
import { EquipmentTableItem } from '../Equipment'

// type imports
import { ThemeInterface } from '../../Themes'
import { ImmutableIEquipmentArray } from '../../Redux/EquipmentRedux'
import { CustomSelect } from '../Global/Forms'

const TableRow = styled.div`
  width: 100%;
  height: 48px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.bluishWhite};
  }
`

const TableItemTitle = styled.p`
  font-weight: 600;
  padding-left: 10px;
`

interface SelectProps {
  width: string
}
const SelectContainer = styled.div<SelectProps>`
  width: ${({ width }) => (width === 'comfortable' ? 140 : 120)}px;
`

const SortOrderIcon = styled(Image)`
  cursor: pointer;
`

interface IFilter {
  filterType: string
  filterValue: string
}

enum ColumnType {
  Filter = 'filter',
  Sort = 'sort',
}

interface IColumn {
  key: number
  type: ColumnType
  name: string
  displayName: string
  size: string
  ascending: boolean
}

interface EquipmentTableHeaderProps {
  data: ImmutableIEquipmentArray
  columnData: IColumn[]
  onChange(filterType: string): (filter: IFilter) => void
  onClick(key: number): void
  filters: any[]
  theme: ThemeInterface
}

class EquipmentTableHeader extends Component<EquipmentTableHeaderProps> {
  state = {
    reset: false, // used to programmatically reset CustomSelect's internal state
  }

  renderTitle = (title: string) => title.charAt(0).toUpperCase() + title.slice(1)

  componentDidUpdate = (prevProps: EquipmentTableHeaderProps) => {
    if (!!prevProps.filters.length && !this.props.filters.length)
      this.setState({ reset: true }, () => this.setState({ reset: false }))
  }

  getUniqueOptions = (filterType: string) =>
    [...new Set(this.props.data.asMutable().map(row => row[filterType]))].map(
      filterValue => ({
        filterType,
        filterValue,
      }),
    )

  capitalizeFilterValue = (filter: IFilter) => {
    if (filter.filterType === 'category' || filter.filterType === 'fleet') {
      return capitalizeString(filter.filterValue)
    }
    return filter.filterValue
  }

  renderFilterColumn = (column: IColumn) => {
    return (
      <EquipmentTableItem key={column.key} size={column.size}>
        <SelectContainer width={column.size}>
          <CustomSelect
            placeholder={this.renderTitle(column.name)}
            options={this.getUniqueOptions(column.name)}
            onSelect={this.props.onChange(column.name)}
            valueKey="filterValue"
            displayKey="filterValue"
            displayFn={this.capitalizeFilterValue}
            reset={this.state.reset}
          />
        </SelectContainer>
      </EquipmentTableItem>
    )
  }

  keyedOnClick = (key: number) => () => this.props.onClick(key)

  renderSortColumn = (column: IColumn) => (
    <EquipmentTableItem
      key={column.key}
      onClick={this.keyedOnClick(column.key)}
      size={column.size}
    >
      <TableItemTitle>{this.renderTitle(column.displayName)}</TableItemTitle>
      <SortOrderIcon
        width={20}
        height={7}
        image={
          column.ascending
            ? this.props.theme.images.sortAsc
            : this.props.theme.images.sortDesc
        }
      />
    </EquipmentTableItem>
  )

  render = () => {
    const { columnData: columns } = this.props
    return (
      <TableRow>
        {columns.map(column =>
          column.type === ColumnType.Filter
            ? this.renderFilterColumn(column)
            : this.renderSortColumn(column),
        )}
        <EquipmentTableItem /> {/* spacer for untitled Select Action column */}
      </TableRow>
    )
  }
}

export default withTheme(EquipmentTableHeader)
