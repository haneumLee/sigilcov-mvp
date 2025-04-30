import * as bip39 from "bip39"

export function generateMnemonic(): string {
    const mnemonic = bip39.generateMnemonic(128) // 128비트 → 12단어
    console.log(mnemonic)
    return mnemonic
  }