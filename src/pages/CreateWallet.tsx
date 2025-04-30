import React, { useState } from "react"
import { generateMnemonic } from "../utils/mnemonic"
import logo from "../assets/sigilcov-icon.png"
import Button from "../components/Button"
import { isWalletNameDuplicate, saveWallet } from "../utils/indexedDB"

const CreateWallet: React.FC = () => {
    const [mnemonic, setMnemonic] = useState<string>("")
    const [showNameModal, setShowNameModal] = useState(false)
    const [hasAgreed, setHasAgreed] = useState(false)
    const [copied, setCopied] = useState(false)
    const [walletName, setWalletName] = useState("")
    const [nameError, setNameError] = useState("")

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
        
        const walletData = {
            name: walletName,
            mnemonic,
            createdAt: new Date().toISOString()
        }
        
        await saveWallet(walletData)
        console.log("지갑 저장 완료:", walletData)

        setNameError("")
        // TODO: 이름 저장하고 다음 단계(비밀번호 설정 등)로 이동
        setShowNameModal(false)
        console.log("지갑 이름 저장됨:", walletName)
    }

    return (
        <div
        style={{
            display: "flex",
            height: "100vh",
            background: "linear-gradient(to bottom right, #6b4c9a, #9b5de5)",
            color: "white",
            padding: "20px"
        }}
        >
        {/* 좌측 설명 영역 */}
        <div style={{ flex: 1, padding: "20px" }}>
            <img
            src={logo}
            alt="logo"
            style={{ width: "100px", marginBottom: "20px" }}
            />
            <p>
            시드 문구(seed phrase)
            <br />
            지갑을 복구하거나 다시 만들 때 필요한 단어들의 나열. <br />
            지갑의 비밀키를 단어로 인코딩해서 사용자가 기억하거나 적어두기 쉽게 만든 것.
            </p>
            <br />
            <p>
            니모닉(mnemonic)
            <br />
            "기억을 돕는 것"이라는 뜻. <br />
            블록체인에서는 기억을 돕는 복구용 단어 조합을 니모닉이라 한다.
            </p>
        </div>

        {/* 우측 시드 문구 및 경고 영역 */}
        <div style={{ flex: 2, padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2 style={{ color: "white", fontSize: "24px" }}>비밀 문구</h2>
                <Button text="생성" onClick={handleGenerate} />
                {/* 복사 버튼과 복사 메시지를 묶음 */}
                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Button text="복사" onClick={handleCopy} />
                {copied && (
                    <span style={{
                    position: "absolute",
                    top: "100%",
                    marginTop: "6px",
                    fontSize: "14px",
                    color: "#ccc",
                    backgroundColor: "#222",
                    padding: "4px 8px",
                    borderRadius: "4px"
                    }}>
                    클립보드에 복사되었습니다.
                    </span>
                )}
                </div>
            </div>

            <p style={{ color: "red", marginTop: "10px" }}>
                이 시드 문구는 생성 이후 다시 볼 수 없습니다.
            </p>

            <div
            style={{
                backgroundColor: "#00000033",
                padding: "10px",
                marginTop: "10px",
                whiteSpace: "pre-line"
            }}
            >
            {mnemonic || "여기에 니모닉 문구가 표시됩니다."}
            </div>

            <div style={{ marginTop: "20px", fontSize: "14px" }}>
            <p>
                ⚠️ 비밀 문구(시드 문구, 니모닉)는 당신의 지갑을 복구할 수 있는 유일한 방법이며,
                지갑 복구에 반드시 필요합니다. <br />
                분실하거나 유출될 경우 지갑과 자산을 영구히 잃게 되고, 복구가 불가능합니다. <br />
                반드시 안전한 곳에 보관하세요. <br />
                다른 사람과 절대 공유하지 마세요.
            </p>
            </div>

            <div style={{ marginTop: "30px" }}>
            <label>
                <span style={{ marginLeft: "10px" }}>
                    나는 시드 문구를 안전하게 저장했습니다
                </span>
                <input
                type="checkbox"
                checked={hasAgreed}
                onChange={(e) => setHasAgreed(e.target.checked)}
                />
            </label>

            {hasAgreed && (
                <Button
                text="다음"
                onClick={() => setShowNameModal(true)}
                style={{ marginLeft: "20px" }}
                />
            )}
            </div>
        </div>

        {/* 지갑 이름 설정 모달은 이후에 구현 */}
        {showNameModal && (
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
            }}>
                <div style={{
                    backgroundColor: "#222",
                    padding: "30px",
                    borderRadius: "10px",
                    width: "300px",
                    color: "white"
                }}>
                    <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>지갑 이름 설정</h3>
                    <input
                        type="text"
                        placeholder="지갑 이름"
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)}
                        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                    />
                    {nameError && (
                        <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>{nameError}</p>
                    )}
                    <Button text="저장" onClick={handleSaveName} style={{ marginTop: "20px" }} />
                </div>
            </div>
        )}

    </div>
  )
}

export default CreateWallet
