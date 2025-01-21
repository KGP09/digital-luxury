import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Home from './components/Hero.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App data-theme="light"/>
  </StrictMode>,
)