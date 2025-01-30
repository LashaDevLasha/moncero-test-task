import React, { createContext, useState, useContext } from "react";

interface CryptoAsset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  [key: string]: string | number | null;
}

interface CryptoContextType {
  cryptoAssets: CryptoAsset[];
  setCryptoAssets: React.Dispatch<React.SetStateAction<CryptoAsset[]>>;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const useCryptoContext = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCryptoContext must be used within a CryptoProvider");
  }
  return context;
};

interface CryptoProviderProps {
  children: React.ReactNode;
}

export const CryptoProvider: React.FC<CryptoProviderProps> = ({ children }) => {
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([]);

  return (
    <CryptoContext.Provider value={{ cryptoAssets, setCryptoAssets }}>
      {children}
    </CryptoContext.Provider>
  );
};
