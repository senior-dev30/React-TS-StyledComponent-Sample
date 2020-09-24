import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { SearchInput } from '../Global'

const Container = styled.div`
  width: 432px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1410px) {
    height: 200px;
  }
`

const SearchContainer = styled.div`
  margin-right: 30px;
`

const ResultsContainer = styled.div`
  padding: 0 30px 0 5px;
  margin: 15px 0;
  overflow-y: scroll;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

interface PlantResultProps {
  selected: boolean
}
const PlantResult = styled.div<PlantResultProps>`
  height: 36px;
  margin-bottom: 5px;
  flex-basis: 49.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  letter-spacing: 0.5px;
  line-height: 17px;
  text-transform: uppercase;
  color: ${({ theme, selected }) => (selected ? theme.colors.white : theme.colors.gray)};
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.blue : theme.colors.bluishWhite};
  border-radius: 2px;
  border: 1px solid ${({ theme, selected }) => (selected ? 'none' : theme.colors.gray)};
  cursor: pointer;
`

// @FIXME: normalize plant data on backend to fit IEquipmentData type
interface PlantSearchProps {
  equipment: {
    [key: string]: {
      [key: string]: string
    }
  }
  filterSelect: string
  onSelect(plant: any): void
  selected: any
}
export default (props: PlantSearchProps) => {
  const [query, setQuery] = useState('')

  // data massaging
  const equipmentTypes = Object.keys(props.equipment)
  const plants = props.filterSelect
    ? props.equipment[props.filterSelect].plants
    : Object.assign({}, ...equipmentTypes.map(type => props.equipment[type].plants))
  const plantNames = Object.keys(plants)

  // handle text change
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setQuery(event.target.value.toUpperCase())
  }

  // hanle plant selection
  const handleClick = (plantNumber: string) => () =>
    props.onSelect({ plantNumber, ...plants[plantNumber] })

  // preselect first item on mount if it exists
  useEffect(() => {
    if (!!plantNames.length)
      props.onSelect({ plantNumber: plantNames[0], ...plants[plantNames[0]] })
  }, [])

  return (
    <Container>
      <SearchContainer>
        <SearchInput placeholder="Search plant" onChange={handleOnChange} />
      </SearchContainer>
      <ResultsContainer>
        {plantNames
          .filter(plant => (query ? plant.includes(query) : true))
          .map(plant => (
            <PlantResult
              key={plant}
              onClick={handleClick(plant)}
              selected={plant === props.selected.plantNumber}
            >
              {plant ? `${plant}` : '[Missing Plant No.]'}
            </PlantResult>
          ))}
      </ResultsContainer>
    </Container>
  )
}
