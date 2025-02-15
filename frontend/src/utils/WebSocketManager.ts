import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface MarketState {
  prices: Map<string, {
    price: number;
    change24h: number;
    volume: number;
    lastUpdate: number;
  }>;
  chartData: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
  buffer: {
    prices: Map<string, any>;
    chartData: any[];
  };
  status: 'connected' | 'disconnecting' | 'disconnected';
  setStatus: (status: 'connected' | 'disconnecting' | 'disconnected') => void;
  updatePrices: (symbol: string, data: any) => void;
  updateChartData: (data: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }) => void;
  flushBuffer: () => void;
  connectionState: 'connecting' | 'connected' | 'disconnected';
  setConnectionState: (state: 'connecting' | 'connected' | 'disconnected') => void;
}

export const useMarketStore = create<MarketState>()(
  subscribeWithSelector((set, get) => ({
    prices: new Map(),
    chartData: [],
    buffer: {
      prices: new Map(),
      chartData: [],
    },
    status: 'disconnected',
    setStatus: (status) => set({ status }),
    
    connectionState: 'disconnected',
    setConnectionState: (state) => set({ connectionState: state }),
    
    updatePrices: (symbol: string, data: any) => {
      set((state) => ({
        prices: new Map(state.prices).set(symbol, {
          price: data.price,
          change24h: data.change24h,
          volume: data.volume,
          lastUpdate: data.lastUpdate || Date.now(),
        })
      }));
      
      // Buffer chart data for performance
      if (data.isChartData && data.candleData) {
        const state = get();
        state.buffer.chartData.push(data.candleData);
      }
    },
    
    updateChartData: (data) => {
      set((state) => ({
        chartData: [...state.chartData, data].slice(-100)
      }));
    },
    
    flushBuffer: () => set((state) => {
      const newChartData = [...state.chartData, ...state.buffer.chartData].slice(-100);
      state.buffer.chartData = [];
      
      return {
        chartData: newChartData,
      };
    }),
  }))
); 