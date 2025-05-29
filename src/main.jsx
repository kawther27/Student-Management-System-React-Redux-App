import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/index.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import { BrowserRouter as Router } from 'react-router-dom'

const persistedStore = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading ...</div>} persistor={persistedStore}>
       <Router>
       <App />
       </Router>
       
      </PersistGate>
    </Provider>

  </React.StrictMode>,
)
