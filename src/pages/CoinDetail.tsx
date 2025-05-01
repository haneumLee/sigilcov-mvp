import React from "react"
import { ROUTES } from "../routes";
import { useNavigate, useParams } from "react-router-dom"
import logo from "../assets/sigilcov-icon.png"

const CoinDetail: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>()
    const navigate = useNavigate()

    return (
        <div style={{
            background: "linear-gradient(to bottom right, #6b4c9a, #9b5de5)",
            minHeight: "100vh",
            color: "white",
            padding: "20px"
        }}>
            {/* 헤더 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <img src={logo} alt="logo" style={{ width: "60px", height: "60px" }} />
                <h2 style={{ margin: 0 }}>{symbol} 상세보기</h2>
                <button onClick={() => navigate(-1)} style={{ padding: "10px", background: "transparent", color: "white", border: "1px solid white", borderRadius: "5px" }}>뒤로</button>
            </div>

            {/* 잔고 영역 */}
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h3>총 보유</h3>
                <p style={{ fontSize: "24px" }}>0 {symbol}</p>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                    <div>
                        <p>거래대기</p>
                        <p>0 {symbol}</p>
                    </div>
                    <div>
                        <p>출금가능</p>
                        <p>0 {symbol}</p>
                    </div>
                </div>
            </div>

            {/* 입금/출금 버튼 */}
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "30px" }}>
                <button onClick={() => navigate(ROUTES.DEPOSIT(symbol!))} style={{ padding: "10px 30px", borderRadius: "5px", border: "none", cursor: "pointer" }}>입금</button>
                <button style={{ padding: "10px 30px", borderRadius: "5px", border: "none", cursor: "pointer" }}>출금</button>
            </div>

            {/* 거래내역 필터 + 더미 리스트 */}
            <div style={{ textAlign: "center" }}>
                <select style={{ padding: "10px", marginBottom: "20px" }}>
                    <option>전체</option>
                    <option>입금</option>
                    <option>출금</option>
                </select>

                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", background: "#a57abf", padding: "15px", borderRadius: "8px", marginBottom: "10px" }}>
                        <span>2025-04-15 입금 완료</span>
                        <span>0.00000000</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", background: "#a57abf", padding: "15px", borderRadius: "8px", marginBottom: "10px" }}>
                        <span>2025-04-14 출금 완료</span>
                        <span>0.00000000</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinDetail

