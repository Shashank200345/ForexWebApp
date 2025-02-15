import React, { useEffect, useRef, useCallback } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';
import { useMarketStore } from '../utils/WebSocketManager';
import { debounce } from '../utils/helpers';
import { Sun, Moon } from 'lucide-react';

interface ChartProps {
  symbol: string;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const Chart = React.memo(({ symbol, theme, onThemeToggle, timeframe, onTimeframeChange }: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: theme === 'dark' ? '#13161C' : '#ffffff' },
        textColor: theme === 'dark' ? '#d1d4dc' : '#000000',
      },
      grid: {
        vertLines: { color: theme === 'dark' ? '#1e222d' : '#e1e4e8' },
        horzLines: { color: theme === 'dark' ? '#1e222d' : '#e1e4e8' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: theme === 'dark' ? '#d1d4dc30' : '#00000030',
        },
        horzLine: {
          color: theme === 'dark' ? '#d1d4dc30' : '#00000030',
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: theme === 'dark' ? '#1e222d' : '#e1e4e8',
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: theme === 'dark' ? '#26a69a' : '#22c55e',
      downColor: theme === 'dark' ? '#ef5350' : '#ef4444',
      borderVisible: false,
      wickUpColor: theme === 'dark' ? '#26a69a' : '#22c55e',
      wickDownColor: theme === 'dark' ? '#ef5350' : '#ef4444',
    });

    // Fetch initial chart data
    fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeframe}&limit=100`)
      .then(response => response.json())
      .then(data => {
        const candleData = data.map((d: any) => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));
        candlestickSeries.setData(candleData);
      })
      .catch(error => console.error('Error fetching historical data:', error));

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;

    const handleResize = debounce(() => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    }, 300);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [theme, symbol, timeframe]);

  // Debounce chart updates
  const updateChart = useCallback(
    debounce((data) => {
      if (candlestickSeriesRef.current) {
        candlestickSeriesRef.current.update(data);
      }
    }, 300),
    []
  );

  // Subscribe to price updates
  useEffect(() => {
    const unsubscribe = useMarketStore.subscribe(
      (state) => state.chartData,
      (chartData) => {
        if (chartData.length > 0 && candlestickSeriesRef.current) {
          const lastCandle = chartData[chartData.length - 1];
          candlestickSeriesRef.current.update(lastCandle);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-[500px] flex flex-col">
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">{symbol} Chart</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={onThemeToggle}
              className="p-2 rounded bg-[#13161C] border border-white/10 hover:bg-white/5 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#DFFF88]" />
              ) : (
                <Moon className="w-4 h-4 text-[#DFFF88]" />
              )}
            </button>
            <select 
              className="bg-[#13161C] border border-white/10 rounded px-3 py-1 text-sm text-white"
              value={timeframe}
              onChange={(e) => onTimeframeChange(e.target.value)}
            >
              <option value="1m">1m</option>
              <option value="5m">5m</option>
              <option value="15m">15m</option>
              <option value="1h">1h</option>
              <option value="4h">4h</option>
              <option value="1d">1d</option>
            </select>
          </div>
        </div>
      </div>
      <div ref={chartContainerRef} className="flex-1 w-full" />
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for memo
  return prevProps.symbol === nextProps.symbol &&
         prevProps.theme === nextProps.theme &&
         prevProps.timeframe === nextProps.timeframe;
});

export default Chart; 