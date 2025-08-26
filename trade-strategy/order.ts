const request = require('request')
const crypto = require('crypto')
const apiEndpoint = "https://api.coindcx.com"
import { key, secret } from "./config";

export const executeTrade = (tradeDirection: "buy" | "sell", tradingMarket: string, unitPrice: number, totalAmount: number, uniqueOrderId: string) => {
    return new Promise<void>((resolve) => {
        const orderPayload = {
            side: tradeDirection,
            "order_type": "limit_order", 
            market: tradingMarket,
            "price_per_unit": unitPrice,
            "total_quantity": totalAmount,
            "timestamp": Math.floor(Date.now()),
            "client_order_id": uniqueOrderId
        }
    
        const encodedPayload = new Buffer(JSON.stringify(orderPayload)).toString();
        const authSignature = crypto.createHmac('sha256', secret).update(encodedPayload).digest('hex')
    
        const requestOptions = {
            url: apiEndpoint + "/exchange/v1/orders/create",
            headers: {
                'X-AUTH-APIKEY': key,
                'X-AUTH-SIGNATURE': authSignature
            },
            json: true,
            body: orderPayload
        }
    
        request.post(requestOptions, function(error, response, body) {
            if (error) {
                console.log("error while cancelling orders");
            } else {
                console.log(body);
            }
            resolve();
        })
    
    })
    
}

export const cancelSingleOrder = () => {

}

export const removeAllOrders = (tradingMarket: string) => {
    return new Promise<void>((resolve) => {
        const cancelPayload = {
            market: tradingMarket,
            timestamp: Math.floor(Date.now())
        }
    
        const encodedPayload = new Buffer(JSON.stringify(cancelPayload)).toString();
        const authSignature = crypto.createHmac('sha256', secret).update(encodedPayload).digest('hex')
    
        const requestOptions = {
            url: apiEndpoint + "/exchange/v1/orders/cancel_all",
            headers: {
                'X-AUTH-APIKEY': key,
                'X-AUTH-SIGNATURE': authSignature
            },
            json: true,
            body: cancelPayload
        }
    
        request.post(requestOptions, function(error, response, body) {
            if (error) {
                console.log("error while cancelling orders");
            } else {
                console.log("cancelled all orders");
                console.log(body);
            }
            resolve();
        })
    })
   
}