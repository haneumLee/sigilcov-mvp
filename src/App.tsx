// App.tsx
import { Routes, Route } from "react-router-dom"
import Onboarding from "./pages/Onboarding"
import CreateWallet from "./pages/CreateWallet"
import Home from "./pages/Home"
import CoinDetail from "./pages/CoinDetail"
import Deposit from "./pages/Deposit"
import Withdraw from "./pages/Withdraw"
import { ROUTES } from "./routes"
import { Buffer } from "buffer"

// 타입스크립트에게 window.Buffer의 존재를 알려줌
declare global {
  interface Window {
    Buffer: typeof Buffer
  }
}

// 실제 window 객체에 Buffer를 할당
window.Buffer = Buffer

function App() {
  return (
      <Routes>
        <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
        <Route path={ROUTES.CREATE_WALLET} element={<CreateWallet />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.COIN_DETAIL_PATH} element={<CoinDetail />} />
        <Route path={ROUTES.DEPOSIT_PATH} element={<Deposit />} />
        <Route path={ROUTES.WITHDRAW_PATH} element={<Withdraw />} />
      </Routes>
  )
}

export default App