import { useEffect, useRef } from "react";

export const useSocketCryptoPrices = (
  ids: string[],
  onPriceUpdate: (prices: { [key: string]: string }) => void
) => {
  const socketRef = useRef<WebSocket | null>(null);  // Use ref to persist WebSocket instance
  const isConnected = useRef(false);  // Track WebSocket connection status

  useEffect(() => {
    // Ensure WebSocket is opened only once
    if (!isConnected.current) {
      const assetIds = ids.join(",");
      const wsUrl = `wss://ws.coincap.io/prices?assets=${assetIds}`;
      const pricesWs = new WebSocket(wsUrl);

      pricesWs.onopen = () => {
        console.log("WebSocket connection established");
        isConnected.current = true;
      };

      pricesWs.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        console.log(data);
        onPriceUpdate(data); // Notify component with new prices
      };

      pricesWs.onclose = () => {
        console.log("WebSocket connection closed");
        isConnected.current = false;
        // You can add a retry logic here if needed
      };

      // Store the WebSocket instance for future use
      socketRef.current = pricesWs;
    }

    // Cleanup WebSocket connection when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [ids]);  // Re-run only if `ids` or `onPriceUpdate` changes
};
