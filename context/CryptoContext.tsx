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
  const [selectedCryptoFROM, setSelectedCryptoFROM] =
    useState<CryptoAsset | null>(null);
  const [selectedCryptoTO, setSelectedCryptoTO] = useState<CryptoAsset | null>(
    null
  );

  return (
    <CryptoContext.Provider
      value={{
        cryptoAssets,
        setCryptoAssets,
        cryptoInfo,
        setCryptoInfo,
        selectedCryptoFROM,
        setSelectedCryptoFROM,
        selectedCryptoTO,
        setSelectedCryptoTO,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
