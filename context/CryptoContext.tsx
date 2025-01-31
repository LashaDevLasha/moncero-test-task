import React, { createContext, useState, useContext } from "react";
import { CryptoAsset, CryptoContextType, CryptoInfo } from "./types";

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
  const [cryptoInfo, setCryptoInfo] = useState<CryptoInfo[]>([]);

  return (
    <CryptoContext.Provider
      value={{ cryptoAssets, setCryptoAssets, cryptoInfo, setCryptoInfo }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
