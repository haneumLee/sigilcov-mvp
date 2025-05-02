import React, { useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import Button from "./Button"

interface WalletAuthModalProps {
	wallet: { name: string; password?: string; mnemonic: string }
	onClose: () => void
	onSuccess: () => void
}

const WalletAuthModal: React.FC<WalletAuthModalProps> = ({ wallet, onClose, onSuccess }) => {
	const [input, setInput] = useState("")
	const [error, setError] = useState("")

	const isPasswordMode = !!wallet.password

	const handleSubmit = () => {
		if (isPasswordMode) {
			if (input === wallet.password) {
				onSuccess()
			} else {
				setError("비밀번호가 일치하지 않습니다")
			}
		} else {
			if (input.trim() === wallet.mnemonic.trim()) {
				onSuccess()
			} else {
				setError("비밀구절이 일치하지 않습니다")
			}
		}
	}

	return (
		<div style={{
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			backgroundColor: "rgba(0,0,0,0.6)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: 20
		}}>
			<div style={{
				backgroundColor: "#222",
				padding: "30px",
				borderRadius: "16px",
				textAlign: "center",
				width: "300px",
				color: "white"
			}}>
				<div style={{
					display: "flex",
					alignItems: "center",
					marginBottom: "20px"
				}}>
					<AiOutlineArrowLeft onClick={onClose} style={{ cursor: "pointer", fontSize: "20px" }} />
					<div style={{ flex: 1, fontWeight: "bold", fontSize: "18px" }}>
						{wallet.name}
					</div>
				</div>

				<h3 style={{ marginBottom: "10px" }}>{isPasswordMode ? "간편 인증" : "비밀구절"}</h3>

				{isPasswordMode ? (
					<input
						type="password"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="비밀번호"
						style={{ width: "100%", padding: "10px", fontSize: "16px", marginBottom: "10px" }}
					/>
				) : (
					<textarea
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="비밀구절"
						rows={3}
						style={{ width: "100%", padding: "10px", fontSize: "16px", marginBottom: "10px" }}
					/>
				)}

				{error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

				<Button text="확인" onClick={handleSubmit} />
			</div>
		</div>
	)
}

export default WalletAuthModal
