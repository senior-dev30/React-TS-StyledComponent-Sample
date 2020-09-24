import React from 'react'
import styled from 'styled-components'

import { Image, Popover } from '../../Components/Global'
import { CustomSelect } from '../../Components/Global/Forms'

// hack to avoid passing a withTheme-wrapped renderFn, which Typescript did not like
import images from '../../Themes/images'

const ChartHeaderContainer = styled.div`
  width: 100%;
  height: 68px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
`

const TitleContainer = styled.div`
  margin-left: 6px;
  display: flex;
  align-items: center;
  & > * {
    margin-right: 10px;
  }
`

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.darkGray};
`

const SelectContainer = styled.div`
  width: 160px;
`

const InformationIcon = styled(Image)``

const renderInformationIcon = () => (
  <InformationIcon width={16} height={16} image={images.info} />
)

interface ChartHeaderProps {
  title: string
  information?: string
  filterOptions?: string[]
  setSelected: React.Dispatch<React.SetStateAction<string>>
  selectPlaceholder?: string
}
export default ({
  title,
  information,
  filterOptions,
  setSelected,
  selectPlaceholder,
}: ChartHeaderProps) => {
  const handleSelect = (selected: { name: string }) =>
    setSelected(selected ? selected.name : '')

  return (
    <ChartHeaderContainer>
      <TitleContainer>
        <Title>{title}</Title>
        {information && (
          <Popover
            renderFn={renderInformationIcon}
            backgroundColor="blue"
            textColor="white"
            padding={10}
            marginLeft={-11}
          >
            {information}
          </Popover>
        )}
      </TitleContainer>
      {filterOptions && !!filterOptions.length && (
        <SelectContainer>
          <CustomSelect
            options={filterOptions}
            onSelect={handleSelect}
            placeholder={selectPlaceholder}
            valueKey="name"
            displayKey="name"
            height={28}
          />
        </SelectContainer>
      )}
    </ChartHeaderContainer>
  )
}
