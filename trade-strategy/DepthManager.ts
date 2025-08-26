import axios from "axios";

export class MarketDepthHandler {
    private tradingPair: string;
    private buyOrders: {
        [key: string]: string
    };
    private sellOrders: {
        [key: string]: string
    };
    constructor(tradingPair: string) {
        this.tradingPair = tradingPair;
        this.buyOrders = {};
        this.sellOrders = {};
        setInterval(() => {
            this.fetchMarketData();
        }, 3000)
    }

    async fetchMarketData() {
        const response = await axios.get(`https://public.coindcx.com/market_data/orderbook?pair=${this.tradingPair}`)
        const orderBookData = response.data;
        this.buyOrders = orderBookData.bids;
        this.sellOrders = orderBookData.asks;
    }

    getRelevantDepth() {
        let maxBidPrice = -100;
        let minAskPrice = 10000000;

        Object.keys(this.buyOrders).map(priceLevel => {
            if (parseFloat(priceLevel) > maxBidPrice) {
                maxBidPrice = parseFloat(priceLevel)
            }
        })

        Object.keys(this.sellOrders).map(priceLevel => {
            if (parseFloat(priceLevel) < minAskPrice) {
                minAskPrice = parseFloat(priceLevel)
            }
        })
        return {
            highestBid: maxBidPrice,
            lowestAsk: minAskPrice
        }
    }
}