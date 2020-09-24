import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Modal from 'react-modal'
import dayjs from 'dayjs'

// component imports
import {
  customModalStyles,
  ModalHeader as Header,
  ModalForm as Form,
} from '../Global/MiniModal'
import { CustomSelect } from '../Global/Forms'

// redux imports
import EquipmentActions, {
  IContractData,
  ImmutableIEquipmentArray,
} from '../../Redux/EquipmentRedux'

// type imports
import { IProject, ImmutableIProjectArray, ProjectType } from '../../Redux/ProjectRedux'
import {
  ICustomer,
  CustomerType,
  ImmutableICustomerArray,
} from '../../Redux/CustomerRedux'

// required to enable screen reader accessibility & stop react-modal warnings
Modal.setAppElement('#root')

// styled components
const AssignButtonContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const AssignButton = styled.button`
  height: 38px;
  width: 80px;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  text-transform: uppercase;
  border: none;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(206, 206, 209, 0.25);
  text-transform: uppercase;
  cursor: pointer;
  :disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
  }
`

const styles = {
  content: { ...customModalStyles.content, height: 320 },
  overlay: customModalStyles.overlay,
}

// types
interface MapStateTypes {
  projects: ProjectType
  customers: CustomerType
}

interface MapPropsTypes {
  projects: ImmutableIProjectArray
  customers: ImmutableICustomerArray
}

interface IProps {
  equipmentID: number
  equipment: ImmutableIEquipmentArray
  isOpen: boolean
  onRequestClose(): void
  assignEquipment(issue: IContractData): any
}

const AssignTo = ({
  isOpen,
  equipment,
  equipmentID,
  customers,
  projects,
  assignEquipment,
  onRequestClose,
}: IProps & MapPropsTypes) => {
  const [project, setProject] = useState<IProject | undefined>(undefined)
  const [customer, setCustomer] = useState<ICustomer | undefined>(undefined)

  const handleSubmit = () => {
    if (project && customer && equipmentID)
      assignEquipment({
        projectID: project.projectID,
        customerID: customer.customerID,
        equipmentID,
        dateFrom: dayjs(Date()).format('YYYY-MM-DD'),
      })
    onRequestClose()
  }

  const equipmentItem = equipment
    ? equipment.find(item => item.equipmentID === equipmentID)
    : null
  const plantNumber = equipmentItem ? equipmentItem.plantNumber : ''

  return (
    <Modal
      isOpen={isOpen}
      style={styles}
      contentLabel="Customize Report"
      onRequestClose={onRequestClose}
    >
      <Header
        title={`${plantNumber || ''} Assign To...`}
        icon="assign"
        onRequestClose={onRequestClose}
      />
      <Form>
        <CustomSelect
          options={projects.asMutable()}
          placeholder="Project"
          onSelect={setProject}
          valueKey="projectID"
          displayKey="name"
        />
        <CustomSelect
          options={customers.asMutable()}
          placeholder="Customer"
          onSelect={setCustomer}
          valueKey="customerID"
          displayKey="name"
        />
        <AssignButtonContainer>
          <AssignButton disabled={!project || !customer} onClick={handleSubmit}>
            Assign
          </AssignButton>
        </AssignButtonContainer>
      </Form>
    </Modal>
  )
}

const mapState = ({
  projects: { entities: projects },
  customers: { entities: customers },
}: MapStateTypes): MapPropsTypes => ({
  projects,
  customers,
})

const mapDispatch = (dispatch: any) => ({
  assignEquipment: (assignData: IContractData) =>
    dispatch(EquipmentActions.assignEquipment(assignData)),
})

export default connect(
  mapState,
  mapDispatch,
)(AssignTo)
