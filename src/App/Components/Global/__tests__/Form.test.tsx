import React from 'react'
// import renderer from 'react-test-renderer'
import { shallowWithTheme } from '../../../../setupTests'

import Form from '../FormRows'

const formData = [
  { icon: '', placeholder: 'email', type: 'email', name: 'email' },
  { icon: '', placeholder: 'password', type: 'password', name: 'password' },
  {
    icon: '',
    placeholder: 'confirm password',
    type: 'password',
    name: 'password',
  },
]

test('renders correctly with defaults', () => {
  shallowWithTheme(<Form formRows={formData} />)
})
