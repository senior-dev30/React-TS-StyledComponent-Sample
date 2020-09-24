import React from 'react'
import Enzyme, { mount, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ThemeProvider } from 'styled-components'
import * as theme from './App/Themes'

global.fetch = require('jest-fetch-mock')
Enzyme.configure({ adapter: new Adapter() })

export const mountWithTheme = children =>
  mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

export const renderWithTheme = children =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

export const shallowWithTheme = children =>
  shallow(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
