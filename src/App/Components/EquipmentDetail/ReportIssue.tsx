import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Modal from 'react-modal'

// component imports
import {
  customModalStyles,
  ModalHeader as Header,
  ModalForm as Form,
} from '../Global/MiniModal'
import { Input, CustomSelect } from '../Global/Forms'

// redux imports
import EquipmentActions, { ICreateIssue } from '../../Redux/EquipmentRedux'

// required to enable screen reader accessibility & stop react-modal warnings
Modal.setAppElement('#root')

// constants

const impacts = [
  { value: 'low', display: 'Low' },
  { value: 'medium', display: 'Medium' },
  { value: 'high', display: 'High' },
]

// styled components
const ReportButtonContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

const ReportButton = styled.button`
  height: 38px;
  width: 80px;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  text-transform: uppercase;
  border: none;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.magenta};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(206, 206, 209, 0.25);
  cursor: pointer;
  :disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
  }
`

const styles = {
  content: { ...customModalStyles.content, height: 360 },
  overlay: customModalStyles.overlay,
}

interface IProps {
  equipmentID: number
  isOpen: boolean
  onRequestClose(): void
  reportEquipmentIssue(issue: ICreateIssue): any
}
const ReportIssue = ({
  isOpen,
  equipmentID,
  onRequestClose,
  reportEquipmentIssue,
}: IProps) => {
  // description field logic
  const [description, setDescription] = useState('')
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setDescription(event.target.value)
  }

  // error code logic
  const [errorCode, setErrorCode] = useState('')
  const handleErrorCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setErrorCode(event.target.value)
  }

  // impact level logic
  const [impact, setImpact] = useState('low')
  const handleImpactChange = ({ value }: { value: string }) => {
    setImpact(value)
  }

  // submission
  const handleSubmit = () => {
    reportEquipmentIssue({ equipmentID, description, errorCode, impact })
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      style={styles}
      contentLabel="Customize Report"
      onRequestClose={onRequestClose}
    >
      <Header title="Report Issue" icon="warning" onRequestClose={onRequestClose} />
      <Form>
        <Input
          type="text"
          placeholder="Description (required)"
          value={description}
          onChange={handleDescriptionChange}
        />
        <Input
          placeholder="Error code (optional)"
          value={errorCode}
          onChange={handleErrorCodeChange}
        />
        <CustomSelect
          options={impacts}
          onSelect={handleImpactChange}
          valueKey="value"
          displayKey="display"
          initialValue={impacts[0]}
        />
        <ReportButtonContainer>
          <ReportButton disabled={!description} onClick={handleSubmit}>
            REPORT
          </ReportButton>
        </ReportButtonContainer>
      </Form>
    </Modal>
  )
}

const mapDispatch = (dispatch: any) => ({
  reportEquipmentIssue: (issue: ICreateIssue) =>
    dispatch(EquipmentActions.reportEquipmentIssue(issue)),
})

export default connect(
  null,
  mapDispatch,
)(ReportIssue)
