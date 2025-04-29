import { Routes, Route } from "react-router-dom"
import Onboarding from "./pages/Onboarding"
import CreateWallet from "./pages/CreateWallet" // 만들 페이지

import { ROUTES } from "./routes"

function App() {
  return (
    <Routes>
      <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
      <Route path={ROUTES.CREATE_WALLET} element={<CreateWallet />} />
    </Routes>
  )
}

export default App