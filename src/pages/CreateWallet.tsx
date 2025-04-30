import React, { useState } from "react"
import { generateMnemonic } from "../utils/mnemonic"
import logo from "../assets/sigilcov-icon.png"
import Button from "../components/Button"
import { isWalletNameDuplicate, saveWallet } from "../utils/indexedDB"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../routes"

const CreateWallet: React.FC = () => {
	const [mnemonic, setMnemonic] = useState<string>("")
	const [showNameModal, setShowNameModal] = useState(false)
	const [hasAgreed, setHasAgreed] = useState(false)
	const [copied, setCopied] = useState(false)
	const [walletName, setWalletName] = useState("")
	const [nameError, setNameError] = useState("")
	const [showPasswordModal, setShowPasswordModal] = useState(false)
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [passwordError, setPasswordError] = useState("")
	const [showToast, setShowToast] = useState(false)
	const navigate = useNavigate()

	const handleGenerate = () => {
		const newMnemonic = generateMnemonic()
		setMnemonic(newMnemonic)
	}

	const handleCopy = () => {
		if (!mnemonic) return
		navigator.clipboard.writeText(mnemonic)
		console.log("copied")
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const handleSaveName = async () => {
		if (!walletName.trim()) {
			setNameError("지갑 이름을 입력해주세요.")
			return
		}

		const isDuplicate = await isWalletNameDuplicate(walletName)
		if (isDuplicate) {
			setNameError("이미 존재하는 지갑 이름입니다.")
			return
		}

		setNameError("")
		setShowNameModal(false)
		setShowPasswordModal(true)
	}

	const handleSavePassword = async () => {
		if (!password || !confirmPassword) {
			setPasswordError("비밀번호를 입력해주세요.")
			return
		}
		if (password !== confirmPassword) {
			setPasswordError("비밀번호가 일치하지 않습니다.")
			return
		}

		const walletData = {
			name: walletName,
			mnemonic,
			password,
			createdAt: new Date().toISOString()
		}

		await saveWallet(walletData)
		setPasswordError("")
		setShowPasswordModal(false)
		setShowToast(true)
		setTimeout(() => navigate(ROUTES.ONBOARDING), 1500)
	}

	const modalWrapperStyle = {
		position: "fixed" as const,
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 10
	}

	const modalContentStyle = {
		backgroundColor: "#222",
		padding: "30px",
		borderRadius: "16px",
		textAlign: "center" as const,
		width: "300px"
	}

	const inputStyle = {
		width: "100%",
		padding: "10px",
		fontSize: "16px",
		marginBottom: "10px"
	}

	return (
		<div style={{ display: "flex", height: "100vh", background: "linear-gradient(to bottom right, #6b4c9a, #9b5de5)", color: "white", padding: "20px" }}>
			<div style={{ flex: 1, padding: "20px" }}>
				<img src={logo} alt="logo" style={{ width: "100px", marginBottom: "20px" }} />
				<p>시드 문구(seed phrase)<br />지갑을 복구하거나 다시 만들 때 필요한 단어들의 나열.<br />지갑의 비밀키를 단어로 인코딩해서 사용자가 기억하거나 적어두기 쉽게 만든 것.</p>
				<br />
				<p>니모닉(mnemonic)<br />"기억을 돕는 것"이라는 뜻.<br />블록체인에서는 기억을 돕는 복구용 단어 조합을 니모닉이라 한다.</p>
			</div>

			<div style={{ flex: 2, padding: "20px" }}>
				<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
					<h2 style={{ color: "white", fontSize: "24px" }}>비밀 문구</h2>
					<Button text="생성" onClick={handleGenerate} />
					<div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
						<Button text="복사" onClick={handleCopy} />
						{copied && (
							<span style={{ position: "absolute", top: "100%", marginTop: "6px", fontSize: "14px", color: "#ccc", backgroundColor: "#222", padding: "4px 8px", borderRadius: "4px" }}>
								클립보드에 복사되었습니다.
							</span>
						)}
					</div>
				</div>
				<p style={{ color: "red", marginTop: "10px" }}>이 시드 문구는 생성 이후 다시 볼 수 없습니다.</p>
				<div style={{ backgroundColor: "#00000033", padding: "10px", marginTop: "10px", whiteSpace: "pre-line" }}>{mnemonic || "여기에 니모닉 문구가 표시됩니다."}</div>
				<div style={{ marginTop: "20px", fontSize: "14px" }}>
					<p>⚠️ 비밀 문구(시드 문구, 니모닉)는 당신의 지갑을 복구할 수 있는 유일한 방법이며, 지갑 복구에 반드시 필요합니다.<br />분실하거나 유출될 경우 지갑과 자산을 영구히 잃게 되고, 복구가 불가능합니다.<br />반드시 안전한 곳에 보관하세요.<br />다른 사람과 절대 공유하지 마세요.</p>
				</div>
				<div style={{ marginTop: "30px" }}>
					<label>
						<span style={{ marginLeft: "10px" }}>나는 시드 문구를 안전하게 저장했습니다</span>
						<input type="checkbox" checked={hasAgreed} onChange={(e) => setHasAgreed(e.target.checked)} />
					</label>
					{hasAgreed && <Button text="다음" onClick={() => setShowNameModal(true)} style={{ marginLeft: "20px" }} />}
				</div>
			</div>

			{showNameModal && (
				<div style={modalWrapperStyle}>
					<div style={modalContentStyle}>
						<h3 style={{ fontSize: "20px", marginBottom: "20px" }}>지갑 이름 설정</h3>
						<input type="text" value={walletName} onChange={(e) => setWalletName(e.target.value)} placeholder="지갑 이름" style={inputStyle} />
						{nameError && <p style={{ color: "red", marginTop: "8px" }}>{nameError}</p>}
						<Button text="저장" onClick={handleSaveName} />
					</div>
				</div>
			)}

			{showPasswordModal && (
				<div style={modalWrapperStyle}>
					<div style={modalContentStyle}>
						<h3 style={{ fontSize: "20px", marginBottom: "20px" }}>간편인증 활성화</h3>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" style={inputStyle} />
						<input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호 확인" style={inputStyle} />
						{passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
						<div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
							<Button text="활성화" onClick={handleSavePassword} />
							<Button text="다음에" onClick={async () => {
								await saveWallet({ name: walletName, mnemonic, createdAt: new Date().toISOString() })
								setShowPasswordModal(false)
								setShowToast(true)
								setTimeout(() => navigate(ROUTES.ONBOARDING), 1500)
							}} />
						</div>
					</div>
				</div>
			)}

			{showToast && (
				<div style={{ position: "fixed", bottom: "40px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#333", color: "#fff", padding: "10px 20px", borderRadius: "6px", fontSize: "16px", zIndex: 999 }}>
					지갑 생성 완료
				</div>
			)}
		</div>
	)
}

export default CreateWallet
