console.log("main.tsx loaded")

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Onboarding from "./pages/Onboarding"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
