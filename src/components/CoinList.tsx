import React from "react"

interface Coin {
	id: number
	name: string
	symbol: string
	balance: number
}

interface CoinListProps {
	search: string
	filter: string
}

const dummyCoins: Coin[] = [
	{ id: 1, name: "솔라나", symbol: "SOL", balance: 1.2345 },
	{ id: 2, name: "이더리움", symbol: "ETH", balance: 0 },
	{ id: 3, name: "비트코인", symbol: "BTC", balance: 0.56 },
	{ id: 4, name: "도지코인", symbol: "DOGE", balance: 0 },
]

const CoinList: React.FC<CoinListProps> = ({ search, filter }) => {
	const filteredCoins = dummyCoins.filter((coin) => {
		const matchSearch = coin.name.includes(search) || coin.symbol.includes(search)
		let matchFilter = true

		if (filter === "보유") {
			matchFilter = coin.balance > 0
		} else if (filter === "관심") {
			// 관심 로직은 추후 구현 예정
			matchFilter = false
		}

		return matchSearch && matchFilter
	})

	return (
		<div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "50%", maxWidth: "500px" }}>
                {filteredCoins.length === 0 ? (
                    <p>표시할 코인이 없습니다.</p>
                ) : (
                    filteredCoins.map((coin) => (
                        <div key={coin.id} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "#a57abf",
                            padding: "15px",
                            borderRadius: "8px",
                            marginBottom: "10px",
                            color: "white",
                            cursor: "pointer"
                        }}>
                            <div>
                                <strong>{coin.name}</strong> / {coin.symbol}
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