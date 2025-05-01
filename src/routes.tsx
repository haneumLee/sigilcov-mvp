// routes.tsx
export const ROUTES = {
    ONBOARDING: "/",
    CREATE_WALLET: "/create-wallet",
    HOME: "/home",
    COIN_DETAIL_PATH: "/coin/:symbol", // Route 등록용,
    COIN_DETAIL: (symbol: string) => `/coin/${symbol}`, // 이동용
    DEPOSIT_PATH: "/deposit/:symbol",
    DEPOSIT: (symbol: string) => `/deposit/${symbol}`,
    WITHDRAW_PATH: "/withdraw/:symbol",
    WITHDRAW: (symbol: string) => `/withdraw/${symbol}`,
    // 앞으로 추가할 경로도 여기에 관리
  }