import React, { useState, useEffect } from "react"
import logo from "../assets/sigilcov-icon.png"
import CoinList from "../components/CoinList"
import WalletListModal from "../components/WalletListModal"
import WalletAuthModal from "../components/WalletAuthModal"
import { getWalletById, getWallets } from "../utils/indexedDB"
import { TOKEN_MAP } from "../utils/tokenMap"
import axios from "axios"


const Home: React.FC = () => {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("전체")
    const [coins, setCoins] = useState<any[]>([
        {
            id: "solana",
            name: "Solana",
            symbol: "SOL",
            image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
            balance: 0,
        },
    ])
    const [walletName, setWalletName] = useState("지갑 이름")
    const [wallets, setWallets] = useState<any[]>([])
    const [showWalletListModal, setShowWalletListModal] = useState(false)
    const [showWalletAuthModal, setShowWalletAuthModal] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState<any | null>(null)
	const [showDropdown, setShowDropdown] = useState(false)

	const toggleDropdown = () => {
        setShowDropdown(prev => !prev)
    }

    useEffect(() => {
        const walletId = localStorage.getItem("selectedWalletId")
        if (walletId) {
            getWalletById(Number(walletId)).then(wallet => {
                if (wallet) setWalletName(wallet.name)
            })
        }
    }, [])

    useEffect(() => {
        getWallets().then((result) => {
            setWallets(result)
        })
    }, [])

    useEffect(() => {
        const stored = localStorage.getItem("customTokens")
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (Array.isArray(parsed)) {
                    setCoins(parsed)
                }
            } catch (err) {
                console.error("로컬스토리지 파싱 실패:", err)
            }
        } else {
            // 최초 진입 시 Sol만 기본으로 넣기
            setCoins([
                {
                    id: "solana", 
                    name: "Solana",
                    symbol: "SOL",
                    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
                    balance: 0,
                }
            ])
        }
    }, [])

    const handleAuthSuccess = () => {
        if (selectedWallet) {
            setWalletName(selectedWallet.name)
            localStorage.setItem("selectedWalletId", selectedWallet.id)
        }
        setShowWalletAuthModal(false)
    }

    const handleAddCoin = async () => {
        const symbol = search.trim().toUpperCase()
        if (!symbol) {
            alert("심볼을 입력하세요.")
            return
        }

        const tokenInfo = TOKEN_MAP[symbol.toUpperCase()]
        if (!tokenInfo) {
            alert("지원하지 않는 심볼입니다.")
            return
        }

        try {
            const newCoin = {
                id: tokenInfo.address,
                name: tokenInfo.name,
                symbol: symbol,
                image: tokenInfo.logoURI,
                balance: 0,
            }
            // 이미 존재하면 추가 안 함
            if (coins.find((coin) => coin.symbol === symbol)) {
                alert("이미 추가된 토큰입니다.")
                return
            }
            setCoins(prev => {
                const updatedCoins = [...prev, newCoin]
                localStorage.setItem("customTokens", JSON.stringify(updatedCoins))
                return updatedCoins
            })
            setSearch("")
        } catch (err) {
            console.error("토큰 정보 불러오기 실패:", err)
            alert("토큰 정보를 불러올 수 없습니다.")
        }
    }

    return (
        <div style={{ background: "linear-gradient(to bottom right, #6b4c9a, #9b5de5)", minHeight: "100vh", padding: "20px", color: "white" }}>
            <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", padding: "10px" }}>
                <img src={logo} alt="logo" style={{ width: "75px", height: "75px" }} />
                <h1 style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", margin: 0 }}>코인 목록</h1>
                <button
                    style={{ marginLeft: "auto", padding: "10px 20px", borderRadius: "20px", border: "none", backgroundColor: "#ddd", color: "black", cursor: "pointer", fontWeight: "bold" }}
                    onClick={() => setShowWalletListModal(true)}
                >
                    {walletName}
                </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="코인 심볼 (예: USDT)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "30%", minWidth: "300px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginRight: "10px" }}
                />
                <button
                    onClick={handleAddCoin}
                    style={{ padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "white", color: "black", cursor: "pointer", fontWeight: "bold", marginRight: "10px" }}
                >
                    추가
                </button>
                <div style={{ position: "relative" }}>
				<button
					onClick={() => setFilter((prev) => (prev === "전체" ? "보유" : "전체"))}
					style={{
						padding: "10px 20px",
						borderRadius: "5px",
						border: "none",
						backgroundColor: "white",
						color: "black",
						cursor: "pointer",
						fontWeight: "bold",
						marginRight: "10px",
					}}
				>
					{filter}
				</button>
				
			</div>
            </div>

            <CoinList coins={coins} filter={filter} />

            {showWalletListModal && (
                <WalletListModal
                    wallets={wallets}
                    onSelect={(wallet) => {
                        setSelectedWallet(wallet)
                        setShowWalletListModal(false)
                        setShowWalletAuthModal(true)
                    }}
                    onClose={() => setShowWalletListModal(false)}
                    onLogout={() => {
                        localStorage.removeItem("selectedWalletId")
                        window.location.reload()
                    }}
                />
            )}

            {showWalletAuthModal && selectedWallet && (
                <WalletAuthModal
                    wallet={selectedWallet}
                    onSuccess={handleAuthSuccess}
                    onClose={() => setShowWalletAuthModal(false)}
                />
            )}
        </div>
    )
}

export default Home