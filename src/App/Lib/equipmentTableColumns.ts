import { ColumnType } from '../../types/equipmentTable'

const contractorColumnData = [
  {
    key: 0,
    type: ColumnType.Filter,
    name: 'category',
    displayName: 'Type',
    size: 'compact',
  },
  {
    key: 1,
    type: ColumnType.Sort,
    name: 'plantNumber',
    displayName: 'Equipment ID.',
    size: 'compact',
  },
  {
    key: 2,
    type: ColumnType.Filter,
    name: 'manufacturer',
    displayName: 'Manufacturer',
    size: 'comfortable',
  },
  {
    key: 3,
    type: ColumnType.Filter,
    name: 'site',
    displayName: 'Site',
    size: 'comfortable',
  },
  {
    key: 4,
    type: ColumnType.Filter,
    name: 'fleet',
    displayName: 'Fleet',
    size: 'compact',
  },
]

const rentalColumnData = [
  {
    key: 0,
    type: ColumnType.Filter,
    name: 'category',
    displayName: 'Type',
    size: 'compact',
  },
  {
    key: 1,
    type: ColumnType.Sort,
    name: 'plantNumber',
    displayName: 'Equipment ID',
    size: 'compact',
  },
  {
    key: 2,
    type: ColumnType.Filter,
    name: 'manufacturer',
    displayName: 'Manufacturer',
    size: 'comfortable',
  },
  {
    key: 3,
    type: ColumnType.Filter,
    name: 'site',
    displayName: 'Site',
    size: 'compact',
  },
  {
    key: 4,
    type: ColumnType.Filter,
    name: 'customer',
    displayName: 'Customer',
    size: 'compact',
  },
  {
    key: 5,
    type: ColumnType.Filter,
    name: 'status',
    displayName: 'Status',
    size: 'compact',
  },
]

export { rentalColumnData, contractorColumnData }
