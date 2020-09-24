const addThousandsSepartor = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const removeDecimal = (value: number) => value.toFixed(0)

const addCurrencyPrefix = (value: string) => `£${value}`

const addKilograms = (value: string) => `${value} kg`

const addHours = (value: string) => `${value} h.`

const addLitres = (value: string) => `${value} ltr`

const capitalizeString = (text?: any) =>
  text && typeof text === 'string'
    ? text[0].toUpperCase() + text.slice(1).toLowerCase()
    : text

const capitalizeStringArray = (strings: string[]) => strings.map(capitalizeString)

export {
  addCurrencyPrefix,
  addHours,
  addKilograms,
  addLitres,
  addThousandsSepartor,
  removeDecimal,
  capitalizeString,
  capitalizeStringArray,
}
