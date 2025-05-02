import React from "react"
import { useParams, useNavigate } from "react-router-dom"

const Deposit: React.FC = () => {
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
                <h2>{symbol} 입금</h2>
            </div>
            <div style={{ margin: "20px 0", textAlign: "center" }}>
                <div style={{
                    width: "200px",
                    height: "200px",
                    background: "black",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto"
                }}>
                    QR
                </div>
            </div>
            <div style={{ marginBottom: "10px" }}>입금 네트워크: Solana</div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ wordBreak: "break-all" }}>지갑주소1234abcd5678efgh</div>
                <button style={{ marginLeft: "10px" }}>복사</button>
            </div>
        </div>
    )
}

export default Deposit