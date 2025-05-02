// Withdraw.tsx
import React from "react"
import { useParams, useNavigate } from "react-router-dom"

const Withdraw: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>()
    const navigate = useNavigate()

    return (
        <div style={{
            minHeight: "100vh",
            padding: "20px",
            color: "white",
            background: "linear-gradient(to bottom right, #6b4c9a, #9b5de5)",
            position: "relative"
        }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    padding: "10px 20px",
                    border: "2px solid white",
                    borderRadius: "8px",
                    background: "transparent",
                    color: "white",
                    cursor: "pointer"
                }}
            >
                뒤로
            </button>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ width: "60px", height: "60px", background: "gray", borderRadius: "30px", marginRight: "10px" }} />
                <h2>{symbol} 출금</h2>
            </div>

            <div style={{ maxWidth: "400px", margin: "0 auto" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label>출금 가능:</label>
                    <input type="text" style={{ width: "100%", padding: "8px", marginTop: "5px" }} disabled value="0.00000000" />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>출금 네트워크:</label>
                    <input type="text" style={{ width: "100%", padding: "8px", marginTop: "5px" }} disabled value="Solana" />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>출금 수량:</label>
                    <input type="text" style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>수수료:</label>
                    <input type="text" style={{ width: "100%", padding: "8px", marginTop: "5px" }} disabled value="0.00000000" />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>받는 주소:</label>
                    <input type="text" style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
                </div>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button style={{
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "8px",
                        background: "white",
                        color: "#6b4c9a",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}>
                        출금
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Withdraw