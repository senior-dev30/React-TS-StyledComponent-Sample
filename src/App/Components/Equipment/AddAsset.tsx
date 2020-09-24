import React from 'react'

import { FullScreenModal } from '../Global'
import { PageTitleRow, PageTitle } from '../Global/Page'
import AddAssetForm from './AddAssetForm'

import { ImmutableISiteArray } from '../../Redux/SiteRedux'

interface AddAssetProps {
  sites?: ImmutableISiteArray
  onClickClose(): void
  onClickAdd(): void
}
export default ({ onClickClose, onClickAdd, sites }: AddAssetProps) => {
  const submit = () => {
    onClickAdd()
    onClickClose()
  }

  return (
    <FullScreenModal onClickClose={onClickClose}>
      <PageTitleRow>
        <PageTitle>Add Asset</PageTitle>
      </PageTitleRow>
      <AddAssetForm onSubmit={submit} destroyOnUnmount sites={sites} />
    </FullScreenModal>
  )
}
