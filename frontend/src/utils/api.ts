const BASE_URL = 'https://api.binance.com/api/v3';
const WS_URL = 'wss://stream.binance.com:9443/ws';

export const binanceApi = {
  async getKlines(symbol: string, interval: string, limit = 100) {
    const response = await fetch(
      `${BASE_URL}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    return response.json();
  },

  async get24hrTicker() {
    const response = await fetch(`${BASE_URL}/ticker/24hr`);
    return response.json();
  },

  createWebSocket(symbol: string, interval: string) {
    const ws = new WebSocket(WS_URL);
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: [
          `${symbol.toLowerCase()}@kline_${interval}`,
          `${symbol.toLowerCase()}@trade`
        ],
        id: Date.now()
      }));
    };

    return ws;
  }
}; 