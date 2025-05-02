// tokenMap.ts
import tokenListJson from './solana.tokenlist.json'

interface TokenInfo {
    address: string
    symbol: string
    name: string
    icon: string
    decimals: number
    [key: string]: any
}

interface TokenList {
    tokens: TokenInfo[]
}

const tokenList = tokenListJson as TokenList

export const TOKEN_MAP: Record<string, TokenInfo> = {}

tokenList.tokens.forEach((token) => {
    TOKEN_MAP[token.symbol.toUpperCase()] = token
})