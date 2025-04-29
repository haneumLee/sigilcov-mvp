import React, { useState } from "react"
import logo from "../assets/sigilcov-icon.png"
import Button from "../components/Button"

const CreateWallet: React.FC = () => {
  const [mnemonic, setMnemonic] = useState("")
  const [showNameModal, setShowNameModal] = useState(false)
  const [hasAgreed, setHasAgreed] = useState(false)

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
          <Button text="생성" onClick={() => setMnemonic("예시 니모닉 문구")}/>
          <Button text="복사" onClick={() => navigator.clipboard.writeText(mnemonic)} />
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
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={(e) => setHasAgreed(e.target.checked)}
            />
            <span style={{ marginLeft: "10px" }}>
              나는 시드 문구를 안전하게 저장했습니다
            </span>
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
    </div>
  )
}

export default CreateWallet
