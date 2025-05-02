// src/components/WalletListModal.tsx
import React from "react"
import Button from "./Button"

interface WalletListModalProps {
	wallets: any[]
	onSelect: (wallet: any) => void
	onClose: () => void
    onLogout: () => void
}

const WalletListModal: React.FC<WalletListModalProps> = ({ wallets, onSelect, onClose, onLogout }) => {

	return (
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

				{wallets.length === 0 ? (
					<p style={{ margin: "20px 0", color: "#aaa" }}>등록된 지갑이 없습니다.</p>
				) : (
					wallets.map((w) => (
						<div
							key={w.id}
							style={{
								margin: "10px 0",
								padding: "10px",
								backgroundColor: "#444",
								borderRadius: "8px",
								cursor: "pointer",
								transition: "background 0.2s"
							}}
							onClick={() => onSelect(w)}
							onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
							onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#444")}
						>
							{w.name}
						</div>
					))
				)}

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                    <Button text="로그아웃" onClick={onLogout} style={{ flex: 1, maxWidth: "120px", padding: "8px 0" }} />
                    <Button text="닫기" onClick={onClose} style={{ flex: 1, maxWidth: "120px", padding: "8px 0" }} />
                </div>
			</div>
		</div>
	)
}

export default WalletListModal;