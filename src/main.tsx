import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactGptApp } from './ReactGptApp'
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactGptApp />
  </StrictMode>,
)
