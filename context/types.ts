export interface CryptoAsset {
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

export interface CryptoInfo {
  id: string;
  name: string;
}

export interface CryptoContextType {
  cryptoAssets: CryptoAsset[];
  setCryptoAssets: React.Dispatch<React.SetStateAction<CryptoAsset[]>>;
  cryptoInfo: CryptoInfo[];
  setCryptoInfo: React.Dispatch<React.SetStateAction<CryptoInfo[]>>;
}
