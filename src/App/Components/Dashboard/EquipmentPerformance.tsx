import React, { useState } from 'react'
import styled, { withTheme } from 'styled-components'

import PlantSearch from './PlantSearch'
import { KeyDetailsHeader } from '../EquipmentDetail'
import { UtilizationChart } from './Charts'

import { ThemeInterface } from '../../Themes'

const Container = styled.div`
  height: 350px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1410px) {
    height: 800px;
    flex-direction: column;
    align-items: center;
  }
`

const EquipmentInfoContainer = styled.div`
  width: 460px;
  margin-left: 30px;
`

interface BottomBorderProps {
  bottomBorder?: boolean
}
const ItemRow = styled.div<BottomBorderProps>`
  padding-left: 26px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  text-transform: capitalize;
  border-bottom: 1px solid
    ${({ theme, bottomBorder }) =>
      bottomBorder ? theme.colors.blueGray : theme.colors.transparent};
`

const ItemsOnSite = styled(ItemRow)`
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.darkGray};
  background-color: ${({ theme }) => theme.colors.bluishWhite};
`

const ItemRowText = styled.div`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`

const ItemRowLabel = styled(ItemRowText)``

const ItemRowMetric = styled(ItemRowText)`
  width: 110px;
`

const UtilizationContainer = styled.div`
  flex-shrink: 1;
  margin: 0 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface EquipmentPerformanceProps {
  fitlerSelect?: string
  data: any
  theme: ThemeInterface
}
export default withTheme((props: EquipmentPerformanceProps) => {
  const [selected, setSelected] = useState<any>({})

  const selectedCategory = props.data[`${selected.category}`]
  const categoryUtilization = selectedCategory ? selectedCategory.averageUtilisation : 0
  const itemsOnSite = selectedCategory ? selectedCategory.itemsOnSite : 0

  return (
    <Container>
      <EquipmentInfoContainer>
        {!!Object.keys(selected).length && (
          <KeyDetailsHeader equipmentItem={selected} hideActionButton wideAspectRatio />
        )}
        <ItemsOnSite bottomBorder>{`${itemsOnSite} items on site`}</ItemsOnSite>
        <ItemRow bottomBorder>
          <ItemRowLabel>Avg. Category Utilization</ItemRowLabel>
          <ItemRowMetric>{`${categoryUtilization}%`}</ItemRowMetric>
        </ItemRow>
        <ItemRow bottomBorder>
          <ItemRowLabel>Fuel Usage</ItemRowLabel>
          {!!selected.fuelUsed && (
            <ItemRowMetric>{`${selected.fuelUsed} Ltr`}</ItemRowMetric>
          )}
        </ItemRow>
        <ItemRow>
          <ItemRowLabel>Idle Time</ItemRowLabel>
          {!!selected.idlePercent && !!selected.idleHours && (
            <ItemRowMetric>
              {`${selected.idlePercent}% / ${selected.idleHours}h`}
            </ItemRowMetric>
          )}
        </ItemRow>
      </EquipmentInfoContainer>
      {selected.utilisation && (
        <UtilizationContainer>
          <UtilizationChart utilization={selected.utilisation} />
        </UtilizationContainer>
      )}
      <PlantSearch
        equipment={props.data}
        filterSelect={''}
        onSelect={setSelected}
        selected={selected}
      />
    </Container>
  )
})
