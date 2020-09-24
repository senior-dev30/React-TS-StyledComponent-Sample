import React from 'react'
import renderer from 'react-test-renderer'

import Hello from '../Hello'

test('renders correctly with defaults', () => {
  const tree = renderer
    .create(<Hello name="World" enthusiasmLevel={1} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
