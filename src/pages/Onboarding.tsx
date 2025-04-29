import Button from "../components/Button"
import logo from "../assets/sigilcov-icon.png"
import React from "react"
import { getWallets } from "../utils/indexedDB"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../routes"



const Onboarding: React.FC = () => {
    const navigate = useNavigate()

    const handleLogin = async () => {
        try{
            const wallets = await getWallets()
            if (wallets.length > 0) { // 지갑 있을 때
                console.log("지갑 목록:", wallets)
                alert("지갑이 있습니다. 지갑 목록을 보여줍니다.")
            // TODO: 지갑 목록 팝업 구현
            } else { // 지갑 없을 때
                alert("등록된 지갑이 없습니다. 지갑을 생성해주세요.")
            }
        } catch (error) { // 기타 오류
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
        <Button text="로그인" onClick={(handleLogin)} />
        <Button text="지갑 생성" onClick={() => navigate(ROUTES.CREATE_WALLET)} />
        <Button text="지갑 추가" onClick={() => console.log("지갑 추가")} />
        </div>
    )
}

export default Onboarding
