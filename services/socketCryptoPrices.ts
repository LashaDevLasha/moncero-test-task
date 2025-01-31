import { useEffect, useRef } from "react";

export const useSocketCryptoPrices = (
  ids: string[],
  onPriceUpdate: (prices: { [key: string]: string }) => void
) => {
  const socketRef = useRef<WebSocket | null>(null);
  const isConnected = useRef(false);

  useEffect(() => {
    if (!isConnected.current) {
      const assetIds = ids.join(",");
      const wsUrl = `wss://ws.coincap.io/prices?assets=${assetIds}`;
      const pricesWs = new WebSocket(wsUrl);

      pricesWs.onopen = () => {
        console.log("webSocket on");
        isConnected.current = true;
      };

      pricesWs.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        onPriceUpdate(data);
      };

      pricesWs.onclose = () => {
        console.log("webSocket off");
        isConnected.current = false;
      };

      socketRef.current = pricesWs;
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
