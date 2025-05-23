import { useEffect, useRef } from "react";

export const useSocketCryptoPrices = (
  ids: string[],
  onPriceUpdate: (prices: { [key: string]: string }) => void
) => {
  const socketRef = useRef<WebSocket | null>(null);
  const isConnected = useRef(false);
  const retryCount = useRef(0);
  const maxRetries = 5; 

  const connectWebSocket = () => {
    if (isConnected.current || retryCount.current >= maxRetries) return;

    const assetIds = ids.join(",");
    const wsUrl = `wss://wss.coincap.io/prices?assets=${assetIds}`;
    const pricesWs = new WebSocket(wsUrl);

    pricesWs.onopen = () => {
      console.log("WebSocket on");
      isConnected.current = true;
      retryCount.current = 0; 
    };

    pricesWs.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      onPriceUpdate(data);
    };

    pricesWs.onclose = () => {
      console.warn("WebSocket off");
      isConnected.current = false;
      socketRef.current = null;
      if (retryCount.current < maxRetries) {
        retryCount.current += 1;
        setTimeout(connectWebSocket, Math.pow(2, retryCount.current) * 1000); 
      } else {
        console.error("Max reconnect attempts reached.");
      }
    };

    pricesWs.onerror = (error) => {
      console.error("WebSocket error:", error);
      pricesWs.close(); 
    };

    socketRef.current = pricesWs;
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
