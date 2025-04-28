import Button from "../components/Button"
import logo from "../assets/sigilcov-icon.png"
import React from "react"


const Onboarding: React.FC = () => {
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
      <Button text="로그인" onClick={() => console.log("로그인")} />
      <Button text="지갑 생성" onClick={() => console.log("지갑 생성")} />
      <Button text="지갑 추가" onClick={() => console.log("지갑 추가")} />
    </div>
  )
}

export default Onboarding
