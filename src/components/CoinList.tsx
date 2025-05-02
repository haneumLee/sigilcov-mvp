import { useNavigate } from "react-router-dom"
import { ROUTES } from "../routes"

interface Coin {
    id: string
    name: string
    symbol: string
    image: string
    balance: number
}

interface CoinListProps {
    coins: Coin[]
    filter: string
}

const CoinList: React.FC<CoinListProps> = ({ coins, filter }) => {
    const navigate = useNavigate()

    const filteredCoins = coins.filter((coin) => {
        if (filter === "보유") {
            return coin.balance > 0
        }
        return true
    })

    return (
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "90%", maxWidth: "500px" }}>
                {filteredCoins.length === 0 ? (
                    <p style={{ textAlign: "center" }}>표시할 코인이 없습니다.</p>
                ) : (
                    filteredCoins.map((coin) => (
                        <div
                            key={coin.id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                background: "#a57abf",
                                padding: "15px",
                                borderRadius: "8px",
                                marginBottom: "10px",
                                color: "white",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate(ROUTES.COIN_DETAIL(coin.symbol.toUpperCase()))}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <img src={coin.image} alt={coin.name} style={{ width: "30px", height: "30px" }} />
                                <strong>{coin.name}</strong> / {coin.symbol.toUpperCase()}
                            </div>
                            <div>{coin.balance.toFixed(8)}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CoinList