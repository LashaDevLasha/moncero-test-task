import { CryptoAsset } from "@/context/types";

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const filterCryptoAssets = (cryptoAssets: CryptoAsset[], searchTerm: string) => {
  return cryptoAssets?.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
