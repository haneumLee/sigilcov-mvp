import React, { useState } from "react"
import Button from "../components/Button"
import logo from "../assets/sigilcov-icon.png"
import { getWallets } from "../utils/indexedDB"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../routes"
import WalletLoginModal from "../components/WalletLoginModal"
import WalletListModal from "../components/WalletListModal"
import WalletAuthModal from "../components/WalletAuthModal"

const Onboarding: React.FC = () => {
	const [wallets, setWallets] = useState<any[]>([])
	const [showWalletListModal, setShowWalletListModal] = useState(false)
	const [showWalletAuthModal, setShowWalletAuthModal] = useState(false)
	const [selectedWallet, setSelectedWallet] = useState<any | null>(null)

	const navigate = useNavigate()

	const handleLogin = async () => {
		try {
			const wallets = await getWallets()
			if (wallets.length > 0) {
				setWallets(wallets)
				setShowWalletListModal(true)
			} else {
				alert("등록된 지갑이 없습니다. 지갑을 생성해주세요.")
			}
		} catch (error) {
			console.error("지갑 조회 실패:", error)
			alert("지갑 조회 중 오류가 발생했습니다.")
		}
	}

	return (
		<div style={{
			background: "linear-gradient(to bottom right, #6b4c9a, #9b5de5)",
			height: "100vh",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			gap: "20px"
		}}>
			<img src={logo} alt="logo" style={{ width: "120px", marginBottom: "40px" }} />
			<Button text="로그인" onClick={handleLogin} />
			<Button text="지갑 생성" onClick={() => navigate(ROUTES.CREATE_WALLET)} />
			<Button text="지갑 추가" onClick={() => console.log("지갑 추가")} />

			{/* 지갑 목록 모달 */}
			{showWalletListModal && (
				<WalletListModal
					wallets={wallets}
					onSelect={(wallet) => {
						setShowWalletListModal(false)
						setSelectedWallet(wallet)
						setShowWalletAuthModal(true)
					}}
					onClose={() => setShowWalletListModal(false)}
					onLogout={() => {
						// 온보딩에서는 로그아웃 기능 불필요하니까 비워두거나 주석으로 남김
					}}
				/>
			)}

			{/* 지갑 인증 모달 */}
			{showWalletAuthModal && selectedWallet && (
				<WalletAuthModal
					wallet={selectedWallet}
					onSuccess={() => {
						console.log("로그인 성공:", selectedWallet)
						if (selectedWallet) {
							localStorage.setItem("selectedWalletId", selectedWallet.id.toString())
						}
						const id = localStorage.getItem("selectedWalletId")
						console.log("navigate 직전 walletId:", id) 
						navigate(ROUTES.HOME)
					}}
					onClose={() => setShowWalletAuthModal(false)}
				/>
			)}
		</div>
	)
}

export default Onboarding
