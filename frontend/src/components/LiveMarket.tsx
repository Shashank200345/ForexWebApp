import React, { useState, useEffect, Suspense } from 'react';
import { useMarketStore } from '../utils/WebSocketManager';
import { Ticker } from './Ticker';
import TypewriterText from './TypewriterText';
const Chart = React.lazy(() => import('./Chart'));

const LiveMarket = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [timeframe, setTimeframe] = useState('1h');
  const [isLoading, setIsLoading] = useState(true);
  const { status, setStatus, setConnectionState } = useMarketStore();

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Separate WebSocket connection logic
  const setupWebSocket = (symbol: string, interval: string) => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws');
    
    ws.onopen = () => {
      console.log('WebSocket Connected');
      setStatus('connected');
      setConnectionState('connected');
      ws.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: [
          '!miniTicker@arr@1000ms',
          `${symbol.toLowerCase()}@kline_${interval}`
        ],
        id: 1
      }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (Array.isArray(message)) {
          message.forEach((ticker: any) => {
            if (ticker.s && ticker.s.endsWith('USDT')) {
              useMarketStore.getState().updatePrices(ticker.s, {
                price: parseFloat(ticker.c),
                change24h: ((parseFloat(ticker.c) - parseFloat(ticker.o)) / parseFloat(ticker.o)) * 100,
                volume: parseFloat(ticker.v),
                lastUpdate: Date.now(),
                isChartData: false
              });
            }
          });
        } else if (message.k) {
          useMarketStore.getState().updateChartData({
            time: message.k.t / 1000,
            open: parseFloat(message.k.o),
            high: parseFloat(message.k.h),
            low: parseFloat(message.k.l),
            close: parseFloat(message.k.c),
          });
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus('disconnected');
      setConnectionState('disconnected');
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      setStatus('disconnected');
      setConnectionState('disconnected');
    };

    return ws;
  };

  // Update the main effect to handle symbol changes
  useEffect(() => {
    let ws: WebSocket;

    const initializeData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        const data = await response.json();
        
        const filteredData = data.filter((ticker: any) => ticker.symbol.endsWith('USDT'));
        filteredData.forEach((ticker: any) => {
          useMarketStore.getState().updatePrices(ticker.symbol, {
            price: parseFloat(ticker.lastPrice),
            change24h: parseFloat(ticker.priceChangePercent),
            volume: parseFloat(ticker.volume),
            lastUpdate: Date.now(),
            isChartData: false
          });
        });

        ws = setupWebSocket(selectedSymbol, timeframe);
        setIsLoading(false);
        setStatus('connected');
        setConnectionState('connected');

      } catch (error) {
        console.error('Error initializing data:', error);
        setIsLoading(false);
      }
    };

    initializeData();

    return () => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [selectedSymbol, timeframe]);

  // Regular UI updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      useMarketStore.getState().flushBuffer();
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[95%] lg:max-w-[95%]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">
          <TypewriterText 
            text="Live Market Data" 
            speed={150}
            delayBeforeRestart={3000}
            className="text-[#DFFF88]"
          />
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <span className="flex items-center">
            <span className={`w-2 h-2 rounded-full mr-2 ${status === 'connected' ? 'bg-[#DFFF88] animate-pulse' : 'bg-red-500'}`}></span>
            <span className="text-sm text-[#DFFF88]/80">{status === 'connected' ? 'Live' : 'Connecting...'}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto">
        <div className="bg-[#4D4D4D]/20 backdrop-blur-xl rounded-lg border border-white/10 h-[500px] flex flex-col">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-[#8A95A3] text-sm">
            <div className="col-span-2">Asset</div>
            <div className="text-right px-2 col-span-2">Price</div>
            <div className="text-right px-2 col-span-2">24h Change</div>
            <div className="text-right px-2 col-span-2">Volume</div>
            <div className="text-right px-2 col-span-2">Signal</div>
            <div className="text-right px-2 col-span-2">Actions</div>
          </div>
          <div className="flex-1">
            <Ticker onSymbolSelect={setSelectedSymbol} />
          </div>
        </div>

        <Suspense fallback={
          <div className="bg-[#4D4D4D]/20 backdrop-blur-xl rounded-lg border border-white/10 h-[500px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DFFF88]"></div>
          </div>
        }>
          <div className="bg-[#4D4D4D]/20 backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden h-[500px]">
            <Chart 
              symbol={selectedSymbol} 
              theme={theme}
              onThemeToggle={toggleTheme}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default LiveMarket; 