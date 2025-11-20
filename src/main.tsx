import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ServerList from './ServerList.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ServerList />
    <App />
  </StrictMode>,
)
