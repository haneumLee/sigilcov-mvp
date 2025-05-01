import React, { useState, useEffect } from "react"
import logo from "../assets/sigilcov-icon.png"
import CoinList from "../components/CoinList"
import Button from "../components/Button"
import { getWalletById } from "../utils/indexedDB"

const Home: React.FC = () => {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("전체")
    const [walletName, setWalletName] = useState("지갑 이름")

	useEffect(() => {
		const walletId = localStorage.getItem("selectedWalletId")
		console.log("walletId:", walletId)
		if (walletId) {
			getWalletById(Number(walletId))
				.then(wallet => {
					if (wallet) {
						console.log("지갑 정보:", wallet)
						setWalletName(wallet.name)
					} else {
						console.log("지갑을 찾을 수 없음")
						setWalletName("지갑 이름")
					}
				})
				.catch((err) => {
					console.error("지갑 로딩 오류:", err)
					setWalletName("지갑 이름")
				})
		}
	}, [])

    return (
        <div style={{
            background: "linear-gradient(to bottom right, #6b4c9a, #9b5de5)",
            minHeight: "100vh",
            padding: "20px",
            color: "white"
        }}>
            {/* 상단 */}
            <div style={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "10px"
            }}>
                <img src={logo} alt="logo" style={{ width: "75px", height: "75px" }} />
                <h1 style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    margin: 0
                }}>코인 목록</h1>
                <button style={{
                    marginLeft: "auto",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#ddd",
                    color: "black",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}>{walletName}</button>
            </div>

            {/* 검색 & 필터 */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <input
                    type="text"
                    placeholder="코인명 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "30%",
                        minWidth: "300px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        marginRight: "10px"
                    }}
                />
                <div>
                    <div style={{ padding: "10px", background: "white", color: "black" }}>
                        {filter}
                    </div>
                </div>
            </div>

            {/* 코인 리스트 */}
            <div>
                <CoinList search={search} filter={filter} />
            </div>
        </div>
    )
}

export default Home
