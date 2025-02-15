import React, { memo, useState, useEffect, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useMarketStore } from '../utils/WebSocketManager';
import { formatPrice, formatChange, formatVolume } from '../utils/formatters';
import { debounce } from '../utils/helpers';

interface TickerRowProps {
  index: number;
  style: React.CSSProperties;
  data: {
    symbols: string[];
    prices: Map<string, any>;
    onSymbolSelect: (symbol: string) => void;
  };
}

const TickerRow = memo(({ index, style, data }: TickerRowProps) => {
  const symbol = data.symbols[index];
  const price = data.prices.get(symbol);
  const [prevPrice, setPrevPrice] = useState(price?.price);

  // Flash effect on price change
  useEffect(() => {
    if (price?.price !== prevPrice) {
      setPrevPrice(price?.price);
    }
  }, [price?.price]);

  if (!price) return null;

  const priceChangeClass = price.price > prevPrice ? 'text-green-500' : 
                          price.price < prevPrice ? 'text-red-500' : '';

  // Create TradingView URL for the symbol
  const tradingViewUrl = `https://www.tradingview.com/chart/?symbol=BINANCE:${symbol}`;

  return (
    <div 
      style={style}
      className="grid grid-cols-12 gap-4 px-6 py-3 hover:bg-white/5 border-b border-white/5 transition-colors group"
    >
      {/* Symbol and Icon */}
      <div className="flex items-center col-span-2">
        <img 
          src={`https://assets.coincap.io/assets/icons/${symbol.replace('USDT', '').toLowerCase()}@2x.png`}
          alt={symbol}
          className="w-6 h-6 mr-2"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://assets.coincap.io/assets/icons/generic@2x.png';
          }}
        />
        <span className="text-white">{symbol.replace('USDT', '')}</span>
      </div>

      {/* Price */}
      <div className={`text-right px-2 col-span-2 ${priceChangeClass} transition-colors duration-300`}>
        ${formatPrice(price.price)}
      </div>

      {/* 24h Change */}
      <div className={`text-right px-2 col-span-2 ${price.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {price.change24h > 0 ? '+' : ''}{formatChange(price.change24h)}%
      </div>

      {/* Volume */}
      <div className="text-right px-2 col-span-2 text-[#8A95A3]">
        {formatVolume(price.volume)}
      </div>

      {/* Signal */}
      <div className="text-right px-2 col-span-2">
        <span className={`inline-flex items-center px-2 py-1 rounded text-xs
          ${price.change24h >= 2 ? 'bg-green-500/20 text-green-500' :
            price.change24h <= -2 ? 'bg-red-500/20 text-red-500' :
            'bg-white/20 text-white'}`}
        >
          {price.change24h >= 2 ? 'BUY' :
            price.change24h <= -2 ? 'SELL' : 'HOLD'}
        </span>
      </div>

      {/* Actions */}
      <div className="text-right opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end space-x-2 px-2 col-span-2">
        <button 
          onClick={() => data.onSymbolSelect(symbol)}
          className="px-1.5 py-0.5 text-[11px] rounded bg-[#DFFF88]/10 text-[#DFFF88] hover:bg-[#DFFF88]/20 transition-colors min-w-[48px] ml-4"
        >
          Chart
        </button>
        <a 
          href={tradingViewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-1.5 py-0.5 text-[11px] rounded bg-[#DFFF88]/10 text-[#DFFF88] hover:bg-[#DFFF88]/20 transition-colors min-w-[48px]"
        >
          Analysis
        </a>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  const prevPrice = prevProps.data.prices.get(prevProps.data.symbols[prevProps.index])?.price;
  const nextPrice = nextProps.data.prices.get(nextProps.data.symbols[nextProps.index])?.price;
  return prevPrice === nextPrice;
});

interface TickerProps {
  onSymbolSelect: (symbol: string) => void;
}

export const Ticker = memo(({ onSymbolSelect }: TickerProps) => {
  const { prices } = useMarketStore();
  const [sortedSymbols, setSortedSymbols] = useState<string[]>([]);
  const prevPricesRef = useRef<Map<string, any>>(new Map());

  // Update sorting more frequently for real-time feel
  useEffect(() => {
    const updateSorting = () => {
      if (prices.size === 0) return;

      const symbols = Array.from(prices.keys())
        .filter(symbol => symbol.endsWith('USDT'))
        .sort((a, b) => {
          const volumeA = prices.get(a)?.volume || 0;
          const volumeB = prices.get(b)?.volume || 0;
          return volumeB - volumeA;
        })
        .slice(0, 20);

      // Only update if prices have changed
      const hasChanged = symbols.some(symbol => {
        const prevPrice = prevPricesRef.current.get(symbol)?.price;
        const currentPrice = prices.get(symbol)?.price;
        return prevPrice !== currentPrice;
      });

      if (hasChanged) {
        setSortedSymbols(symbols);
        // Update previous prices
        prevPricesRef.current = new Map(prices);
      }
    };

    updateSorting();
    const interval = setInterval(updateSorting, 1000);

    return () => clearInterval(interval);
  }, [prices]);

  // Show loading state only if we have no data
  if (sortedSymbols.length === 0) {
    return (
      <div className="h-[452px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DFFF88]"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <List
        height={448}
        itemCount={sortedSymbols.length}
        itemSize={50}
        width="100%"
        className="scrollbar-thin scrollbar-thumb-[#DFFF88]/20 scrollbar-track-transparent"
        itemData={{
          symbols: sortedSymbols,
          prices,
          onSymbolSelect
        }}
      >
        {TickerRow}
      </List>
    </div>
  );
}); 