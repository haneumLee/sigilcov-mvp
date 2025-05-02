import React, { useState, useEffect } from "react"
import logo from "../assets/sigilcov-icon.png"
import CoinList from "../components/CoinList"
import WalletListModal from "../components/WalletListModal"
import WalletAuthModal from "../components/WalletAuthModal"
import { getWalletById, getWallets } from "../utils/indexedDB"

const Home: React.FC = () => {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("전체")
    const [walletName, setWalletName] = useState("지갑 이름")
    const [wallets, setWallets] = useState<any[]>([])
    const [showWalletListModal, setShowWalletListModal] = useState(false)
    const [showWalletAuthModal, setShowWalletAuthModal] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState<any | null>(null)

    useEffect(() => {
        const walletId = localStorage.getItem("selectedWalletId")
        if (walletId) {
            getWalletById(Number(walletId))
                .then(wallet => {
                    if (wallet) setWalletName(wallet.name)
                })
        }
    }, [])

    useEffect(() => {
        getWallets().then((result) => {
            setWallets(result)
        })
    }, [])

    // 인증 성공 시 실행할 함수
    const handleAuthSuccess = () => {
        if (selectedWallet) {
            setWalletName(selectedWallet.name)
            localStorage.setItem("selectedWalletId", selectedWallet.id)
        }
        setShowWalletAuthModal(false)
    }

    return (
        <div style={{ background: "linear-gradient(to bottom right, #6b4c9a, #9b5de5)", minHeight: "100vh", padding: "20px", color: "white" }}>
            {/* 상단 */}
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

            {/* 검색 & 필터 */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <input
                    type="text"
                    placeholder="코인명 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "30%", minWidth: "300px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginRight: "10px" }}
                />
                <div>
                    <div style={{ padding: "10px", background: "white", color: "black" }}>{filter}</div>
                </div>
            </div>

            {/* 코인 리스트 */}
            <CoinList search={search} filter={filter} />

            {/* 지갑 목록 모달 */}
            {showWalletListModal && (
                <WalletListModal
                    wallets={wallets}
                    onSelect={(wallet) => {
                        setSelectedWallet(wallet)  // 선택만 하고 인증 모달 띄움
                        setShowWalletListModal(false)
                        setShowWalletAuthModal(true)
                    }}
                    onClose={() => setShowWalletListModal(false)}
                />
            )}

            {/* 지갑 인증 모달 */}
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