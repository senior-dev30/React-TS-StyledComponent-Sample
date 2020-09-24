import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Routes from './Containers/Routes'
import createStore from './Redux'
import themes from './Themes'
import './index.css'

const { store, persistor } = createStore()

export default class App extends React.Component<void, void> {
  public render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <ThemeProvider theme={themes}>
              <Routes />
            </ThemeProvider>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}
