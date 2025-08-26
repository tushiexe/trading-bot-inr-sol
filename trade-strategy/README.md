# Crypto Trading Bot

A cryptocurrency trading bot that implements arbitrage strategies across crypto trading pairs.

## Features

- Real-time market depth monitoring
- Automated order execution
- Multi-pair arbitrage detection
- Configurable trading parameters

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your API credentials in `config.ts`:
```typescript
export const key = "your_actual_api_key";
export const secret = "your_actual_api_secret";
```

3. Run the bot:
```bash
npm start
```

## Trading Strategy

The bot monitors three trading pairs:
- XAI/INR
- USDT/INR  
- XAI/USDT

It looks for arbitrage opportunities by:
1. Converting XAI to INR, then INR to USDT, then USDT back to XAI
2. Converting INR to XAI, then XAI to USDT, then USDT back to INR

## Files

- `index.ts` - Main trading logic and strategy execution
- `DepthManager.ts` - Market depth data management
- `order.ts` - Order execution and cancellation functions
- `config.ts` - API configuration
