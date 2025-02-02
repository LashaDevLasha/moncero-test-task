import React, { useEffect } from "react";
// import styles from "@/styles/Convert.module.css";
import Swap from "@/components/convert/Swap";
import { getCryptoAssets } from "@/services/table/cryptoAsset";
import { CryptoAsset } from "@/context/types";
import { useCryptoContext } from "@/context/CryptoContext";
import { useSocketCryptoPrices } from "@/services/socketCryptoPrices";

interface ConvertProps {
  initialcryptoAssets: CryptoAsset[];
  cryptoIds: string[];
}

export default function Convert({
  initialcryptoAssets,
  cryptoIds,
}: ConvertProps) {
  const { setCryptoAssets } = useCryptoContext();

  const handlePriceUpdate = (newPrices: { [key: string]: string }) => {
    setCryptoAssets((prevAssets) =>
      prevAssets.map((asset) => ({
        ...asset,
        priceUsd: newPrices[asset.id] ? newPrices[asset.id] : asset.priceUsd,
      }))
    );
  };


  useEffect(() => {
    setCryptoAssets(initialcryptoAssets);
  }, [initialcryptoAssets, setCryptoAssets]);

  useSocketCryptoPrices(cryptoIds, handlePriceUpdate);

  return (
    <>
      <main>
        <Swap />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const response = await getCryptoAssets();
  const sortedAssets = response.sort(
    (a, b) => parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd)
  );
  const initialcryptoAssets = sortedAssets.slice(0, 10);
  const cryptoIds = initialcryptoAssets.map((asset) => asset.id);

  // console.log(initialcryptoAssets);

  return {
    props: {
      initialcryptoAssets,
      cryptoIds,
    },
  };
}
