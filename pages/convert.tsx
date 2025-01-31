import React, { useEffect } from "react";
import styles from "@/styles/Convert.module.css";
import Swap from "@/components/UI/Swap";
import { getCryptoAssets } from "@/services/table/cryptoAsset";
import { CryptoAsset } from "@/context/types";
import { useCryptoContext } from "@/context/CryptoContext";

interface ConvertProps {
  initialcryptoAssets: CryptoAsset[];
}

export default function Convert({ initialcryptoAssets }: ConvertProps) {
  const { setCryptoAssets } = useCryptoContext();

  useEffect(() => {
    setCryptoAssets(initialcryptoAssets);
  }, [initialcryptoAssets, setCryptoAssets]);

  const cryptoIds = initialcryptoAssets.map((asset) => asset.id);

  return (
    <>
      <main className={styles.main}>
        <Swap cryptoIds={cryptoIds} />
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
  // console.log(initialcryptoAssets);

  return {
    props: {
      initialcryptoAssets,
    },
  };
}
