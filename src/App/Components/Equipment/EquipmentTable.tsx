import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components'
import { withRouter } from 'react-router'

// relative imports
import { capitalizeString } from '../../Lib/formatValues'

// component imports
import { Image, HorizontalDivider, SearchInput } from '../Global'
import EquipmentTableItem from './EquipmentTableItem'
import EquipmentTableHeader from './EquipmentTableHeader'
import SelectActionPopover from './SelectActionPopover'

// type imports
import { ThemeInterface } from '../../Themes'
import { ImmutableIEquipmentArray, IEquipmentData } from '../../Redux/EquipmentRedux'
import { Link } from 'react-router-dom'

const Container = styled.div``

const SearchBar = styled.div`
  padding: 0 30px;
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const ClearFilterButton = styled.button`
  width: 120px;
  height: 28px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  border: none;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(206, 206, 209, 0.25);
  cursor: pointer;
  text-transform: uppercase;
`

const SearchContainer = styled.div`
  width: 260px;
`

const TableHeaderRow = styled.div`
  width: 100%;
  height: 90px;
  padding: 26px 36px;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.darkGray};
  text-transform: uppercase;
`

const Table = styled.div`
  width: 100%;
  padding: 0 19px;
`

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

const TableItem = styled(EquipmentTableItem)`
  padding-left: 10px;
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.blue};
  text-decoration: none;
`

// types
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
  ascending?: boolean
  [key: string]: string | number | boolean | undefined
}

interface IFilter {
  filterType: string
  filterValue: string
}

interface EquipmentTableProps {
  data: ImmutableIEquipmentArray
  columnData: IColumn[]
  companyType: string | undefined
  reportAnIssue(equipmentID: number): () => void
  assignEquipment(equipmentID: number): () => void
  unassignEquipment(equipmentID: number): void
  history: any
  theme: ThemeInterface
}

class EquipmentTable extends Component<EquipmentTableProps> {
  searchInputRef: any
  state = {
    filters: [],
    sortType: 'plantNumber',
    sortOrderAsc: true,
    query: '',
  }

  // popover handlers
  navToEquipment = (equipmentID: number) => () => {
    this.props.history.push(`equipment/${equipmentID}`)
  }

  // sort and filter logic
  sortTableRows = (a: IEquipmentData, b: IEquipmentData) => {
    const { sortType, sortOrderAsc } = this.state
    const fieldValueA = a[sortType]
    const fieldValueB = b[sortType]
    if (fieldValueA === fieldValueB) return 0
    return sortOrderAsc
      ? this.compareAsc(fieldValueA, fieldValueB)
      : this.compareDesc(fieldValueA, fieldValueB)
  }

  compareAsc = (a: any, b: any) => (a > b ? 1 : -1)
  compareDesc = (a: any, b: any) => (a > b ? -1 : 1)

  handleFilterSelect = (filterType: string) => (filter: IFilter) => {
    const replaceFilter = (filter: IFilter) => filter.filterType !== filterType

    // user selected top-level placeholder option; remove if existing filter for type
    if (!filter) {
      return this.setState({
        filters: [...this.state.filters.filter(replaceFilter)],
      })
    }

    // user selected a legitimate option; replace if existing filter for type
    const { filterValue } = filter
    return this.setState({
      filters: [...this.state.filters.filter(replaceFilter), { filterType, filterValue }],
    })
  }

  handleSortSelect = (key: number) => {
    const { columnData } = this.props
    const column = columnData[key] || { name: null }
    const sortType = column.name
    if (sortType) this.setState({ sortType, sortOrderAsc: !this.state.sortOrderAsc })
  }

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    this.setState({ query: event.target.value.toUpperCase(), filters: [] })
  }

  shouldRenderRow = (row: IEquipmentData, { filterType, filterValue }: IFilter) =>
    filterType && filterValue ? row[filterType] === filterValue : true

  clearFilters = () => {
    this.setState({ filters: [], sortOrderAsc: true, query: '' })
    this.searchInputRef.value = ''
  }

  // refs
  setupSearchInputRef = (ref: any) => (this.searchInputRef = ref)

  render = () => {
    const {
      data,
      columnData,
      companyType,
      theme,
      assignEquipment,
      reportAnIssue,
    } = this.props
    const { query, filters, sortOrderAsc } = this.state
    const isRentalUser = companyType === 'Rental'

    return (
      <Container>
        <SearchBar>
          {(!!filters.length || query) && (
            <ClearFilterButton onClick={this.clearFilters}>
              Clear filters
            </ClearFilterButton>
          )}
          <SearchContainer>
            <SearchInput
              placeholder="Search assets"
              onChange={this.handleSearch}
              ref={this.setupSearchInputRef}
            />
          </SearchContainer>
        </SearchBar>
        <HorizontalDivider />
        <TableHeaderRow>Asset List</TableHeaderRow>{' '}
        <Table>
          <EquipmentTableHeader
            data={data}
            columnData={columnData.map(column => ({
              ...column,
              ascending: sortOrderAsc,
            }))}
            onChange={this.handleFilterSelect}
            onClick={this.handleSortSelect}
            filters={filters}
          />
          {data
            .asMutable()
            .filter(row => filters.every(filter => this.shouldRenderRow(row, filter)))
            .filter(row =>
              query ? row.plantNumber && row.plantNumber.includes(query) : true,
            )
            .sort(this.sortTableRows)
            .map(row => (
              <TableRow key={row.equipmentID}>
                <TableItem size={'compact'} spaceBetween={15}>
                  <Image
                    image={
                      row.category
                        ? `${theme.images[row.category.toLowerCase()]}`
                        : `${theme.images.dumper}`
                    }
                    width={20}
                    height={16}
                  />
                  {capitalizeString(row.category)}
                </TableItem>
                <TableItem size={'compact'}>
                  <StyledLink to={`/equipment/${row.equipmentID}`}>
                    {row.plantNumber}
                  </StyledLink>
                </TableItem>
                <TableItem size={'comfortable'}>{row.manufacturer}</TableItem>
                <TableItem size={isRentalUser ? 'compact' : 'comfortable'}>
                  {row.site}
                </TableItem>
                {!isRentalUser && (
                  <TableItem size={'compact'}>{capitalizeString(row.fleet)}</TableItem>
                )}
                {isRentalUser && <TableItem size={'compact'}>{row.customer}</TableItem>}
                {isRentalUser && <TableItem size={'compact'}>{row.status}</TableItem>}
                <TableItem>
                  <SelectActionPopover
                    equipment={row}
                    openAssignModal={assignEquipment(row.equipmentID)}
                    navToEquipmentPage={this.navToEquipment(row.equipmentID)}
                    openReportProblemModal={reportAnIssue(row.equipmentID)}
                    offHireEquipment={this.props.unassignEquipment}
                  />
                </TableItem>
              </TableRow>
            ))}
        </Table>
      </Container>
    )
  }
}

export default withRouter<any>(withTheme(EquipmentTable))
