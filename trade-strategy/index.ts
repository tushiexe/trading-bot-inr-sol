import axios from "axios";
import { MarketDepthHandler } from "./DepthManager";
import { executeTrade, removeAllOrders } from "./order";

const xaiInrTradingPair = new MarketDepthHandler("B-XAI_INR");

const usdtInrTradingPair = new MarketDepthHandler("B-USDT_INR");

const xaiUsdtTradingPair = new MarketDepthHandler("B-XAI_USDT");

setInterval(() => {
    console.log(xaiInrTradingPair.getRelevantDepth())
    console.log(usdtInrTradingPair.getRelevantDepth())
    console.log(xaiUsdtTradingPair.getRelevantDepth())
    // there are two sides you can sit on
    // sell SOL for INR, buy USDT from INR, buy SOL from INR
    // lets say u start with 1 SOL
    const inrAmount = xaiInrTradingPair.getRelevantDepth().lowestAsk - 0.001;
    const usdtAmount = inrAmount / usdtInrTradingPair.getRelevantDepth().lowestAsk;
    const finalXaiAmount = usdtAmount / xaiUsdtTradingPair.getRelevantDepth().lowestAsk;
    
    console.log(`You can convert ${1} SOL into ${finalXaiAmount} SOL`)

    // Buy SOL from INR, sell SOL for USDT, sell USDT for INR.
    const startingInr = xaiInrTradingPair.getRelevantDepth().highestBid + 0.001;
    const usdtReceived = xaiUsdtTradingPair.getRelevantDepth().highestBid;
    const finalInrAmount = usdtReceived * usdtInrTradingPair.getRelevantDepth().highestBid;

    console.log(`You can convert ${startingInr} INR into ${finalInrAmount} INR`)
}, 2000)

async function executeTradingStrategy() {
    const currentHighestBid = xaiInrTradingPair.getRelevantDepth().highestBid;
    console.log(`placing order for ${parseFloat(currentHighestBid) + 0.01}`);
    await executeTrade("buy", "XAIINR", (parseFloat(currentHighestBid) + 0.01).toFixed(3), 10, Math.random().toString())
    await new Promise((r) => setTimeout(r, 10000));
    await removeAllOrders("XAIINR");
    await new Promise((r) => setTimeout(r, 1000));
    executeTradingStrategy();
}

setTimeout(async () => {
    executeTradingStrategy();
}, 2000)
