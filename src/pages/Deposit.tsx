import React from "react"
import { useParams } from "react-router-dom"

const Deposit: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>()

    return (
        <div style={{ padding: "20px", color: "white" }}>
            <h1>{symbol} 입금 페이지</h1>
            <p>여기에 {symbol} 입금 UI가 들어갈 예정입니다.</p>
        </div>
    )
}

export default Deposit