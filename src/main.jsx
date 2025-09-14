import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { OrientationWrapper } from './OrientationWrapper.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OrientationWrapper>
      <App />
    </OrientationWrapper>
  </React.StrictMode>,
)