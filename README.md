<div align="center">

# 🚀 DYORSWAP Copy-Trading & Pool Scanner Bot

dyorswap / dyorswap plasma / dyorswap plasma bot / dyorswap plasma copy trade bot / dyorswap plasma trade bot / dyorswap trade bot / dyorswap bot  

_Automated trading assistant for **DYORSWAP** — powered by **FactoryDAO**_

![PlasmaMainnet](https://img.shields.io/badge/PlasmaMainnet-DYORSWAP-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-Node.js-blue?logo=typescript)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

</div>

---

## ✨ Features

- 🔄 **Copy-Trading**  
  Mirror trades of chosen leader wallets in real time.  
  Supports **Plasma Router v2** and **DYORSWAP SDK** swaps.  

- 📊 **Pool Scanner**  
  Fetches all active **DYORSWAP pools** and computes potential APR based on liquidity, volume and fee structure.  

- ⚙️ **Customizable Execution**  
  - Adjustable **slippage**  
  - **DEX whitelist** (e.g. only route through DYORSWAP)  
  - Maximum per-trade allocation  

- 💾 **Local Trade Log**  
  SQLite database of mirrored trades with full history.  

---

## 📂 Project Structure

```
dyorswap-copybot/
├── src/
│   ├── analytics/       # Pool scanner & APR estimator
│   ├── copytrading/     # Leader watcher & tx parser
│   ├── dex/             # Plasma Router & DYORSWAP SDK wrappers
│   ├── execution/       # Transaction signing/sending
│   ├── storage/         # SQLite trade log
│   ├── utils/           # Wallet helpers
│   ├── config.ts        # Config loader (.env)
│   └── index.ts         # Bot entrypoint
├── .env.example         # Environment variables template
├── package.json
└── README.md
```

---

## ⚡ Quick Start

[![Get Started](https://img.shields.io/badge/Get%20Started-Now-blue?style=for-the-badge)](../../releases)

---

## 🔧 Configuration (`.env`)

| Variable             | Description |
|----------------------|-------------|
| `RPC_URL`            | PlasmaMainnet RPC endpoint (private RPC recommended) |
| `WALLET_SECRET_KEY`  | Base58 or JSON array secret key (⚠️ use test wallet for dev) |
| `LEADER_ADDRESSES`   | Comma-separated list of wallets to mirror |
| `MAX_TRADE_QUOTE`    | Max input amount per trade (native units) |
| `SLIPPAGE_BPS`       | Allowed slippage (100 = 1%) |
| `DEX_WHITELIST`      | Restrict to certain DEX labels (e.g. `DYORSWAP`) |
| `PLASMA_API_KEY`     | (Optional) Plasma Router API key |
| `QUOTE_API_BASE`     | Plasma Router quote endpoint |

---

## 📡 How It Works

1. **Watcher**  
   Polls leader wallets via `getSignaturesForAddress` → parses transactions → detects swaps through  
   - DYORSWAP SDK (`DYOR…`)  

2. **Execution**  
   Uses Plasma Router v2 API to request a swap route with the same in/out tokens.  
   Builds a signed transaction with your wallet and submits it.  

3. **Pool Scanner**  
   Calls [`dyorswap-api.plasma/dex/pair/all`] → lists pools → computes **fee APR** proxy:  
   ```
   feeAPR ≈ (24h Volume × Avg Fee) / Liquidity × 365
   ```

---

## 📊 Example Output

```
[mirror] Leader: 9xyz…abc | TX: 4M…kA
  Swap: PLA -> USDC | Amount: ~1 PLA
  Routed via: Plasma Router v2 (DEX: DYORSWAP)
  Executed ✅ | Sig: 5F...Lm
```

---

## 🌟 Key Features DYORSWAP Bot

### 🎨 User Dashboard
- Real-time **task editing**
- Grouped **RPC & Proxy** settings
- One-click **Quicktask launch**
- Integrated **Sell buttons**
- Smart **Task group handling**
- Built-in **TPS performance monitor**

---

### 🤝 Copy-Trading Engine
#### 🔍 Wallet Scanner / Analyzer
- Detect and parse **migrated contracts**
- Manage **unlimited wallet lists** across multiple sources
- Powerful **filters & conditional logic**
- Export detailed reports to **Excel / CSV**

#### 📊 Wallet Activity Tracker
- Mirror **all trading actions** from selected wallets
- Get **deep insights** with a streamlined interface

---

### 🎯 Plasma Snipers
- **DYORSWAP sniper** with 20+ dynamic filters
- **DYORSWAP auto-migration** sniper & dumper
- **DYORSWAP Pools sniper**
- **DYORSWAP sniper**
- Integrated **Discord / Telegram / Twitter scrapers**
- **Anti-MEV & Bloxroute** integration
- **AFK sniper** with continuous in-house monitoring

---

### 📈 Volume Automation
- Generate **natural-looking trading volume**
- Flexible **PLA buy range settings** + randomized delays
- Support for **unlimited wallets**

---

### 🛠 Token Bundler
- Deploy bundles on **DYORSWAP**
- Define **wallet count & PLA allocations**
- Adjustable **distribution ratios**
- **Anti-sniper protection** prebuilt

---

### ⚡ Essential Tools
- Fast Wallet Generator
- Multi-wallet Balance Checker
- **PLA Wrapper / Unwrapper**

---

## 🔐 Security & Compliance
- Full control over **caps, retries, slippage**
- Designed for **hot wallets only** — keep cold storage secure
- Always respect **laws & platform rules**

---

## 🎁 Free Trial
Enjoy a **1-hour free trial** — explore all features risk-free!  

[![🚀 Start Now](https://img.shields.io/badge/🚀%20Start%20Now-Free-green?style=for-the-badge)](../../releases) 

---

## 🔗 Contacts  
**Address:** 129 Bishopsgate, London EC2M 3XD  
**Phone:** +44 20 3872 6611  
**Email:** support@dyorswap.io  
**Open hours:** Mon–Fri 08:00–20:00, Sat–Sun 09:00–18:00  

---

## 📜 License

(LICENSE) © 2025 — Feel free to fork, hack, and extend.

---

## 🔍 SEO Keywords

dyorswap plasma, dyorswap bot, dyorswap copy trading bot, dyorswap pool scanner, dyorswap trading automation, plasma mainnet bot, plasma mainnet copy trading, plasma router v2 bot, dyorswap sniper, dyorswap sdk, plasma mainnet pool scanner, dyorswap trading volume bot, dyorswap bundler, plasma mainnet dex bot, dyorswap trading assistant, plasma defi bot
