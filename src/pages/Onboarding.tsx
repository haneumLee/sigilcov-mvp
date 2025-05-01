import React, { useState } from "react"
import Button from "../components/Button"
import logo from "../assets/sigilcov-icon.png"
import { getWallets } from "../utils/indexedDB"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../routes"
import WalletLoginModal from "../components/WalletLoginModal"

const Onboarding: React.FC = () => {
	const [wallets, setWallets] = useState<any[]>([])
	const [showWalletModal, setShowWalletModal] = useState(false)
	const [selectedWallet, setSelectedWallet] = useState<any | null>(null)
	const [showLoginModal, setShowLoginModal] = useState(false)

	const navigate = useNavigate()

	const handleLogin = async () => {
		try {
			const wallets = await getWallets()
			if (wallets.length > 0) {
				setWallets(wallets)
				setShowWalletModal(true)
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

			{showWalletModal && (
				<div style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					zIndex: 100
				}}>
					<div style={{
						backgroundColor: "#222",
						color: "#fff",
						padding: "20px",
						borderRadius: "12px",
						width: "300px",
						textAlign: "center"
					}}>
						<h3 style={{ marginBottom: "16px" }}>지갑 선택</h3>
						{wallets.map((w) => (
							<div key={w.id} style={{
								margin: "10px 0",
								padding: "10px",
								backgroundColor: "#444",
								borderRadius: "8px",
								cursor: "pointer"
							}} onClick={() => {
								console.log("선택된 지갑:", w)
								localStorage.setItem("selectedWalletId", w.id.toString())
								setSelectedWallet(w)
								setShowWalletModal(false)
								setShowLoginModal(true)
							}}>
								{w.name}
							</div>
						))}
						<Button text="닫기" onClick={() => setShowWalletModal(false)} />
					</div>
				</div>
			)}

			{showLoginModal && selectedWallet && (
				<WalletLoginModal
					wallet={selectedWallet}
					onClose={() => setShowLoginModal(false)}
					onSuccess={() => {
						console.log("로그인 성공")
						navigate(ROUTES.HOME)
					}}
				/>
			)}
		</div>
	)
}

export default Onboarding
