import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(quarterOfYear)

const today = dayjs(new Date()).format('YYYY-MM-DD')

const startOfWeek = dayjs()
  .startOf('week')
  .format('YYYY-MM-DD')

const startOfMonth = dayjs()
  .startOf('month')
  .format('YYYY-MM-DD')

const startOfYear = dayjs()
  .startOf('year')
  .format('YYYY-MM-DD')

// fiscal quarters
const startOfQ1 = startOfYear
const startOfQ2 = dayjs(Date())
  .set('month', 3)
  .set('date', 1)
  .format('YYYY-MM-DD')
const startOfQ3 = dayjs(Date())
  .set('month', 6)
  .set('date', 1)
  .format('YYYY-MM-DD')
const startOfQ4 = dayjs(Date())
  .set('month', 9)
  .set('date', 1)
  .format('YYYY-MM-DD')

const quarters = [startOfQ1, startOfQ2, startOfQ3, startOfQ4]

const getNearestAgoQuarterStart = () =>
  quarters[dayjs(new Date()).quarter() - 1]

const getDateRange = (interval: string) => {
  let dateTo = today
  let dateFrom = startOfWeek
  switch (interval.toUpperCase()) {
    case 'YTD':
      dateFrom = startOfYear
      break
    case 'QTD':
      dateFrom = getNearestAgoQuarterStart()
      break
    case 'MTD':
      dateFrom = startOfMonth
      break
    case 'WTD':
    default:
      break
  }
  return { dateFrom, dateTo }
}

const isStartOfRange = (date: string) =>
  [startOfWeek, startOfMonth, ...quarters, startOfYear].some(
    startDate => startDate === dayjs(date).format('YYYY-MM-DD'),
  )

export { getDateRange, isStartOfRange }
